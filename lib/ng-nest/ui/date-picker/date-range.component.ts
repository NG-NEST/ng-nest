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
  XIsNull,
  XDateYearWeek
} from '@ng-nest/ui/core';
import { XInputComponent, XInputGroupComponent } from '@ng-nest/ui/input';
import { DatePipe } from '@angular/common';
import { Overlay, OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { map, takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XDateRangePortalComponent } from './date-range-portal.component';
import { XI18nDatePicker, XI18nService } from '@ng-nest/ui/i18n';

@Component({
  selector: `${XDateRangePrefix}`,
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDateRangeComponent), DatePipe]
})
export class XDateRangeComponent extends XDateRangeProperty implements OnInit, OnChanges {
  @ViewChild('dateRange', { static: true }) dateRange!: ElementRef<HTMLElement>;
  @ViewChild('inputGroup', { static: true }) inputGroup!: XInputGroupComponent;
  @ViewChild('inputStartCom', { static: true }) inputStartCom!: XInputComponent;
  @ViewChild('inputEndCom', { static: true }) inputEndCom!: XInputComponent;

  modelType: XDatePickerModelType = 'date';
  numberValue!: (number | null)[];
  isInput = false;
  showClearable: boolean = false;

  get getStartPlaceholder() {
    if (this.placeholder && this.placeholder.length > 0) return this.placeholder[0];
    if (this.type === 'month') {
      return this.locale.startMonth;
    } else if (this.type === 'year') {
      return this.locale.startYear;
    } else if (this.type === 'week') {
      return this.locale.startWeek;
    } else {
      return this.locale.startDate;
    }
  }

  get getEndPlaceholder() {
    if (this.placeholder && this.placeholder.length > 1) return this.placeholder[1];
    if (this.type === 'month') {
      return this.locale.endMonth;
    } else if (this.type === 'year') {
      return this.locale.endYear;
    } else if (this.type === 'week') {
      return this.locale.endWeek;
    } else {
      return this.locale.endDate;
    }
  }

  override get requiredIsEmpty() {
    return this.validator && this.required && XIsEmpty(this.value);
  }

