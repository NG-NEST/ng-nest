import { Subject, of } from 'rxjs';
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
import { XValueAccessor, XIsEmpty, XIsObservable, XIsChange, XSetData, XCorner, XClearClass, XConfigService } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { XSelectPortalComponent } from './select-portal.component';
import { Overlay, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange, OverlayConfig } from '@angular/cdk/overlay';
import { takeUntil, delay } from 'rxjs/operators';

@Component({
  selector: `${XSelectPrefix}`,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSelectComponent)]
})
export class XSelectComponent extends XSelectProperty implements OnInit, OnChanges {
  @ViewChild('inputCom', { static: true }) inputCom: XInputComponent;
  @ViewChild('select', { static: true }) select: ElementRef;

  writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = '';
  nodes: XSelectNode[] = [];
  portal: XPortalOverlayRef<XSelectPortalComponent>;
  icon: string = 'fto-chevron-down';
  iconSpin: boolean = false;
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  asyncLoading = false;
  valueChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
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
    this.setFlex(this.select.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
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
    if (this.async) return;
    XSetData<XSelectNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.setDisplayValue();
      this.setPortal();
      this.cdr.detectChanges();
    });
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.displayValue)) {
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
    this.mleave();
    this.valueChange.next(this.value);
    if (this.onChange) this.onChange(this.value);
  }

  setDisplayValue() {
    if (this.nodes.length > 0) {
      let node = this.nodes.find((x) => x.id === this.value);
      this.displayValue = node ? node.label : '';
    }
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.cdr.detectChanges();
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  showPortal() {
    if (this.disabled || this.iconSpin) return;
    if (this.closePortal()) return;
    if (this.async && XIsObservable(this.data) && this.nodes.length === 0) {
      this.icon = 'fto-loader';
      this.iconSpin = true;
      this.cdr.detectChanges();
      XSetData<XSelectNode>(this.data, this._unSubject).subscribe((x) => {
        this.nodes = x;
        this.setDisplayValue();
        this.createPortal();
        this.icon = 'fto-chevron-down';
        this.iconSpin = false;
        this.cdr.detectChanges();
      });
    } else {
      this.createPortal();
    }
  }

  createPortal() {
    this.nodes.filter((x) => x.selected).map((x) => (x.selected = false));
    this.box = this.inputCom.input.nativeElement.getBoundingClientRect();
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
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XCorner;
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
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      closePortal: () => this.closePortal(),
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: XSelectNode) => this.nodeClick(node)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  nodeClick(node: XSelectNode) {
    if (node.disabled) return;
    this.displayValue = node.label;
    this.value = node.id;
    this.closePortal();
    if (this.onChange) this.onChange(this.value);
    this.cdr.detectChanges();
  }

  setPlacement() {
    return this.portalService.setPlacement(this.inputCom.input, this.placement, 'bottom-start', 'bottom-end', 'top-start', 'top-end');
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  formControlChanges() {
    this.setData();
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
