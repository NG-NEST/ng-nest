import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit,
  HostBinding,
  HostListener,
  input,
  output,
  computed,
  viewChild,
  signal,
  inject,
  model,
  DestroyRef
} from '@angular/core';
import {
  XDateRangePortalPrefix,
  XDatePickerType,
  XDateCell,
  XDateRangePreset,
  XDatePickerDisabledDate,
  XDatePickerDisabledTime
} from './date-picker.property';
import {
  XIsEmpty,
  XConnectBaseAnimation,
  XPositionTopBottom,
  XAddMonths,
  XAddYears,
  XIsNull,
  XTemplate,
  XIsArray,
  XIsNumber,
  XIsString,
  XAddDays
} from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';
import { DatePipe, LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { XI18nService, XI18nDatePicker, zh_CN } from '@ng-nest/ui/i18n';
import { XPickerMonthComponent } from './picker-month.component';
import { XPickerYearComponent } from './picker-year.component';
import { XPickerDateComponent } from './picker-date.component';
import { XTimePickerFrameComponent, XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XPickerQuarterComponent } from './picker-quarter.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XDateRangePortalPrefix}`,
  imports: [
    NgTemplateOutlet,
    DatePipe,
    XPickerDateComponent,
    XPickerMonthComponent,
    XPickerYearComponent,
    XPickerQuarterComponent,
    XTimePickerModule,
    XButtonComponent,
    XLinkComponent,
    XOutletDirective
  ],
  templateUrl: './date-range-portal.component.html',
  styleUrls: ['./date-range-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation],
  providers: [DatePipe, LowerCasePipe]
})
export class XDateRangePortalComponent implements AfterViewInit {
  @HostBinding('@x-connect-base-animation') public get getPlacement() {
    return this.placement();
  }
  @HostListener('@x-connect-base-animation.done', ['$event']) done() {
    if (this.destroy()) return;
    this.animating.emit(false);
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    if (this.destroy()) return;
    this.animating.emit(true);
  }

  datePipe = inject(DatePipe);
  lowerCasePipe = inject(LowerCasePipe);
  i18n = inject(XI18nService);

  startPicker = viewChild<XPickerDateComponent | XPickerMonthComponent | XPickerYearComponent>('startPicker');
  endPicker = viewChild<XPickerDateComponent | XPickerMonthComponent | XPickerYearComponent>('endPicker');
  timePickerFrame = viewChild<XTimePickerFrameComponent>('timePickerFrame');

  value = model<(number | null)[]>([]);
  placement = input<XPositionTopBottom>();
  type = model<XDatePickerType>('date');
  preset = input<XDateRangePreset[]>([]);
  extraFooter = input<XTemplate>();
  disabledDate = input<XDatePickerDisabledDate>();
  disabledTime = input<XDatePickerDisabledTime>();
  activeType = input<'start' | 'end'>('start');

  animating = output<boolean>();
  nodeClick = output<{ date: Date[]; close?: boolean }>();
  startNodeChanged = output<{ date: Date | null; close?: boolean; isDatePicker?: boolean }>();
  endNodeChanged = output<{ date: Date | null; close?: boolean; isDatePicker?: boolean }>();

