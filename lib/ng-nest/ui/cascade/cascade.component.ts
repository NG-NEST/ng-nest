import { XCascadePortalComponent } from './cascade-portal.component';
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
import { XCascadePrefix, XCascadeNode, XCascadeProperty } from './cascade.property';
import { XIsEmpty, XIsChange, XSetData, XGetChildren, XCorner, XClearClass } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { Overlay, OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: 'x-cascade',
  templateUrl: './cascade.component.html',
  styleUrls: ['./cascade.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCascadeComponent)]
})
export class XCascadeComponent extends XCascadeProperty implements OnInit, OnChanges {
  @ViewChild('cascade', { static: true }) cascade!: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom!: XInputComponent;

  override writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  override readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  animating = false;
  displayValue: any = '';
  datas: XCascadeNode[] = [];
  nodes: XCascadeNode[] = [];
  portal!: XPortalOverlayRef<XCascadePortalComponent>;
  icon: string = 'fto-chevron-down';
  box!: DOMRect;
  protalHeight!: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  override valueTplContext: { $node: any; $nodes: any; $isValue: boolean } = { $node: null, $nodes: null, $isValue: true };
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
  closeSubject: Subject<void> = new Subject();
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XCascadePrefix);
  }

  ngOnInit() {
    this.setFlex(this.cascade.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
    this.setSubject();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
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
    XSetData<XCascadeNode>(this.data, this._unSubject).subscribe((x) => {
      this.datas = x;
      this.nodes = x.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XCascadeNode>(x, y, 0));
      this.setPortal();
      this.cdr.detectChanges();
    });
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.closePortal();
    });
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.value)) {
      this.icon = '';
      this.clearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled) return;
    this.enter = false;
    if (this.clearable) {
      this.icon = 'fto-chevron-down';
      this.clearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit() {
    this.value = '';
    this.displayValue = '';
    this.valueTplContext.$node = null;
    this.valueTplContext.$nodes = null;
    this.mleave();
    this.valueChange.next(this.value);
    if (this.onChange) this.onChange(this.value);
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
    if (this.disabled || this.animating) return;
    this.active = true;
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XCascadePortalComponent,
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
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XCorner;
      if (place !== this.placement) {
        this.positionChange.next(place);
        this.cdr.detectChanges();
      }
    });
  }

  setInstance() {
    let componentRef = this.portal.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      datas: this.datas,
      nodes: [this.nodes],
      value: this.value,
      placement: this.placement,
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      nodeTpl: this.nodeTpl,
      nodeTrigger: this.nodeTrigger,
      nodeHoverDelay: this.nodeHoverDelay,
      inputCom: this.inputCom,
      closePortal: () => this.closeSubject.next(),
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: { node: XCascadeNode; nodes: XCascadeNode[]; label: string }) => this.onNodeClick(node),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(selected: { node: XCascadeNode; nodes: XCascadeNode[]; label: string }) {
    this.value = selected.node.id;
    this.displayValue = selected.label;
    this.valueTplContext.$node = selected;
    this.valueTplContext.$nodes = selected.nodes;
    this.closeSubject.next();
    this.inputCom.inputFocus();
    if (this.onChange) this.onChange(this.value);
    this.nodeEmit.emit(selected);
  }

  setDisplayValue() {
    let node = this.datas.find((x) => x.id === this.value) as XCascadeNode;
    if (typeof node === 'undefined') {
      this.displayValue = '';
      this.valueTplContext.$node = null;
      this.valueTplContext.$nodes = null;
      return;
    } else {
      let selecteds = [node];
      while (!XIsEmpty(node.pid)) {
        node = this.datas.find((x) => x.id === node.pid) as XCascadeNode;
        selecteds = [node, ...selecteds];
      }
      this.displayValue = selecteds.map((x) => x.label).join(` / `);
      this.valueTplContext.$node = node;
      this.valueTplContext.$nodes = selecteds;
    }
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom.inputRef,
      placement: [this.placement as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-cascade-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  formControlChanges() {
    this.ngOnInit();
    this.setData();
    this.setDisplayValue();
    this.cdr.detectChanges();
  }
}
