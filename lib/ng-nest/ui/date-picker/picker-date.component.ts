import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { XChunk, XIsChange, XConfigService, XIsNull, XIsFunction, XDateWeek, XDateYearWeek } from '@ng-nest/ui/core';
import { XDateCell, XDatePickerType, XPickerDatePrefix, XPickerDateProperty } from './date-picker.property';
import { Subject } from 'rxjs';
import { XI18nDatePicker, XI18nPipe, XI18nService } from '@ng-nest/ui/i18n';
import { map, takeUntil } from 'rxjs/operators';
import { CommonModule, DatePipe, LowerCasePipe } from '@angular/common';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: `${XPickerDatePrefix}`,
  standalone: true,
  imports: [CommonModule, XLinkComponent, XI18nPipe],
  templateUrl: './picker-date.component.html',
  styleUrls: ['./picker-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe]
})
export class XPickerDateComponent extends XPickerDateProperty implements OnChanges {
  titles = [
    'datePicker.monday',
    'datePicker.tuesday',
    'datePicker.wednesday',
    'datePicker.thursday',
    'datePicker.friday',
    'datePicker.saturday',
    'datePicker.sunday'
  ];
  now = new Date();
  dates: XDateCell[] = [];
  weekDates: XDateCell[][] = [];
  clickCell?: XDateCell;
  locale: XI18nDatePicker = {};
  private _unSubject = new Subject<void>();

  get rangeStart() {
    if (this.rangeValue && this.rangeValue.length > 0) {
      return this.rangeValue[0];
    }
    return '';
  }

  get rangeEnd() {
    if (this.rangeValue && this.rangeValue.length > 1) {
      return this.rangeValue[1];
    }
    return '';
  }

  get isWeek() {
    return this.type === 'week';
  }

  get isWeekRange() {
    return this.type === 'week' && this.rangePicker;
  }

  get isNotWeekRange() {
    return this.type !== 'week' && this.rangePicker;
  }

  isDisabled(date: Date) {
    if (this.disabledDate && XIsFunction(this.disabledDate)) {
      return this.disabledDate(date);
    } else {
      return false;
    }
  }

