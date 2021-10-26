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
import { XAutoCompleteNode, XAutoCompleteProperty, XAutoCompletePrefix } from './auto-complete.property';
import {
  XIsEmpty,
  XIsObservable,
  XIsChange,
  XSetData,
  XClearClass,
  XConfigService,
  XPositionTopBottom,
  XIsFunction
} from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { XAutoCompletePortalComponent } from './auto-complete-portal.component';
import { Overlay, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange, OverlayConfig } from '@angular/cdk/overlay';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DOWN_ARROW, UP_ARROW, ENTER, MAC_ENTER, ESCAPE } from '@angular/cdk/keycodes';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XAutoCompletePrefix}`,
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XAutoCompleteComponent)]
})
export class XAutoCompleteComponent extends XAutoCompleteProperty implements OnInit, OnChanges {
  @ViewChild('inputCom', { static: true }) inputCom!: XInputComponent;
  @ViewChild('autoComplete', { static: true }) autoComplete!: ElementRef;

  writeValue(value: any) {
    this.value = value;
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = '';
  nodes: XAutoCompleteNode[] = [];
  searchNodes: XAutoCompleteNode[] = [];
  cloneNodes!: XAutoCompleteNode[];
  portal!: XPortalOverlayRef<XAutoCompletePortalComponent>;
  icon: string = '';
  iconSpin: boolean = false;
  box!: DOMRect;
  protalHeight!: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  asyncLoading = false;
  animating = false;

  valueTplContext: { $node: any; $isValue: boolean } = { $node: null, $isValue: true };
  valueChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
  dataChange: Subject<XAutoCompleteNode[]> = new Subject();
  inputChange: Subject<any> = new Subject();
  closeSubject: Subject<any> = new Subject();
  keydownSubject: Subject<KeyboardEvent> = new Subject();
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.autoComplete.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
    this.setSubject();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
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
    if (XIsObservable(this.data) || XIsFunction(this.data)) return;
    XSetData<XAutoCompleteNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.setPortal();
      this.cdr.detectChanges();
    });
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.closePortal();
    });
    this.inputChange.pipe(debounceTime(this.debounceTime as number), distinctUntilChanged(), takeUntil(this._unSubject)).subscribe((x) => {
      this.modelChange(x);
    });
    this.keydownSubject.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      const keyCode = x.keyCode;
      if (!this.portalAttached() && [DOWN_ARROW, UP_ARROW, ENTER, MAC_ENTER].includes(keyCode)) {
        this.inputChange.next(this.value);
      }
      if (this.portalAttached() && [ESCAPE].includes(keyCode)) {
        this.closeSubject.next();
      }
    });
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

  showPortal() {
    if (XIsEmpty(this.value) || this.disabled || this.iconSpin || this.animating) return;
    this.active = true;
    if ((XIsObservable(this.data) && this.nodes.length === 0) || XIsFunction(this.data)) {
      this.icon = 'fto-loader';
      this.iconSpin = true;
      this.cdr.detectChanges();
      XSetData<XAutoCompleteNode>(this.data, this._unSubject, true, this.value).subscribe((x) => {
        this.nodes = x;
        this.createPortal();
        this.icon = '';
        this.iconSpin = false;
        this.cdr.detectChanges();
      });
    } else {
      this.createPortal();
    }
  }

  createPortal() {
    this.nodes.filter((x) => x.selected).map((x) => (x.selected = false));
    if (!XIsEmpty(this.value)) {
      this.searchNodes = this.nodes.filter((x) => x.label.indexOf(this.value) >= 0);
    }
    this.box = this.inputCom.inputRef.nativeElement.getBoundingClientRect();
    const config: OverlayConfig = {
      backdropClass: '',
      width: this.box.width,
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XAutoCompletePortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => {
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
      data: this.searchNodes,
      value: this.value,
      placement: this.placement,
      nodeTpl: this.nodeTpl,
      valueChange: this.valueChange,
      dataChange: this.dataChange,
      positionChange: this.positionChange,
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject,
      inputCom: this.inputCom,
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: XAutoCompleteNode) => this.onNodeClick(node),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(node: XAutoCompleteNode | XAutoCompleteNode[]) {
    node = node as XAutoCompleteNode;
    this.closeSubject.next();
    if (this.value === node.label) {
      this.nodeEmit.emit(node);
      return;
    }
    this.value = node.label;
    this.valueTplContext.$node = node;
    this.inputCom.inputFocus();
    if (this.onChange) this.onChange(this.value);
    this.nodeEmit.emit(node);
    this.cdr.detectChanges();
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom.inputRef,
      placement: [this.placement as XPositionTopBottom, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-auto-complete-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  modelChange(value: string | number) {
    if (this.onChange) this.onChange(value);
    if (XIsFunction(this.data)) {
      if (!this.portalAttached()) {
        this.showPortal();
      } else {
        if (XIsEmpty(value)) {
          this.closeSubject.next();
        } else {
          this.icon = 'fto-loader';
          this.iconSpin = true;
          this.cdr.detectChanges();
          XSetData<XAutoCompleteNode>(this.data, this._unSubject, true, value as any).subscribe((x) => {
            this.nodes = x;
            this.icon = '';
            this.iconSpin = false;
            this.dataChange.next(this.nodes);
            this.cdr.detectChanges();
          });
        }
      }
      return;
    }
    if (this.nodes) {
      if (!this.portalAttached()) {
        this.showPortal();
      } else {
        if (XIsEmpty(value)) {
          this.closeSubject.next();
        } else {
          if (this.caseSensitive) {
            this.searchNodes = this.nodes.filter((x) => x.label.indexOf(value) >= 0);
          } else {
            this.searchNodes = this.nodes.filter((x) => (x.label as string).toLowerCase().indexOf((value as string).toLowerCase()) >= 0);
          }
          this.dataChange.next(this.searchNodes);
        }
      }
    }
  }

  clearEmit() {
    this.value = '';
    this.displayValue = '';
    this.valueTplContext.$node = null;
    this.valueChange.next(this.value);
    this.modelChange(this.value);
  }

  formControlChanges() {
    this.setData();
    this.ngOnInit();
    this.cdr.detectChanges();
  }

  onKeydown($event: KeyboardEvent) {
    this.keydownSubject.next($event);
  }

  onFocus($event: Event) {}

  onInput($event: Event) {
    this.inputChange.next(this.value);
  }

  onBlur($event: Event) {}
}