  display = signal(new Date());
  model = signal<Date | null>(null);
  startModel = signal<Date | null>(null);
  endModel = signal<Date | null>(null);
  startYear = signal<number | null>(null);
  startDisplay = signal(new Date());
  endDisplay = signal(XAddMonths(this.startDisplay(), 1));

  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.datePicker as XI18nDatePicker)), {
    initialValue: zh_CN.datePicker
  });
  time = signal<number | null>(null);
  timeDisplay = signal(new Date());
  timeModel = signal<Date | null>(null);
  timeHover = signal(false);
  nodeClickCount = signal(0);

  destroy = signal(false);
  private destroyRef = inject(DestroyRef);

  isDatePicker = computed(() => {
    return ['date', 'quarter', 'week', 'month', 'year'].includes(this.type());
  });

  sureDisabled = computed(() => {
    if (this.timePickerFrame() && !XIsEmpty(this.time())) {
      const dt = new Date(this.time()!);
      const hours = dt.getHours();
      const minutes = dt.getMinutes();
      const seconds = dt.getSeconds();
      return (
        this.timePickerFrame()?.setDisabled('hours', hours) ||
        this.timePickerFrame()?.setDisabled('minutes', minutes) ||
        this.timePickerFrame()?.setDisabled('seconds', seconds)
      );
    } else {
      return true;
    }
  });

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
    });
  }

  ngAfterViewInit() {
    this.init();
  }

  init() {
    if (!XIsEmpty(this.value())) {
      this.setDefault();
    } else {
      this.value.set([null, null]);
      this.model.set(this.display());
      this.startModel.set(this.model());
      this.endModel.set(this.setModelByType(this.model()!, this.isDatePicker() ? 1 : 0));
      this.setDisplay(this.model()!);
    }
  }

  setModelByType(byModel: Date, num: number = 1) {
    if (['month', 'quarter'].includes(this.type())) {
      return XAddYears(byModel!, num);
    } else if (this.type() === 'year') {
      return XAddYears(byModel!, 10 * num);
    } else {
      return XAddMonths(byModel!, num);
    }
  }

  setDatesState(cell: XDateCell) {
    if (this.type() === 'week') return;
    this.startPicker()?.setDatesState(cell);
    this.endPicker()?.setDatesState(cell);
  }

  setDefault() {
    const type = this.activeType() || 'start';
    this.timeHover.set(!this.value().every((x) => x === null));
    if (type === 'start') {
      this.startModel.set(new Date(this.value()[0]!));
      this.startDisplay.set(this.startModel()!);
      this.endModel.set(this.setModelByType(this.startModel()!, this.isDatePicker() ? 1 : 0));
      this.endDisplay.set(this.endModel()!);
      this.timeModel.set(this.startModel());
      this.timeDisplay.set(this.startDisplay());
      this.time.set(this.startModel()!.getTime());
    } else if (type === 'end') {
      this.endModel.set(new Date(this.value()[1]!));
      this.endDisplay.set(this.endModel()!);
      this.startModel.set(this.setModelByType(this.endModel()!, this.isDatePicker() ? -1 : 0));
      this.startDisplay.set(this.startModel()!);
      this.timeModel.set(this.endModel());
      this.timeDisplay.set(this.endDisplay());
      this.time.set(this.endModel()!.getTime());
    }
  }

  setDisplay(date: Date) {
    this.display.set(new Date(date.getFullYear(), date.getMonth(), 1));
    this.startDisplay.set(this.display());
    this.endDisplay.set(this.setModelByType(this.display(), this.isDatePicker() ? 1 : 0));
  }

  dateChange(date: Date) {
    this.nodeClickCount.update((x) => x + 1);
    let close = this.nodeClickCount() === 2;
    let time = this.setDateChangeTime(date);
    const isDatePicker = this.isDatePicker();
    date = new Date(time);
    if (this.activeType() === 'start') {
      this.value()[0] = time;
      if (!XIsNull(this.value()[1]) && time > this.value()[1]!) {
        if (this.nodeClickCount() === 2) {
          this.nodeClickCount.update((x) => x - 1);
        }
        close = false;
        this.endModel.set(null);
        this.value.update((x) => {
          x[1] = null;
          return [...x];
        });
        if (!isDatePicker) {
          this.timeHover.set(false);
        }
        this.endNodeChanged.emit({ date: null, close, isDatePicker });
      }
      this.startNodeChanged.emit({ date, close, isDatePicker });
    } else if (this.activeType() === 'end') {
      this.value()[1] = time;
      if (!XIsNull(this.value()[0]) && time < this.value()[0]!) {
        if (this.nodeClickCount() === 2) {
          this.nodeClickCount.update((x) => x - 1);
        }
        close = false;
        this.startModel.set(null);
        this.value.update((x) => {
          x[0] = null;
          return [...x];
        });
        if (!isDatePicker) {
          this.timeHover.set(false);
        }
        this.startNodeChanged.emit({ date: null, close, isDatePicker });
      }
      this.endNodeChanged.emit({ date, close, isDatePicker });
    }
    if (!this.value().includes(null) && isDatePicker) {
      this.nodeClick.emit({ date: this.value().map((x) => new Date(x!)), close });
    }
  }

  setDateChangeTime(date: Date) {
    if (this.isDatePicker()) {
      return date.getTime();
    } else {
      let time = new Date();
      if (this.time()) {
        time = new Date(this.time()!);
      } else {
        this.time.set(time.getTime());
      }
      if (['date-hour', 'date-minute'].includes(this.type())) {
        time.setSeconds(0);
      }
      if (this.type() === 'date-hour') {
        time.setMinutes(0);
      }

      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      ).getTime();
    }
  }

  typeChange(type: XDatePickerType) {
    this.type.set(type);
  }

  yearStartChange(number: number) {
    this.startYear.set(number);
  }

  nextMonth(num: number) {
    let date = new Date(this.display());
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
  }

  nextYear(num: number) {
    let date = new Date(this.display());
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
  }

  nextYears(num: number) {
    this.startYear.update((x) => x! + num);
    let date = new Date(this.display());
    date.setFullYear(this.startYear()!);
    this.setDisplay(date);
  }

  getLocaleMonth(date: Date) {
    return (this.locale() as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  selectTime(time: Date) {
    this.time.set(time.getTime());
    if (XIsEmpty(this.timeModel())) {
      this.timeModel.set(new Date());
    }
    this.timeModel()?.setHours(time.getHours());
    this.timeModel()?.setMinutes(time.getMinutes());
    this.timeModel()?.setSeconds(time.getSeconds());
    this.dateChange(this.timeModel()!);
  }

  sureTime() {
    if (this.sureDisabled()) return;
    const [start, end] = this.value();
    if (XIsNull(start) && !XIsNull(end)) {
      this.time.set(null);
      this.timeHover.set(true);
      this.endNodeChanged.emit({ date: new Date(end!), close: false, isDatePicker: true });
    } else if (!XIsNull(start) && XIsNull(end)) {
      this.time.set(null);
      this.timeHover.set(true);
      this.startNodeChanged.emit({ date: new Date(start!), close: false, isDatePicker: true });
    } else {
      this.nodeClick.emit({ date: this.value().map((x) => new Date(x!)), close: true });
    }
  }

  yearChange(num: number, type?: 'start' | 'end') {
    if (type === 'start') {
      this.endDisplay.update((x) => XAddYears(x, num));
    } else if (type === 'end') {
      this.startDisplay.update((x) => XAddYears(x, num));
    }
  }

  monthChange(num: number, type?: 'start' | 'end') {
    if (type === 'start') {
      this.endDisplay.update((x) => XAddMonths(x, num));
    } else if (type === 'end') {
      this.startDisplay.update((x) => XAddMonths(x, num));
    }
  }

  onPreset(type: 'week' | 'month' | 'year', num = 0) {
    let now = new Date();
    if (type === 'week') {
      now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const week = now.getDay();
      const weekList = [1, 2, 3, 4, 5, 6, 7];
      const index = weekList.indexOf(week);
      this.nodeClick.emit({
        date: [XAddDays(now, weekList[0] - (index + 1) + num * 7), XAddDays(now, weekList[6] - (index + 1) + num * 7)],
        close: true
      });
    } else if (type === 'month') {
      const month = XAddMonths(now, num);
      const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
      const lastDay = XAddDays(XAddMonths(firstDay, 1), -1);
      this.nodeClick.emit({ date: [firstDay, lastDay], close: true });
    } else if (type === 'year') {
      let year = XAddYears(now, num);
      let firstDay = new Date(year.getFullYear(), 0, 1);
      let lastDay = XAddDays(XAddYears(firstDay, 1), -1);
      this.nodeClick.emit({ date: [firstDay, lastDay], close: true });
    }
  }

  onPresetFunc(item: XDateRangePreset) {
    let value = item.func();
    if (XIsArray(value) && value.length > 1) {
      if (XIsNumber(value[0]) || XIsString(value[0])) {
        value = value.map((x) => new Date(x));
      }
      this.nodeClick.emit({ date: value, close: true });
    }
  }
}
