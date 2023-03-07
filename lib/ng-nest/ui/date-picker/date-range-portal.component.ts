import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
  HostBinding,
  HostListener,
  ViewChild
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
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { XI18nService, XI18nDatePicker } from '@ng-nest/ui/i18n';
import { XPickerMonthComponent } from './picker-month.component';
import { XPickerYearComponent } from './picker-year.component';
import { XPickerDateComponent } from './picker-date.component';
import { XTimePickerFrameComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: `${XDateRangePortalPrefix}`,
  templateUrl: './date-range-portal.component.html',
  styleUrls: ['./date-range-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation],
  providers: [DatePipe, LowerCasePipe]
})
export class XDateRangePortalComponent implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    this.animating(true);
  }

  @ViewChild('startPicker') startPicker!: XPickerDateComponent | XPickerMonthComponent | XPickerYearComponent;
  @ViewChild('endPicker') endPicker!: XPickerDateComponent | XPickerMonthComponent | XPickerYearComponent;
  @ViewChild('timePickerFrame') timePickerFrame?: XTimePickerFrameComponent;

  type: XDatePickerType = 'date';
  display = new Date();
  model!: Date;
  startModel!: Date | null;
  endModel!: Date | null;
  startYear!: number;
  startDisplay: Date = new Date();
  endDisplay: Date = XAddMonths(this.startDisplay, 1);
  value: (number | null)[] = [];
  valueChange!: Subject<number[]>;
  positionChange!: Subject<any>;
  activeTypeChange!: Subject<'start' | 'end'>;
  activeType!: 'start' | 'end';
  animating!: Function;
  closePortal!: Function;
  destroyPortal!: Function;
  disabledDate!: XDatePickerDisabledDate;
  disabledTime!: XDatePickerDisabledTime;
  nodeEmit!: (date: Date[], close?: boolean) => void;
  startNodeEmit!: (date: Date | null, close?: boolean, isDatePicker?: boolean) => void;
  endNodeEmit!: (date: Date | null, close?: boolean, isDatePicker?: boolean) => void;
  locale: XI18nDatePicker = {};
  time!: number | null;
  timeDisplay: Date = new Date();
  timeModel!: Date | null;
  timeHover = false;
  nodeClickCount = 0;
  preset: XDateRangePreset[] = [];
  extraFooter?: XTemplate;
  private _unSubject = new Subject<void>();

  get isDatePicker() {
    return ['date', 'month', 'year'].includes(this.type);
  }

  get sureDisabled() {
    if (this.timePickerFrame && !XIsEmpty(this.time)) {
      const dt = new Date(this.time!);
      const hours = dt.getHours();
      const minutes = dt.getMinutes();
      const seconds = dt.getSeconds();
      return (
        this.timePickerFrame.setDisabled('hours', hours) ||
        this.timePickerFrame.setDisabled('minutes', minutes) ||
        this.timePickerFrame.setDisabled('seconds', seconds)
      );
    } else {
      return true;
    }
  }

  constructor(public datePipe: DatePipe, public lowerCasePipe: LowerCasePipe, public cdr: ChangeDetectorRef, public i18n: XI18nService) {}

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.value = x;
      this.init();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
    this.activeTypeChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.activeType = x;
      if (!XIsEmpty(this.startDisplay) && !XIsEmpty(this.endDisplay)) {
        console.log(1111);
      }
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

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    } else {
      this.value = [null, null];
      this.model = this.display;
      this.startModel = this.model;
      this.endModel = this.setModelByType(this.model, this.isDatePicker ? 1 : 0);
      this.setDisplay(this.model);
    }
    this.cdr.detectChanges();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setModelByType(byModel: Date, num: number = 1) {
    if (this.type === 'month') {
      return XAddYears(byModel!, num);
    } else if (this.type === 'year') {
      return XAddYears(byModel!, 10 * num);
    } else {
      return XAddMonths(byModel!, num);
    }
  }

  setDatesState(cell: XDateCell) {
    this.startPicker?.setDatesState(cell);
    this.endPicker?.setDatesState(cell);
  }

  setDefault() {
    const type = this.activeType || 'start';
    this.timeHover = !this.value.every((x) => x === null);
    if (type === 'start') {
      this.startModel = new Date(this.value[0]!);
      this.startDisplay = this.startModel;
      this.endModel = this.setModelByType(this.startModel, this.isDatePicker ? 1 : 0);
      this.endDisplay = this.endModel!;
      this.timeModel = this.startModel;
      this.timeDisplay = this.startDisplay;
      this.time = this.startModel.getTime();
    } else if (type === 'end') {
      this.endModel = new Date(this.value[1]!);
      this.endDisplay = this.endModel;
      this.startModel = this.setModelByType(this.endModel, this.isDatePicker ? -1 : 0);
      this.startDisplay = this.startModel!;
      this.timeModel = this.endModel;
      this.timeDisplay = this.endDisplay;
      this.time = this.endModel.getTime();
    }
    this.cdr.detectChanges();
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
    this.startDisplay = this.display;
    this.endDisplay = this.setModelByType(this.display, this.isDatePicker ? 1 : 0);
  }

  dateChange(date: Date) {
    this.nodeClickCount++;
    let close = this.nodeClickCount === 2;
    let time = this.setDateChangeTime(date);
    date = new Date(time);
    if (this.activeType === 'start') {
      this.value[0] = time;
      if (!XIsNull(this.value[1]) && time > this.value[1]!) {
        if (this.nodeClickCount === 2) {
          this.nodeClickCount--;
        }
        close = false;
        this.endModel = null;
        this.value[1] = null;
        if (!this.isDatePicker) {
          this.timeHover = false;
        }
        this.endNodeEmit(null, close, this.isDatePicker);
      }
      this.startNodeEmit(date, close, this.isDatePicker);
    } else if (this.activeType === 'end') {
      this.value[1] = time;
      if (!XIsNull(this.value[0]) && time < this.value[0]!) {
        if (this.nodeClickCount === 2) {
          this.nodeClickCount--;
        }
        close = false;
        this.startModel = null;
        this.value[0] = null;
        if (!this.isDatePicker) {
          this.timeHover = false;
        }
        this.startNodeEmit(null, close, this.isDatePicker);
      }
      this.endNodeEmit(date, close, this.isDatePicker);
    }
    if (!this.value.includes(null) && this.isDatePicker) {
      this.nodeEmit(
        this.value.map((x) => new Date(x!)),
        close
      );
    }
  }

  setDateChangeTime(date: Date) {
    if (this.isDatePicker) {
      return date.getTime();
    } else {
      let time = new Date();
      if (this.time) {
        time = new Date(this.time);
      } else {
        this.time = time.getTime();
      }
      if (['date-hour', 'date-minute'].includes(this.type)) {
        time.setSeconds(0);
      }
      if (this.type === 'date-hour') {
        time.setMinutes(0);
      }

      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds()).getTime();
    }
  }

  typeChange(type: XDatePickerType) {
    this.type = type;
    this.cdr.detectChanges();
  }

  yearStartChange(number: number) {
    this.startYear = number;
    this.cdr.detectChanges();
  }

  nextMonth(num: number) {
    let date = new Date(this.display);
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  nextYear(num: number) {
    let date = new Date(this.display);
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  nextYears(num: number) {
    this.startYear += num;
    let date = new Date(this.display);
    date.setFullYear(this.startYear);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  getLocaleMonth(date: Date) {
    return (this.locale as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  selectTime(time: Date) {
    this.time = time.getTime();
    if (XIsEmpty(this.timeModel)) {
      this.timeModel = new Date();
    }
    this.timeModel?.setHours(time.getHours());
    this.timeModel?.setMinutes(time.getMinutes());
    this.timeModel?.setSeconds(time.getSeconds());
    this.dateChange(this.timeModel!);
    this.cdr.detectChanges();
  }

  sureTime() {
    if (this.sureDisabled) return;
    const [start, end] = this.value;
    if (XIsNull(start) && !XIsNull(end)) {
      this.time = null;
      this.timeHover = true;
      this.endNodeEmit(new Date(end!), false, true);
    } else if (!XIsNull(start) && XIsNull(end)) {
      this.time = null;
      this.timeHover = true;
      this.startNodeEmit(new Date(start!), false, true);
    } else {
      this.nodeEmit(
        this.value.map((x) => new Date(x!)),
        true
      );
    }
  }

  yearChange(num: number, type?: 'start' | 'end') {
    if (type === 'start') {
      this.endDisplay = XAddYears(this.endDisplay, num);
    } else if (type === 'end') {
      this.startDisplay = XAddYears(this.startDisplay, num);
    }
  }

  monthChange(num: number, type?: 'start' | 'end') {
    if (type === 'start') {
      this.endDisplay = XAddMonths(this.endDisplay, num);
    } else if (type === 'end') {
      this.startDisplay = XAddMonths(this.startDisplay, num);
    }
  }

  onPreset(type: 'week' | 'month' | 'year', num = 0) {
    let now = new Date();
    if (type === 'week') {
      now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const week = now.getDay();
      const weekList = [1, 2, 3, 4, 5, 6, 7];
      const index = weekList.indexOf(week);
      this.nodeEmit([XAddDays(now, weekList[0] - (index + 1) + num * 7), XAddDays(now, weekList[6] - (index + 1) + num * 7)], true);
    } else if (type === 'month') {
      const month = XAddMonths(now, num);
      const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
      const lastDay = XAddDays(XAddMonths(firstDay, 1), -1);
      this.nodeEmit([firstDay, lastDay], true);
    } else if (type === 'year') {
      let year = XAddYears(now, num);
      let firstDay = new Date(year.getFullYear(), 0, 1);
      let lastDay = XAddDays(XAddYears(firstDay, 1), -1);
      this.nodeEmit([firstDay, lastDay], true);
    }
  }

  onPresetFunc(item: XDateRangePreset) {
    let value = item.func();
    if (XIsArray(value) && value.length > 1) {
      if (XIsNumber(value[0]) || XIsString(value[0])) {
        value = value.map((x) => new Date(x));
      }
      this.nodeEmit(value, true);
    }
  }
}
