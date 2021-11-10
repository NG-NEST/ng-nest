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
  OnChanges,
  ViewContainerRef,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import { XDatePickerModelType, XDateRangePrefix, XDateRangeProperty } from './date-picker.property';
import {
  XIsEmpty,
  XIsDate,
  XIsNumber,
  XIsChange,
  XCorner,
  XClearClass,
  XIsString,
  XConfigService,
  XIsUndefined,
  XBoolean
} from '@ng-nest/ui/core';
import { XInputGroupComponent } from '@ng-nest/ui/input';
import { DatePipe } from '@angular/common';
import { Overlay, OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XDateRangePortalComponent } from './date-range-portal.component';

@Component({
  selector: `${XDateRangePrefix}`,
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDateRangeComponent), DatePipe]
})
export class XDateRangeComponent extends XDateRangeProperty implements OnInit, OnChanges {
  @ViewChild('dateRange', { static: true }) dateRange!: ElementRef;
  @ViewChild('inputGroup', { static: true }) inputGroup!: XInputGroupComponent;

  modelType: XDatePickerModelType = 'date';
  numberValue!: number[];
  isInput = false;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  override writeValue(value: any) {
    if (XIsUndefined(value)) value = [];
    if (value.length > 0) {
      if (XIsDate(value[0])) {
        this.modelType = 'date';
        this.numberValue = value.getTime();
      } else if (XIsNumber(value[0])) {
        this.modelType = 'number';
        this.numberValue = value;
      } else if (XIsString(value[0])) {
        this.modelType = 'string';
        const valueTime = value.map((x: string) => new Date(x).getTime());
        this.numberValue = !isNaN(valueTime[0]) ? valueTime : [];
      }
    }
    this.value = value;
    this.setDisplayValue(this.numberValue);
    this.valueChange.next(this.numberValue);
    this.cdr.detectChanges();
  }

  enter: boolean = false;
  inputClearable: boolean = false;
  animating = false;
  displayValue: string[] = [];
  portal!: XPortalOverlayRef<XDateRangePortalComponent>;
  icon: string = 'fto-calendar';
  box!: DOMRect;
  protalHeight!: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
  closeSubject: Subject<void> = new Subject();
  startDisplay: string | number = '';
  endDisplay: string | number = '';
  startActive: XBoolean = false;
  endActive: XBoolean = false;
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public configService: XConfigService,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe,
    private overlay: Overlay
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.dateRange.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setFormat();
    this.setClassMap();
    this.setSubject();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { type } = changes;
    if (XIsChange(type)) {
      this.setFormat();
      this.setDisplayValue(this.numberValue);
    }
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.closePortal();
    });
  }

  setFormat() {
    if (this.format !== 'yyyy-MM-dd') return;
    if (this.type === 'date') {
      this.format = 'yyyy-MM-dd';
    } else if (this.type === 'year') {
      this.format = 'yyyy';
    } else if (this.type === 'month') {
      this.format = 'yyyy-MM';
    } else if (this.type === 'date-time') {
      this.format = 'yyyy-MM-dd HH:mm:ss';
    } else if (this.type === 'date-hour') {
      this.format = 'yyyy-MM-dd HH';
    } else if (this.type === 'date-minute') {
      this.format = 'yyyy-MM-dd HH:mm';
    }
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.numberValue)) {
      this.icon = '';
      this.inputClearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled) return;
    this.enter = false;
    if (this.inputClearable) {
      this.icon = 'fto-calendar';
      this.inputClearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit() {
    this.value = [];
    this.numberValue = [];
    this.displayValue = [];
    this.mleave();
    this.valueChange.next(this.numberValue);
    this.modelChange();
  }

  modelChange() {
    if (this.onChange) {
      this.onChange(this.getValue());
    }
  }

  getValue() {
    return this.modelType === 'date'
      ? this.numberValue.map((x) => new Date(x))
      : this.modelType === 'string'
      ? this.numberValue.map((x) => this.datePipe.transform(x, this.format))
      : this.numberValue;
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

  showPortal($event: Event, type?: 'start' | 'end') {
    $event.stopPropagation();
    if (this.disabled || this.animating) return;
    this.active = true;
    this.startActive = type === 'start';
    this.endActive = type === 'end';
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XDateRangePortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => {
        this.setDisplayValue(this.numberValue);
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
    Object.assign(componentRef.instance, {
      type: this.type,
      value: this.numberValue,
      placement: this.placement,
      preset: this.preset,
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      closePortal: () => this.closeSubject.next(),
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (dates: Date[], sure = true) => this.onNodeClick(dates, sure),
      startNodeEmit: (node: Date) => this.startNodeClick(node),
      endNodeEmit: (node: Date) => this.endNodeClick(node),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  startNodeClick(node: Date) {
    this.startDisplay = this.datePipe.transform(node, this.format) as string;
    this.cdr.detectChanges();
  }

  endNodeClick(node: Date) {
    this.endDisplay = this.datePipe.transform(node, this.format) as string;
    this.cdr.detectChanges();
  }

  onNodeClick(dates: Date[], sure = true) {
    this.isInput = false;
    if (sure) {
      this.numberValue = dates.map((x) => x.getTime());
      this.value = this.getValue();
      this.setDisplayValue(this.numberValue);
      this.closeSubject.next();
      this.modelChange();
      this.nodeEmit.emit(this.numberValue);
    } else {
      this.setDisplayValue(dates.map((x) => x.getTime()));
      this.cdr.markForCheck();
    }
  }

  onInput() {
    this.isInput = true;
  }

  setDisplayValue(dateNumber: number[]) {
    // if (this.isInput && isNaN(this.startDisplay) && !isNaN(Date.parse(this.displayValue))) {
    //   this.displayValue = this.datePipe.transform(this.displayValue, this.format);
    //   this.numberValue = new Date(this.displayValue).getTime();
    //   this.value = this.getValue();
    //   this.modelChange();
    //   this.isInput = false;
    // } else {
    this.displayValue = dateNumber.map((x) => this.datePipe.transform(x, this.format)) as string[];
    // }
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputGroup.elementRef,
      placement: [this.placement as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-date-range-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
