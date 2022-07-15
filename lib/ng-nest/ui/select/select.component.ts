import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { XSelectNode, XSelectProperty, XSelectPrefix } from './select.property';
import {
  XIsEmpty,
  XIsObservable,
  XIsChange,
  XSetData,
  XClearClass,
  XConfigService,
  XIsArray,
  XPositionTopBottom,
  XIsObjectArray,
  XIsFunction
} from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { XSelectPortalComponent } from './select-portal.component';
import { Overlay, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange, OverlayConfig } from '@angular/cdk/overlay';
import { takeUntil, throttleTime, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DOWN_ARROW, UP_ARROW, ENTER, MAC_ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, TAB } from '@angular/cdk/keycodes';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XSelectPrefix}`,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSelectComponent)]
})
export class XSelectComponent extends XSelectProperty implements OnInit, OnChanges {
  @ViewChild('inputCom', { static: true }) inputCom!: XInputComponent;
  @ViewChild('select', { static: true }) select!: ElementRef;

  get getReadonly() {
    return this.readonly && !this.search;
  }

  override writeValue(value: any) {
    if (this.multiple && XIsEmpty(value)) {
      value = [];
    }
    this.value = value;
    this.setDisplayValue();
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  override readonly = true;
  enter: boolean = false;
  showClearable: boolean = false;
  displayValue: any = '';
  nodes: XSelectNode[] = [];
  searchNodes: XSelectNode[] = [];
  cloneNodes!: XSelectNode[];
  portal!: XPortalOverlayRef<XSelectPortalComponent>;
  icon: string = 'fto-chevron-down';
  iconSpin: boolean = false;
  box!: DOMRect;
  protalHeight!: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  asyncLoading = false;
  animating = false;
  objectArray = false;
  override valueTplContext: { $node: any; $isValue: boolean } = { $node: null, $isValue: true };
  valueChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
  closeSubject: Subject<void> = new Subject();
  dataChange: Subject<XSelectNode[]> = new Subject();
  keydownSubject: Subject<KeyboardEvent> = new Subject();
  inputChange: Subject<any> = new Subject();
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public override cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.select.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
    this.setSubject();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setData() {
    if (this.async) return;
    XSetData<XSelectNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.setDisplayValue();
      this.setPortal();
      this.cdr.detectChanges();
    });
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.inputChange.pipe(debounceTime(this.debounceTime as number), distinctUntilChanged(), takeUntil(this._unSubject)).subscribe((x) => {
      this.modelChange(x);
    });
    this.keydownSubject.pipe(throttleTime(10), takeUntil(this._unSubject)).subscribe((x) => {
      const keyCode = x.keyCode;
      if (!this.portalAttached() && [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, MAC_ENTER].includes(keyCode)) {
        this.inputChange.next(this.displayValue);
      }
      if (this.portalAttached() && [ESCAPE].includes(keyCode)) {
        this.closeSubject.next();
      }
    });
  }

  menter() {
    if (this.disabled || !this.clearable || this.iconSpin) return;
    this.enter = true;
    if (!XIsEmpty(this.displayValue)) {
      this.icon = '';
      this.showClearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled || !this.clearable || this.iconSpin) return;
    this.enter = false;
    if (this.clearable) {
      this.icon = 'fto-chevron-down';
      this.showClearable = false;
      this.cdr.detectChanges();
    }
  }

  modelChange(value: string | number) {
    if (XIsFunction(this.data)) {
      if (!this.portalAttached()) {
        this.showPortal();
      } else {
        this.icon = 'fto-loader';
        this.iconSpin = true;
        this.cdr.detectChanges();
        XSetData<XSelectNode>(this.data, this._unSubject, true, value as any).subscribe((x) => {
          this.icon = '';
          this.iconSpin = false;
          this.nodes = x;
          this.dataChange.next(this.nodes);
          this.cdr.detectChanges();
        });
      }
      return;
    }
    if (this.nodes) {
      if (!this.portalAttached()) {
        this.showPortal();
      } else {
        if (XIsEmpty(value)) {
          this.searchNodes = [...this.nodes];
        } else {
          this.setSearchNodes(value);
        }
        this.dataChange.next(this.searchNodes);
      }
    }
  }

  setSearchNodes(value: string | number) {
    if (this.caseSensitive) {
      this.searchNodes = this.nodes.filter((x) => x.label.indexOf(value) >= 0);
    } else {
      this.searchNodes = this.nodes.filter((x) => (x.label as string).toLowerCase().indexOf((value as string).toLowerCase()) >= 0);
    }
  }

  clearEmit() {
    this.value = '';
    this.displayValue = '';
    this.valueTplContext.$node = null;
    this.mleave();
    this.valueChange.next(this.value);
    this.inputChange.next('');
    if (this.onChange) this.onChange(this.value);
  }

  setDisplayValue() {
    if (this.nodes.length > 0) {
      if (this.multiple) {
        if (XIsEmpty(this.value)) {
          this.displayValue = '';
          this.valueTplContext.$node = null;
        } else {
          let nodes: XSelectNode[] = [];
          if (XIsObjectArray(this.value)) {
            this.objectArray = true;
            nodes = this.nodes.filter((x) => !XIsEmpty(this.value.find((y: XSelectNode) => y.id === x.id)));
          } else {
            this.objectArray = false;
            nodes = this.nodes.filter((x) => !XIsEmpty(this.value.find((y: string | number) => y === x.id)));
          }
          this.displayValue = nodes.map((x) => x.label).join(',');
          this.valueTplContext.$node = [...nodes];
        }
      } else {
        let node = this.nodes.find((x) => x.id === this.value);
        if (node) {
          this.displayValue = node.label;
          this.valueTplContext.$node = node;
        } else {
          this.displayValue = '';
          this.valueTplContext.$node = null;
        }
      }
      this.cdr.detectChanges();
    }
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active = false;
      this.cdr.detectChanges();
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  showPortal(click = false) {
    if (this.disabled || this.iconSpin || this.animating) return;
    this.active = true;
    if ((this.async && XIsObservable(this.data) && this.nodes.length === 0) || XIsFunction(this.data)) {
      this.icon = 'fto-loader';
      this.iconSpin = true;
      this.inputCom.cdr.detectChanges();
      XSetData<XSelectNode>(this.data, this._unSubject, true, click ? '' : this.displayValue).subscribe((x) => {
        this.icon = 'fto-chevron-down';
        this.iconSpin = false;
        this.inputCom.cdr.detectChanges();
        this.nodes = x;
        if (!this.search) this.setDisplayValue();
        this.createPortal();
        this.cdr.detectChanges();
      });
    } else {
      this.createPortal();
    }
    this.inputCom.inputFocus();
  }

  createPortal() {
    this.nodes.filter((x) => x.selected).map((x) => (x.selected = false));
    this.box = this.inputCom.inputRef.nativeElement.getBoundingClientRect();
    const config: OverlayConfig = {
      backdropClass: '',
      width: this.box.width,
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XSelectPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => {
        this.setDisplayValue();
        this.closeSubject.next();
      });
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPositionTopBottom;
      place !== this.placement && this.positionChange.next(place);
    });
  }

  setInstance() {
    let componentRef = this.portal.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      data: this.nodes,
      value: this.value,
      placement: this.placement,
      multiple: this.multiple === true ? 0 : 1,
      selectAll: this.selectAll,
      nodeTpl: this.nodeTpl,
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject,
      dataChange: this.dataChange,
      inputCom: this.inputCom,
      portalMaxHeight: this.portalMaxHeight,
      objectArray: this.objectArray,
      selectAllText: this.selectAllText,
      caseSensitive: this.caseSensitive,
      search: this.search,
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: XSelectNode) => this.nodeClick(node),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  nodeClick(node: XSelectNode | XSelectNode[]) {
    if (this.multiple && XIsArray(node)) {
      node = node as XSelectNode[];
      this.value = node;
      this.setDisplayValue();
    } else {
      node = node as XSelectNode;
      this.displayValue = node.label;
      this.valueTplContext.$node = node;
      this.value = node.id;
      this.closeSubject.next();
    }
    this.inputCom.inputFocus();
    if (this.onChange) this.onChange(this.value);
    this.cdr.detectChanges();
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom.inputRef,
      placement: [this.placement as XPositionTopBottom, 'bottom', 'top'],
      transformOriginOn: 'x-select-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  formControlChanges() {
    this.setData();
    this.ngOnInit();
    this.cdr.detectChanges();
  }

  onKeydown($event: KeyboardEvent) {
    this.keydownSubject.next($event);
    if ($event.keyCode !== TAB && !this.search) {
      $event.preventDefault();
    }
  }

  onFocus(_event: Event) {
    this.inputCom.inputFocus();
  }

  onInput(_event: InputEvent) {
    setTimeout(() => {
      this.inputChange.next(this.displayValue);
    });
  }
}