  override writeValue(value: any) {
    if (XIsEmpty(value)) {
      value = [];
      this.numberValue = [];
    }
    if (value.length > 0) {
      if (XIsDate(value[0])) {
        this.modelType = 'date';
        this.numberValue = value.map((x: Date) => x.getTime());
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
  activeTypeChange = new Subject<'start' | 'end'>();
  startDisplay: string | number = '';
  endDisplay: string | number = '';
  activeType?: 'start' | 'end';
  flexClass: string[] = [];
  locale: XI18nDatePicker = {};
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public configService: XConfigService,
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
    this.setFlex(this.dateRange.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setHostTypeClass();
    this.setFormat();
    this.setClassMap();
    this.setSubject();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { type, justify, align, direction, size, labelAlign } = changes;
    XIsChange(size, labelAlign) && this.setClassMap();
    XIsChange(justify, align, direction) && this.setFlexClass();
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
    this.i18n.localeChange
      .pipe(
        map((x) => x.datePicker as XI18nDatePicker),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  setFlexClass() {
    if (this.flexClass.length > 0) {
      for (let cls of this.flexClass) {
        this.renderer.removeClass(this.dateRange.nativeElement, cls);
      }
    }
    this.flexClass = this.setFlex(this.dateRange.nativeElement, this.renderer, this.justify, this.align, this.direction);
  }

  setHostTypeClass() {
    this.renderer.addClass(this.elementRef.nativeElement, `x-date-range-${this.type}`);
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
    if (this.disabled || !this.clearable) return;
    this.enter = true;
    if (!XIsEmpty(this.numberValue)) {
      this.icon = '';
      this.showClearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled || !this.clearable) return;
    this.enter = false;
    if (this.clearable) {
      this.icon = 'fto-calendar';
      this.showClearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit() {
    this.value = [];
    this.numberValue = [];
    this.startDisplay = '';
    this.endDisplay = '';
    this.mleave();
    this.valueChange.next(this.numberValue);
    this.formControlValidator();
    this.modelChange();
    this.inputStartCom.inputFocus();
    this.cdr.detectChanges();
  }

  onIconClick(event: Event) {
    if (this.icon === 'fto-x') {
      this.clearEmit();
    }
    event.stopPropagation();
  }

  modelChange() {
    if (this.onChange) {
      this.onChange(this.getValue());
    }
  }

  getValue() {
    return this.modelType === 'date'
      ? this.numberValue.map((x) => new Date(x!))
      : this.modelType === 'string'
      ? this.numberValue.map((x) => this.datePipe.transform(x, this.format))
      : this.numberValue;
  }

  getNumberValue() {
    return this.modelType === 'date'
      ? this.value.map((x: Date) => x.getTime())
      : this.modelType === 'string'
      ? this.value.map((x: string) => new Date(x).getTime())
      : this.value;
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active = false;
      this.closeReduction();
      this.cdr.detectChanges();
      return true;
    }
    return false;
  }

  closeReduction() {
    if (!this.numberValue || this.numberValue.length === 0 || this.numberValue.includes(null)) {
      if (!this.value || this.value.length === 0) {
        this.startDisplay = '';
        this.endDisplay = '';
        this.numberValue = [];
      } else {
        this.numberValue = this.getNumberValue();
        this.setDisplayValue(this.numberValue);
      }
    }
    if (!this.numberValue.includes(null) && this.value && !this.value.includes(null)) {
      let numberValue = this.getNumberValue();
      if (this.numberValue[0] !== numberValue[0] || this.numberValue[1] !== numberValue[1]) {
        this.numberValue = numberValue;
        this.setDisplayValue(this.numberValue);
      }
    }
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  showPortal($event: Event, type?: 'start' | 'end') {
    type && $event.stopPropagation();
    if (this.disabled || this.animating) return;
    this.activeType = type || 'start';
    this.activeTypeChange.next(this.activeType);
    if (this.active) return;
    this.active = true;
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
      .subscribe((event: MouseEvent) => {
        const clickTarget = event.target as HTMLElement;
        if (clickTarget !== this.inputStartCom.inputRef.nativeElement && clickTarget !== this.inputEndCom.inputRef.nativeElement) {
          this.closeSubject.next();
        }
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
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      activeType: this.activeType,
      extraFooter: this.extraFooter,
      preset: this.preset,
      activeTypeChange: this.activeTypeChange,
      disabledDate: this.disabledDate,
      disabledTime: this.disabledTime,
      closePortal: () => this.closeSubject.next(),
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (dates: Date[], close = true) => this.onNodeClick(dates, close),
      startNodeEmit: (node: Date, close = false, isDatePicker: boolean = true) => this.startNodeClick(node, close, isDatePicker),
      endNodeEmit: (node: Date, close = false, isDatePicker: boolean = true) => this.endNodeClick(node, close, isDatePicker),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  startNodeClick(node?: Date, close = false, isDatePicker: boolean = true) {
    this.startDisplay = !node ? '' : this.type === 'week' ? XDateYearWeek(node)! : this.datePipe.transform(node, this.format)!;
    if (!close && isDatePicker) {
      this.inputEndCom.inputFocus('after');
      this.activeTypeChange.next('end');
    }
    this.cdr.detectChanges();
  }

  endNodeClick(node?: Date, close = false, isDatePicker: boolean = true) {
    this.endDisplay = !node ? '' : this.type === 'week' ? XDateYearWeek(node)! : this.datePipe.transform(node, this.format)!;
    if (!close && isDatePicker) {
      this.inputStartCom.inputFocus('after');
      this.activeTypeChange.next('start');
    }
    this.cdr.detectChanges();
  }

  onNodeClick(dates: Date[], close = true) {
    this.isInput = false;
    this.numberValue = dates.map((x) => x.getTime());
    this.value = this.getValue();
    this.setDisplayValue(this.numberValue);
    this.formControlValidator();
    if (close) {
      this.closeSubject.next();
    }
    this.modelChange();
  }

  onInput() {
    this.isInput = true;
  }

  onFocus(type: 'start' | 'end') {
    this.activeType = type;
    this.activeChange.next(this.activeType);
  }

  setDisplayValue(dateNumber: (number | null)[]) {
    if (!dateNumber) return;
    if (!XIsNull(dateNumber[0])) {
      if (this.type === 'week') {
        this.startDisplay = XDateYearWeek(dateNumber[0]!)!;
      } else {
        this.startDisplay = this.datePipe.transform(dateNumber[0], this.format) as string;
      }
    }
    if (!XIsNull(dateNumber[1])) {
      if (this.type === 'week') {
      } else {
        this.endDisplay = XDateYearWeek(dateNumber[1]!)!;
      }
    }
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
    XClearClass(this.classMap, this.labelMap);
    this.classMap[`${XDateRangePrefix}-${this.size}`] = this.size ? true : false;
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
