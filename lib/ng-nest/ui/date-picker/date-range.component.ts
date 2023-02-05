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
  XIsNull
} from '@ng-nest/ui/core';
import { XInputComponent, XInputGroupComponent } from '@ng-nest/ui/input';
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
  @ViewChild('dateRange', { static: true }) dateRange!: ElementRef<HTMLElement>;
  @ViewChild('inputGroup', { static: true }) inputGroup!: XInputGroupComponent;
  @ViewChild('inputStartCom', { static: true }) inputStartCom!: XInputComponent;
  @ViewChild('inputEndCom', { static: true }) inputEndCom!: XInputComponent;

  modelType: XDatePickerModelType = 'date';
  numberValue!: (number | null)[];
  isInput = false;
  showClearable: boolean = false;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  override writeValue(value: any) {
    if (XIsUndefined(value) || XIsNull(value)) value = [];
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
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public configService: XConfigService,
    public override cdr: ChangeDetectorRef,
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
      this.cdr.detectChanges();
      return true;
    }
    return false;
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
      preset: this.preset,
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      activeType: this.activeType,
      activeTypeChange: this.activeTypeChange,
      closePortal: () => this.closeSubject.next(),
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (dates: Date[], close = true) => this.onNodeClick(dates, close),
      startNodeEmit: (node: Date, close = false) => this.startNodeClick(node, close),
      endNodeEmit: (node: Date, close = false) => this.endNodeClick(node, close),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  startNodeClick(node?: Date, close = false) {
    this.startDisplay = !node ? '' : (this.datePipe.transform(node, this.format) as string);
    if (!close) {
      this.inputEndCom.inputFocus('after');
      this.activeTypeChange.next('end');
    }
    this.cdr.detectChanges();
  }

  endNodeClick(node?: Date, close = false) {
    this.endDisplay = !node ? '' : (this.datePipe.transform(node, this.format) as string);
    if (!close) {
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
      this.startDisplay = this.datePipe.transform(dateNumber[0], this.format) as string;
    }
    if (!XIsNull(dateNumber[1])) {
      this.endDisplay = this.datePipe.transform(dateNumber[1], this.format) as string;
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
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
