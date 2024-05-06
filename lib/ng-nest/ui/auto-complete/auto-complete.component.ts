import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
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
  ViewChild,
  inject
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
  XIsFunction,
  XParents
} from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { XAutoCompletePortalComponent } from './auto-complete-portal.component';
import {
  Overlay,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayConfig
} from '@angular/cdk/overlay';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { DOWN_ARROW, UP_ARROW, ENTER, MAC_ENTER, ESCAPE } from '@angular/cdk/keycodes';
import { XValueAccessor, XControlValueAccessor } from '@ng-nest/ui/base-form';
import { DOCUMENT } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: `${XAutoCompletePrefix}`,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, XInputComponent, XControlValueAccessor, XAutoCompletePortalComponent],
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XAutoCompleteComponent)]
})
export class XAutoCompleteComponent extends XAutoCompleteProperty implements OnInit, OnChanges {
  @ViewChild('inputCom', { static: true }) inputCom!: XInputComponent;
  @ViewChild('autoComplete', { static: true }) autoComplete!: ElementRef<HTMLElement>;

  override writeValue(value: any) {
    this.value = value;
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

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

  override valueTplContext: { $node: any; $isValue: boolean } = { $node: null, $isValue: true };
  valueChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
  dataChange = new BehaviorSubject<XAutoCompleteNode[]>([]);
  inputChange = new BehaviorSubject<any>(null);
  closeSubject: Subject<void> = new Subject();
  keydownSubject: Subject<KeyboardEvent> = new Subject();
  private _unSubject = new Subject<void>();
  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);
  override cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.setFlex(this.autoComplete.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
    this.setSubject();
    this.setParantScroll();
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
    if (XIsObservable(this.data) || XIsFunction(this.data)) return;
    XSetData<XAutoCompleteNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.dataChange.next(x);
      this.setPortal();
      this.cdr.detectChanges();
    });
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.inputChange
      .pipe(
        filter((x) => x !== null),
        debounceTime(this.debounceTime as number),
        distinctUntilChanged(),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
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

  setParantScroll() {
    if (!this.document) return;
    const parents = XParents(this.elementRef.nativeElement);
    let firstScroll: HTMLElement | null = null;
    for (let item of parents) {
      if (item.clientHeight < item.scrollHeight) {
        firstScroll = item;
        break;
      }
    }
    if (firstScroll && firstScroll.tagName !== 'BODY') {
      fromEvent(firstScroll, 'scroll')
        .pipe(
          filter(() => this.portalAttached()!),
          takeUntil(this._unSubject)
        )
        .subscribe(() => {
          this.portal?.overlayRef?.updatePosition();
          const eract = this.elementRef.nativeElement.getBoundingClientRect();
          const frect = firstScroll!.getBoundingClientRect();
          if (eract.top + eract.height - frect.top < 0 || eract.bottom > frect.bottom) {
            this.closeSubject.next();
          }
        });
    }
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active = false;
      if (this.onlySelect) {
        if (!this.nodes.map((x) => x.label).includes(this.value)) {
          this.value = '';
          if (this.onChange) this.onChange(this.value);
          this.inputChange.next(this.value);
        }
      }
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
        this.icon = '';
        this.iconSpin = false;
        this.nodes = x;
        this.dataChange.next(this.nodes);
        this.createPortal();
        this.cdr.detectChanges();
      });
    } else {
      this.createPortal();
    }
  }

  createPortal() {
    this.nodes.filter((x) => x.selected).map((x) => (x.selected = false));
    if (XIsFunction(this.data)) {
      this.searchNodes = this.nodes;
    } else if (!XIsEmpty(this.value)) {
      this.setSearchNodes(this.value);
      this.dataChange.next(this.searchNodes);
    }
    this.box = this.inputCom.inputRef().nativeElement.getBoundingClientRect();
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
      inputChange: this.inputChange,
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: XAutoCompleteNode) => this.onNodeClick(node),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(node: XAutoCompleteNode | XAutoCompleteNode[]) {
    node = node as XAutoCompleteNode;
    if (this.value === node.label) {
      this.nodeEmit.emit(node);
      this.closeSubject.next();
      return;
    }
    this.value = node.label;
    this.valueTplContext.$node = node;
    this.inputCom.inputFocus();
    if (this.onChange) this.onChange(this.value);
    this.nodeEmit.emit(node);
    this.closeSubject.next();
    this.cdr.detectChanges();
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom.inputRef(),
      placement: [this.placement as XPositionTopBottom, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-auto-complete-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  setSearchNodes(value: string | number) {
    if (this.caseSensitive) {
      this.searchNodes = this.nodes.filter((x) => x.label.indexOf(value) >= 0);
    } else {
      this.searchNodes = this.nodes.filter(
        (x) => (x.label as string).toLowerCase().indexOf((value as string).toLowerCase()) >= 0
      );
    }
  }

  modelChange(value: string | number) {
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
            this.icon = '';
            this.iconSpin = false;
            this.nodes = x;
            this.dataChange.next(this.nodes);
            this.cdr.detectChanges();
          });
        }
      }
      if (!this.onlySelect) {
        this.onChange && this.onChange(value);
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
          this.setSearchNodes(value);
          this.dataChange.next(this.searchNodes);
        }
      }
    }
    if (!this.onlySelect) {
      this.onChange && this.onChange(value);
    }
  }

  formControlChanges() {
    this.setData();
    this.ngOnInit();
    this.writeValue(this.value);
    this.ngAfterViewInit();
    this.cdr.detectChanges();
  }

  onKeydown($event: KeyboardEvent) {
    this.keydownSubject.next($event);
  }

  onInput(_event: Event) {
    this.formControlValidator();
    setTimeout(() => {
      this.inputChange.next(this.value);
    });
  }

  onFocus(_event: Event) {}

  onBlur(_event: Event) {}
}
