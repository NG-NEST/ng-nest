import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  inject,
  computed,
  signal,
  ChangeDetectorRef
} from '@angular/core';
import { XChunk, XIsChange, XIsNull, XIsFunction, XDateWeek, XDateYearWeek } from '@ng-nest/ui/core';
import { XDateCell, XDatePickerType, XPickerDatePrefix, XPickerDateProperty } from './date-picker.property';
import { XI18nDatePicker, XI18nPipe, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { map } from 'rxjs/operators';
import { DatePipe, LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { XLinkComponent } from '@ng-nest/ui/link';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XPickerDatePrefix}`,
  standalone: true,
  imports: [DatePipe, NgTemplateOutlet, XLinkComponent, XI18nPipe],
  templateUrl: './picker-date.component.html',
  styleUrls: ['./picker-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe]
})
export class XPickerDateComponent extends XPickerDateProperty implements OnChanges {
  private datePipe = inject(DatePipe);
  private lowerCasePipe = inject(LowerCasePipe);
  private i18n = inject(XI18nService);
  private cdr = inject(ChangeDetectorRef);

  titles = signal([
    'datePicker.monday',
    'datePicker.tuesday',
    'datePicker.wednesday',
    'datePicker.thursday',
    'datePicker.friday',
    'datePicker.saturday',
    'datePicker.sunday'
  ]);
  now = new Date();
  dates = signal<XDateCell[]>([]);
  weekDates = signal<XDateCell[][]>([]);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.datePicker as XI18nDatePicker)), {
    initialValue: zh_CN.datePicker
  });

  rangeStart = computed(() => {
    if (this.rangeValue() && this.rangeValue().length > 0) {
      return this.rangeValue()[0];
    }
    return '';
  });

  rangeEnd = computed(() => {
    if (this.rangeValue() && this.rangeValue().length > 1) {
      return this.rangeValue()[1];
    }
    return '';
  });

  isWeek = computed(() => {
    return this.type() === 'week';
  });

  isWeekRange = computed(() => {
    return this.type() === 'week' && this.rangePicker();
  });

  isNotWeekRange = computed(() => {
    return this.type() !== 'week' && this.rangePicker();
  });

  isDisabled(date: Date) {
    const disabledDate = this.disabledDate();
    if (disabledDate && XIsFunction(disabledDate)) {
      return disabledDate(date);
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.setTitles();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { display } = simples;
    XIsChange(display) && this.init();
  }

  init() {
    this.setDays(this.display());
  }

  isWeekActive(week: XDateCell[]) {
    if (week.length > 1) {
      return XDateYearWeek(week[1].date!) === XDateYearWeek(this.model()!);
    }
    return false;
  }

  isStartWeek(week: XDateCell[]) {
    if (!this.rangeType() || !this.rangeValue()) return;
    if (!XIsNull(this.rangeValue()[0]) && week.length > 1) {
      return XDateYearWeek(week[1].date!) === XDateYearWeek(this.rangeValue()[0]!);
    }
    return false;
  }

  isEndWeek(week: XDateCell[]) {
    if (!this.rangeType() || !this.rangeValue()) return;
    if (!XIsNull(this.rangeValue()[1]) && week.length > 1) {
      return XDateYearWeek(week[1].date!) === XDateYearWeek(this.rangeValue()[1]!);
    }
    return false;
  }

  isInRangeWeek(week: XDateCell[]) {
    if (!this.rangeType() || !this.rangeValue()) return;
    if (!XIsNull(this.rangeValue()[0]) && !XIsNull(this.rangeValue()[1]) && week.length > 1) {
      let time = week[1].date?.getTime()!;
      return time > this.rangeValue()[0]! && time < this.rangeValue()[1]!;
    }
    return false;
  }

  isStartDate(date: Date) {
    if (this.type() === 'week' || !this.rangeType() || !this.rangeValue()) return;
    if (!XIsNull(this.rangeValue()[0])) {
      return this.datePipe.transform(this.rangeValue()[0], 'yyyyMMdd') === this.datePipe.transform(date, 'yyyyMMdd');
    }
    return;
  }

  isEndDate(date: Date) {
    if (this.type() === 'week' || !this.rangeType() || !this.rangeValue()) return;
    if (!XIsNull(this.rangeValue()[1])) {
      return this.datePipe.transform(this.rangeValue()[1], 'yyyyMMdd') === this.datePipe.transform(date, 'yyyyMMdd');
    }
    return;
  }

  setDatesState(cell: XDateCell) {
    this.dates.update((x) => {
      x.map((y) => {
        this.clearState(y);
        this.setDayState(y);
        return y;
      });
      return x;
    });
    this.onTdMouseenter(cell, false);
  }

  setTitles() {
    if (this.type() === 'week') {
      this.titles.update((x) => ['datePicker.week', ...x]);
    }
  }

  onTdMouseenter(cell: XDateCell, isEmit = true) {
    const [start, end] = this.rangeValue();
    if (!XIsNull(start) || !XIsNull(end)) {
      const time = cell.date!.getTime();
      this.dates.update((x) => {
        for (let item of x) {
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
            if (this.rangeType() === 'start') {
              item.isInRangeHover = itemTime >= time! && itemTime <= end!;
            } else if (this.rangeType() === 'end') {
              item.isInRangeHover = itemTime >= start! && itemTime <= time;
            }
          }
        }
        return x;
      });
      if (isEmit) {
        this.rangeTdMouseenter.emit(cell);
      } else {
        this.cdr.markForCheck();
      }
    }
  }

  onTdMouseleave(cell: XDateCell, isEmit = true) {
    const [start, end] = this.rangeValue();
    if (!XIsNull(start) || !XIsNull(end)) {
      this.dates.update((x) =>
        x.map((y) => {
          this.clearState(y);
          return y;
        })
      );
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

    this.dates.set(dates);
    this.weekDates.set(XChunk(dates, 7));

    if (this.type() === 'week') {
      for (let item of this.dates()) {
        item.week = XDateWeek(item.date!)!;
      }
      for (let week of this.weekDates()) {
        week.unshift({ type: 'week', week: week[0].week! });
      }
    }

    if (this.dates().length > 0) {
      this.rangeChange.emit([dates[0].date!, dates[dates.length - 1].date!]);
    }
  }

  setDayState(cell: XDateCell): XDateCell {
    const time = cell.date?.getTime()!;
    const fdate = this.datePipe.transform(cell.date, 'yyyyMMdd');
    const fdatem = this.datePipe.transform(cell.date, 'yyyyMM');
    const fdisplaym = this.datePipe.transform(this.display(), 'yyyyMM');
    const fnow = this.datePipe.transform(this.now, 'yyyyMMdd');
    cell.isLastOrNext = fdatem !== fdisplaym;
    cell.isNow = fdate === fnow;
    cell.isDisabled = this.isDisabled(cell.date!);
    if (this.rangePicker()) {
      if (!this.rangeValue()) return cell;
      const [start, end] = this.rangeValue();
      cell.isInRange = !!start && !!end && time >= start! && time <= end!;
      cell.isRangeStartRight = !!start && !!end && fdate === this.datePipe.transform(start!, 'yyyyMMdd');
      cell.isRangeEndLeft = !!start && !!end && fdate === this.datePipe.transform(end!, 'yyyyMMdd');
    }
    return cell;
  }

  dateClick(cell: XDateCell) {
    this.model.set(cell.date);
    if (this.rangePicker()) {
      this.dates.update((x) => {
        x.map((y) => {
          this.clearState(y);
          this.setDayState(y);
        });
        return x;
      });
    }
  }

  getLocaleMonth(date: Date) {
    return (this.locale() as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  rangeDisabled(date: Date) {
    if (this.rangeType() === 'end') {
      const rangeStart = this.rangeStart();
      return rangeStart !== '' && date.getTime() < rangeStart!;
    } else if (this.rangeType() === 'start') {
      const rangeEnd = this.rangeEnd();
      return rangeEnd !== '' && date.getTime() > rangeEnd!;
    }
    return false;
  }

  setDisplay(date: Date) {
    this.display.set(new Date(date.getFullYear(), date.getMonth(), 1));
    this.setDays(this.display());
  }

  nextMonth(num: number) {
    let date = new Date(this.display());
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
    this.monthChange.emit(num);
  }

  nextYear(num: number) {
    let date = new Date(this.display());
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
    this.yearChange.emit(num);
  }

  typeOnChange(type: XDatePickerType) {
    this.type.set(type);
  }
}
