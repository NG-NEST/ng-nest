import { XTimePickerPortalComponent } from './time-picker-portal.component';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { Subject } from 'rxjs';
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
import { XTimePickerPrefix, XTimePickerProperty } from './time-picker.property';
import { XIsEmpty, XIsDate, XIsNumber, XCorner, XClearClass, XIsString } from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import { DatePipe } from '@angular/common';
import { Overlay, OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { takeUntil, map } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nService, XI18nTimePicker } from '@ng-nest/ui/i18n';

@Component({
  selector: `${XTimePickerPrefix}`,
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTimePickerComponent), DatePipe]
})
export class XTimePickerComponent extends XTimePickerProperty implements OnInit {
  @ViewChild('datePicker', { static: true }) datePicker!: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom!: XInputComponent;

  override writeValue(value: any) {
    if (XIsDate(value)) {
      this.value = value.getTime();
      this.valueType = 'date';
    } else if (XIsNumber(value)) {
      this.value = value;
      this.valueType = 'number';
    } else if (XIsString(value)) {
      this.value = new Date(value).getTime();
      this.valueType = 'string';
    } else if (XIsEmpty(value)) {
      this.value = '';
    }
    this.setDisplayValue(this.value);
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  override readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  animating = false;
  displayValue: any = '';
  portal!: XPortalOverlayRef<XTimePickerPortalComponent>;
  icon: string = 'fto-clock';
  box!: DOMRect;
  protalHeight!: number;
  maxNodes: number = 8;
  protalTobottom: boolean = true;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
  closeSubject: Subject<void> = new Subject();
  valueType: 'date' | 'number' | 'string' = 'date';
  locale: XI18nTimePicker = {};
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public override cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe,
    private overlay: Overlay,
    private i18n: XI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.datePicker.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setFormat();
    this.setClassMap();
    this.setSubject();
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

  setFormat() {
    if (this.format === 'HH:mm:ss') {
      if (this.type === 'hour') {
        this.format = 'HH';
      } else if (this.type === 'minute') {
        this.format = 'HH:mm';
      }
    }
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.i18n.localeChange
      .pipe(
        map((x) => x.timePicker as XI18nTimePicker),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        if (this.use12Hours) {
          this.setDisplayValue(this.value);
        }
        this.cdr.markForCheck();
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
      this.icon = 'fto-clock';
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
      content: XTimePickerPortalComponent,
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
      place !== this.placement && this.positionChange.next(place);
    });
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    console.log(this.use12Hours);
    Object.assign(componentRef.instance, {
      type: this.type,
      value: this.value,
      placement: this.placement,
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      inputCom: this.inputCom,
      use12Hours: this.use12Hours,
      closePortal: () => this.closeSubject.next(),
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: Date) => this.onNodeClick(node),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(date: Date) {
    this.value = this.setValue(date);
    this.setDisplayValue(date);
    this.cdr.detectChanges();
    if (this.onChange) this.onChange(this.value);
    this.formControlValidator();
    this.nodeEmit.emit(this.value);
  }

  setValue(value: Date) {
    return ['date', 'string'].includes(this.valueType) ? new Date(value) : value.getTime();
  }

  setDisplayValue(date: Date | number) {
    if (!date) return;
    if (this.use12Hours) {
      let dt = new Date(date);
      let hour = dt.getHours();
      let suffix = hour >= 12 ? this.locale.pm : this.locale.am;
      this.displayValue = `${this.datePipe.transform(dt.setHours(hour === 0 ? 12 : hour > 12 ? hour - 12 : hour), this.format)} ${suffix}`;
    } else {
      this.displayValue = this.datePipe.transform(date, this.format);
    }
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom.inputRef,
      placement: [this.placement as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-time-picker-portal'
    });
  }

  setPortal() {
    if (this.portalAttached()) {
      this.portal.overlayRef?.updatePositionStrategy(this.setPlacement());
    }
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
