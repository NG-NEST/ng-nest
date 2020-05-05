import { XColorPickerPortalComponent } from './color-picker-portal.component';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { XColorPickerPrefix, XColorPickerProperty } from './color-picker.property';
import { XValueAccessor, XIsEmpty, XCorner } from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import { Overlay, OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'x-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XColorPickerComponent)]
})
export class XColorPickerComponent extends XColorPickerProperty implements OnInit {
  @ViewChild('colorPicker', { static: true }) colorPicker: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom: XInputComponent;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: string) {
    this.value = value;
    this.displayValue = value;
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: string = '';
  portal: XPortalOverlayRef<XColorPickerPortalComponent>;
  icon: string = 'fto-chevron-down';
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
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
    this.renderer.addClass(this.elementRef.nativeElement, XColorPickerPrefix);
  }

  ngOnInit() {
    this.setFlex(this.colorPicker.nativeElement, this.renderer, this.justify, this.align, this.direction);
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
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
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  showPortal() {
    if (this.disabled) return;
    if (this.closePortal()) return;
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XColorPickerPortalComponent,
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
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      value: this.value,
      placement: this.placement,
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      closePortal: () => this.closePortal(),
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (color: string) => this.onNodeClick(color)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(color: string) {
    this.value = color;
    this.displayValue = color;
    if (this.onChange) this.onChange(this.value);
  }

  setPlacement() {
    return this.portalService.setPlacement(this.inputCom.input, this.placement, 'bottom-start', 'bottom-end', 'top-start', 'top-end');
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }
}
