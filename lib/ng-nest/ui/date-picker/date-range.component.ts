import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { Subject, fromEvent } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  OnChanges,
  ViewContainerRef,
  SimpleChanges,
  inject,
  OnDestroy,
  AfterViewInit,
  viewChild,
  signal,
  HostBinding,
  computed,
  ComponentRef,
  effect
} from '@angular/core';
import { XDatePickerModelType, XDateRangePrefix, XDateRangeProperty } from './date-picker.property';
import {
  XIsEmpty,
  XIsDate,
  XIsNumber,
  XIsChange,
  XCorner,
  XIsString,
  XIsNull,
  XDateYearWeek,
  XDateYearQuarter,
  XParents,
  XPlacement
} from '@ng-nest/ui/core';
import { XInputComponent, XInputGroupComponent } from '@ng-nest/ui/input';
import { DOCUMENT, DatePipe, NgClass } from '@angular/common';
import {
  Overlay,
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayRef
} from '@angular/cdk/overlay';
import { filter, map, takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XDateRangePortalComponent } from './date-range-portal.component';
import { XI18nDatePicker, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XDateRangePrefix}`,
  imports: [NgClass, FormsModule, XInputComponent, XInputGroupComponent],
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDateRangeComponent), DatePipe]
})
export class XDateRangeComponent extends XDateRangeProperty implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @HostBinding('class') get className() {
    return `x-date-range-${this.type()}`;
  }
  dateRange = viewChild.required('dateRange', { read: ElementRef<HTMLElement> });
  inputGroup = viewChild.required('inputGroup', { read: XInputGroupComponent });
  inputStartCom = viewChild.required('inputStartCom', { read: XInputComponent });
  inputEndCom = viewChild.required('inputEndCom', { read: XInputComponent });

  modelType = signal<XDatePickerModelType>('date');
  numberValue = signal<(number | null)[]>([]);
  isInput = signal(false);
  showClearable = signal(false);

  startPlaceholder() {
    if (this.placeholder() && this.placeholder().length > 0) return this.placeholder()[0];
    if (this.type() === 'month') {
      return this.locale().startMonth;
    } else if (this.type() === 'quarter') {
      return this.locale().startQuarter;
    } else if (this.type() === 'year') {
      return this.locale().startYear;
    } else if (this.type() === 'week') {
      return this.locale().startWeek;
    } else {
      return this.locale().startDate;
    }
  }

  endPlaceholder() {
    if (this.placeholder() && this.placeholder().length > 1) return this.placeholder()[1];
    if (this.type() === 'month') {
      return this.locale().endMonth;
    } else if (this.type() === 'quarter') {
      return this.locale().endQuarter;
    } else if (this.type() === 'year') {
      return this.locale().endYear;
    } else if (this.type() === 'week') {
      return this.locale().endWeek;
    } else {
      return this.locale().endDate;
    }
  }

  override writeValue(value: any) {
    if (XIsEmpty(value)) {
      value = [];
      this.numberValue.set([]);
    }
    if (value.length > 0) {
      if (XIsDate(value[0])) {
        this.modelType.set('date');
        this.numberValue.set(value.map((x: Date) => x.getTime()));
      } else if (XIsNumber(value[0])) {
        this.modelType.set('number');
        this.numberValue.set(value);
      } else if (XIsString(value[0])) {
        this.modelType.set('string');
        const valueTime = value.map((x: string) => new Date(x).getTime());
        this.numberValue.set(!isNaN(valueTime[0]) ? valueTime : []);
      }
    }
    this.value.set(value);
    this.setDisplayValue(this.numberValue());
  }

  enter = signal(false);
  inputClearable = signal(false);
  animating = signal(false);
  displayValue = signal<string[]>([]);
  portal!: XPortalOverlayRef<XDateRangePortalComponent>;
  icon = signal('fto-calendar');
  closeSubject: Subject<void> = new Subject();
  startDisplay = signal<string | number>('');
  endDisplay = signal<string | number>('');
  activeType = signal<'start' | 'end'>('start');
  private unSubject = new Subject<void>();
  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private datePipe = inject(DatePipe);
  private overlay = inject(Overlay);
  private i18n = inject(XI18nService);

  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.datePicker as XI18nDatePicker)), {
    initialValue: zh_CN.datePicker
  });

  classMap = computed(() => ({
    [`${XDateRangePrefix}-${this.size()}`]: !!this.size(),
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));

  formatSignal = computed(() => {
    if (this.format() !== 'yyyy-MM-dd') return this.format();
    if (this.type() === 'date') {
      return 'yyyy-MM-dd';
    } else if (this.type() === 'year') {
      return 'yyyy';
    } else if (this.type() === 'month') {
      return 'yyyy-MM';
    } else if (this.type() === 'date-time') {
      return 'yyyy-MM-dd HH:mm:ss';
    } else if (this.type() === 'date-hour') {
      return 'yyyy-MM-dd HH';
    } else if (this.type() === 'date-minute') {
      return 'yyyy-MM-dd HH:mm';
    }
    return this.format();
  });

  getValue = computed(() => {
    return this.modelType() === 'date'
      ? this.numberValue().map((x) => new Date(x!))
      : this.modelType() === 'string'
        ? this.numberValue().map((x) => this.datePipe.transform(x!, this.formatSignal()))
        : this.numberValue();
  });

  getNumberValue = computed(() => {
    return this.modelType() === 'date'
      ? this.value().map((x: Date) => x.getTime())
      : this.modelType() === 'string'
        ? this.value().map((x: string) => new Date(x).getTime())
        : this.value();
  });

  private realPlacement = signal<XPlacement | null>(null);
  portalComponent = signal<ComponentRef<XDateRangePortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('value', this.numberValue()));
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
    effect(() => this.portalComponent()?.setInput('activeType', this.activeType()));
    effect(() => this.portalComponent()?.setInput('type', this.type()));
    effect(() => this.portalComponent()?.setInput('preset', this.preset()));
    effect(() => this.portalComponent()?.setInput('extraFooter', this.extraFooter()));
    effect(() => this.portalComponent()?.setInput('disabledDate', this.disabledDate()));
    effect(() => this.portalComponent()?.setInput('disabledTime', this.disabledTime()));
  }

  ngOnInit() {
    this.setSubject();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { type } = changes;
    if (XIsChange(type)) {
      this.setDisplayValue(this.numberValue());
    }
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
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
          takeUntil(this.unSubject)
        )
        .subscribe(() => {
          this.portalOverlayRef()?.updatePosition();
          const eract = this.elementRef.nativeElement.getBoundingClientRect();
          const frect = firstScroll!.getBoundingClientRect();
          if (eract.top + eract.height - frect.top < 0 || eract.bottom > frect.bottom) {
            this.closeSubject.next();
          }
        });
    }
  }

  menter() {
    if (this.disabledComputed() || !this.clearable()) return;
    this.enter.set(true);
    if (!XIsEmpty(this.numberValue())) {
      this.icon.set('');
      this.showClearable.set(true);
    }
  }

  mleave() {
    if (this.disabledComputed() || !this.clearable()) return;
    this.enter.set(false);
    if (this.clearable()) {
      this.icon.set('fto-calendar');
      this.showClearable.set(false);
    }
  }

  clearEmit() {
    this.value.set([]);
    this.numberValue.set([]);
    this.startDisplay.set('');
    this.endDisplay.set('');
    this.mleave();
    this.formControlValidator();
    this.modelChange();
    this.inputStartCom().inputFocus('focus');
  }

  onIconClick(event: Event) {
    if (this.icon() === 'fto-x') {
      this.clearEmit();
    }
    event.stopPropagation();
  }

  modelChange() {
    if (this.onChange) {
      this.onChange(this.getValue());
    }
  }

  portalAttached() {
    return this.portalOverlayRef()?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active.set(false);
      this.closeReduction();
      return true;
    }
    return false;
  }

  closeReduction() {
    if (!this.numberValue() || this.numberValue().length === 0 || this.numberValue().includes(null)) {
      if (!this.value() || this.value().length === 0) {
        this.startDisplay.set('');
        this.endDisplay.set('');
        this.numberValue.set([]);
      } else {
        this.numberValue.set(this.getNumberValue());
        this.setDisplayValue(this.numberValue());
      }
    }
    if (!this.numberValue().includes(null) && this.value() && !this.value().includes(null)) {
      let numberValue = this.getNumberValue();
      if (this.numberValue()[0] !== numberValue[0] || this.numberValue()[1] !== numberValue[1]) {
        this.numberValue.set(numberValue);
        this.setDisplayValue(this.numberValue());
      }
    }
  }

  showPortal($event: Event, type?: 'start' | 'end') {
    type && $event.stopPropagation();
    if (this.disabled() || this.animating()) return;
    this.activeType.set(type || 'start');
    if (this.active()) return;
    this.active.set(true);
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
      .pipe(takeUntil(this.unSubject))
      .subscribe((event: MouseEvent) => {
        const clickTarget = event.target as HTMLElement;
        if (
          clickTarget !== this.inputStartCom().inputRef().nativeElement &&
          clickTarget !== this.inputEndCom().inputRef().nativeElement
        ) {
          this.closeSubject.next();
        }
      });
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this.unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XCorner;
      if (place !== this.realPlacement()) {
        this.realPlacement.set(place);
        this.portalOverlayRef()?.updatePosition();
      }
    });
  }

  setInstance() {
    let { componentRef, overlayRef } = this.portal;
    if (!componentRef || !overlayRef) return;
    this.portalComponent.set(componentRef);
    this.portalOverlayRef.set(overlayRef);
    this.realPlacement.set(this.placement());
    const { nodeClick, startNodeChanged, endNodeChanged, animating } = componentRef.instance;
    nodeClick.subscribe((x) => this.onNodeClick(x.date, x.close));
    startNodeChanged.subscribe((x) => this.startNodeClick(x.date!, x.close, x.isDatePicker));
    endNodeChanged.subscribe((x) => this.endNodeClick(x.date!, x.close, x.isDatePicker));
    animating.subscribe((x) => this.animating.set(x));
  }

  startNodeClick(node?: Date, close = false, isDatePicker: boolean = true) {
    this.startDisplay.set(
      !node
        ? ''
        : this.type() === 'week'
          ? XDateYearWeek(node)!
          : this.type() === 'quarter'
            ? XDateYearQuarter(node)!
            : this.datePipe.transform(node, this.formatSignal())!
    );
    if (!close && isDatePicker) {
      this.inputEndCom().inputFocus('focus');
      this.activeType.set('end');
    }
  }

  endNodeClick(node?: Date, close = false, isDatePicker: boolean = true) {
    this.endDisplay.set(
      !node
        ? ''
        : this.type() === 'week'
          ? XDateYearWeek(node)!
          : this.type() === 'quarter'
            ? XDateYearQuarter(node)!
            : this.datePipe.transform(node, this.formatSignal())!
    );
    if (!close && isDatePicker) {
      this.inputStartCom().inputFocus('focus');
      this.activeType.set('start');
    }
  }

  onNodeClick(dates: Date[], close = true) {
    this.isInput.set(false);
    this.numberValue.set(dates.map((x) => x.getTime()));
    this.value.set(this.getValue());
    this.setDisplayValue(this.numberValue());
    this.formControlValidator();
    if (close) {
      this.closeSubject.next();
    }
    this.modelChange();
  }

  onInput() {
    this.isInput.set(true);
  }

  onFocus(type: 'start' | 'end') {
    this.activeType.set(type);
  }

  setDisplayValue(dateNumber: (number | null)[]) {
    if (!dateNumber) return;
    if (!XIsNull(dateNumber[0])) {
      if (this.type() === 'week') {
        this.startDisplay.set(XDateYearWeek(dateNumber[0]!)!);
      } else if (this.type() === 'quarter') {
        this.startDisplay.set(XDateYearQuarter(dateNumber[0]!)!);
      } else {
        this.startDisplay.set(this.datePipe.transform(dateNumber[0], this.formatSignal()) as string);
      }
    }
    if (!XIsNull(dateNumber[1])) {
      if (this.type() === 'week') {
        this.endDisplay.set(XDateYearWeek(dateNumber[1]!)!);
      } else if (this.type() === 'quarter') {
        this.endDisplay.set(XDateYearQuarter(dateNumber[1]!)!);
      } else {
        this.endDisplay.set(this.datePipe.transform(dateNumber[1], this.formatSignal()) as string);
      }
    }
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputGroup().elementRef,
      placement: [this.placement() as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-date-range-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portalOverlayRef()?.updatePositionStrategy(this.setPlacement());
  }

  formControlChanges() {
    this.ngOnInit();
  }
}