  private cdr = inject(ChangeDetectorRef);
  private datePipe = inject(DatePipe);
  private lowerCasePipe = inject(LowerCasePipe);
  private i18n = inject(XI18nService);
  configService = inject(XConfigService);

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.datePicker as XI18nDatePicker),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
    this.setTitles();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { display } = simples;
    XIsChange(display) && this.init();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  init() {
    this.setDays(this.display);
  }

  isWeekActive(week: XDateCell[]) {
    if (week.length > 1) {
      return XDateYearWeek(week[1].date!) === XDateYearWeek(this.model!);
    }
    return false;
  }

  isStartWeek(week: XDateCell[]) {
    if (!this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[0]) && week.length > 1) {
      return XDateYearWeek(week[1].date!) === XDateYearWeek(this.rangeValue[0]!);
    }
    return false;
  }

  isEndWeek(week: XDateCell[]) {
    if (!this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[1]) && week.length > 1) {
      return XDateYearWeek(week[1].date!) === XDateYearWeek(this.rangeValue[1]!);
    }
    return false;
  }

  isInRangeWeek(week: XDateCell[]) {
    if (!this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[0]) && !XIsNull(this.rangeValue[1]) && week.length > 1) {
      let time = week[1].date?.getTime()!;
      return time > this.rangeValue[0]! && time < this.rangeValue[1]!;
    }
    return false;
  }

  isStartDate(date: Date) {
    if (this.type === 'week' || !this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[0])) {
      return this.datePipe.transform(this.rangeValue[0], 'yyyyMMdd') === this.datePipe.transform(date, 'yyyyMMdd');
    }
    return;
  }

  isEndDate(date: Date) {
    if (this.type === 'week' || !this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[1])) {
      return this.datePipe.transform(this.rangeValue[1], 'yyyyMMdd') === this.datePipe.transform(date, 'yyyyMMdd');
    }
    return;
  }

  setDatesState(cell: XDateCell) {
    this.clearState(...this.dates);
    for (let item of this.dates) {
      this.setDayState(item);
    }
    this.onTdMouseenter(cell, false);
  }

  setTitles() {
    if (this.type === 'week') {
      this.titles = ['datePicker.week', ...this.titles];
    }
  }

  onTdMouseenter(cell: XDateCell, isEmit = true) {
    const [start, end] = this.rangeValue;
    if (!XIsNull(start) || !XIsNull(end)) {
      const time = cell.date!.getTime();
      for (let item of this.dates) {
        const itemTime = item.date!.getTime();
        this.clearState(item);
        if (!XIsNull(start) && XIsNull(end)) {
          item.isRangeHoverStartLeft = time < start! && itemTime === start!;
          item.isRangeHoverStartRight = time > start! && itemTime === start!;
          item.isRangeHover =
            (time < start! && itemTime >= time && itemTime < start!) ||
            (time > start! && itemTime > start! && itemTime <= time);
          item.isRangeHoverStart = itemTime === time && time < start!;
          item.isRangeHoverEnd = itemTime === time && time > start!;
        } else if (XIsNull(start) && !XIsNull(end)) {
          item.isRangeHoverEndLeft = time < end! && itemTime === end!;
          item.isRangeHoverEndRight = time > end! && itemTime === end!;
          item.isRangeHover =
            (time < end! && itemTime >= time && itemTime < end!) ||
            (time > end! && itemTime > end! && itemTime <= time);
          item.isRangeHoverStart = itemTime === time && time < end!;
          item.isRangeHoverEnd = itemTime === time && time > end!;
        } else if (!XIsNull(start) && !XIsNull(end)) {
          item.isRangeHoverStartLeft = time < start! && itemTime === start!;
          item.isRangeHoverEndRight = time > end! && itemTime === end!;
          item.isRangeHover =
            (time < start! && itemTime >= time && itemTime < start!) ||
            (time > end! && itemTime > end! && itemTime <= time);
          item.isRangeHoverStart = itemTime === time && time < start!;
          item.isRangeHoverEnd = itemTime === time && time > end!;
          if (this.rangeType === 'start') {
            item.isInRangeHover = itemTime >= time! && itemTime <= end!;
          } else if (this.rangeType === 'end') {
            item.isInRangeHover = itemTime >= start! && itemTime <= time;
          }
        }
      }
      if (isEmit) {
        this.rangeTdMouseenter.emit(cell);
      } else {
        this.cdr.detectChanges();
      }
    }
  }

  onTdMouseleave(cell: XDateCell, isEmit = true) {
    const [start, end] = this.rangeValue;
    if (!XIsNull(start) || !XIsNull(end)) {
      this.clearState(...this.dates);
      if (isEmit) this.rangeTdMouseleave.emit(cell);
    }
  }

  clearState(...cells: XDateCell[]) {
    for (let cell of cells) {
      cell.isInRangeHover = false;
      cell.isRangeHover = false;
      cell.isRangeHoverStart = false;
      cell.isRangeHoverEnd = false;
      cell.isRangeHoverStartLeft = false;
      cell.isRangeHoverStartRight = false;
      cell.isRangeHoverEndLeft = false;
      cell.isRangeHoverEndRight = false;
    }
  }

  setDays(date: Date) {
    let dates: XDateCell[] = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const lastDate = last.getDate();
    const firstDay = first.getDay();
    const lastDay = last.getDay();

    let day = firstDay;
    let index = 1;
    while (day !== 1) {
      index--;
      const cell = { date: new Date(year, month, index) };
      dates = [this.setDayState(cell), ...dates];
      day = cell.date.getDay();
    }

    index = 1;
    do {
      const cell: XDateCell = {
        date: new Date(year, month, index),
        isFirstDay: index === 1,
        isLastDay: index === lastDate
      };
      dates = [...dates, this.setDayState(cell)];
      index++;
    } while (index <= lastDate);

    index = 0;
    day = lastDay;
    while (day !== 0 || dates.length !== 7 * 6) {
      index++;
      const cell = { date: new Date(year, month + 1, index) };
      dates = [...dates, this.setDayState(cell)];
      day = cell.date.getDay();
    }

    this.dates = dates;
    this.weekDates = XChunk(dates, 7);

    if (this.type === 'week') {
      for (let item of this.dates) {
        item.week = XDateWeek(item.date!);
      }
      for (let week of this.weekDates) {
        week.unshift({ type: 'week', week: week[0].week! });
      }
    }

    if (this.dates.length > 0) {
      this.rangeChange.emit([dates[0].date!, dates[dates.length - 1].date!]);
    }

    this.cdr.detectChanges();
  }

  setDayState(cell: XDateCell): XDateCell {
    const time = cell.date?.getTime()!;
    const fdate = this.datePipe.transform(cell.date, 'yyyyMMdd');
    const fdatem = this.datePipe.transform(cell.date, 'yyyyMM');
    const fdisplaym = this.datePipe.transform(this.display, 'yyyyMM');
    const fnow = this.datePipe.transform(this.now, 'yyyyMMdd');
    cell.isLastOrNext = fdatem !== fdisplaym;
    cell.isNow = fdate === fnow;
    cell.isDisabled = this.isDisabled(cell.date!);
    if (this.rangePicker) {
      if (!this.rangeValue) return cell;
      const [start, end] = this.rangeValue;
      cell.isInRange = !!start && !!end && time >= start! && time <= end!;
      cell.isRangeStartRight = !!start && !!end && fdate === this.datePipe.transform(start!, 'yyyyMMdd');
      cell.isRangeEndLeft = !!start && !!end && fdate === this.datePipe.transform(end!, 'yyyyMMdd');
    }
    return cell;
  }

  dateClick(cell: XDateCell) {
    this.model = cell.date;
    this.modelChange.emit(cell.date);
    if (this.rangePicker) {
      this.clearState(...this.dates);
      for (let item of this.dates) {
        this.setDayState(item);
      }
      this.rangeDateClick.emit(cell);
    }
    this.cdr.detectChanges();
  }

  getLocaleMonth(date: Date) {
    return (this.locale as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  rangeDisabled(date: Date) {
    if (this.rangeType === 'end') {
      return this.rangeStart !== '' && date.getTime() < this.rangeStart!;
    } else if (this.rangeType === 'start') {
      return this.rangeEnd !== '' && date.getTime() > this.rangeEnd!;
    }
    return false;
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
    this.displayChange.emit(this.display);
    this.setDays(this.display);
  }

  nextMonth(num: number) {
    let date = new Date(this.display);
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
    this.monthChange.emit(num);
    this.cdr.detectChanges();
  }

  nextYear(num: number) {
    let date = new Date(this.display);
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
    this.yearChange.emit(num);
    this.cdr.detectChanges();
  }

  typeOnChange(type: XDatePickerType) {
    this.type = type;
    this.typeChange.emit(type);
    this.cdr.detectChanges();
  }

  trackByNode(_index: number, item: string | Date | XDateCell) {
    return item;
  }
}
