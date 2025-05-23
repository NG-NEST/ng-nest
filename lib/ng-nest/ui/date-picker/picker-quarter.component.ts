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
import { XChunk, XIsChange, XIsNull, XIsFunction } from '@ng-nest/ui/core';
import { XDateCell, XDatePickerType, XPickerQuarterProperty } from './date-picker.property';
import { DatePipe, LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { XI18nDatePicker, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { map } from 'rxjs/operators';
import { XDateQuarterPipe } from './date-quarter.pipe';
import { XLinkComponent } from '@ng-nest/ui/link';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'x-picker-quarter',
  imports: [DatePipe, NgTemplateOutlet, XLinkComponent, XDateQuarterPipe],
  templateUrl: './picker-quarter.component.html',
  styleUrls: ['./picker-quarter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe, XDateQuarterPipe]
})
export class XPickerQuarterComponent extends XPickerQuarterProperty implements OnChanges {
  private datePipe = inject(DatePipe);
  private dateQuarterPipe = inject(XDateQuarterPipe);
  private i18n = inject(XI18nService);
  private cdr = inject(ChangeDetectorRef);

  now = new Date();
  dates = signal<XDateCell[]>([]);
  chunkDates = signal<XDateCell[][]>([]);
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

  isDisabled(date: Date) {
    const disabledDate = this.disabledDate();
    if (disabledDate && XIsFunction(disabledDate)) {
      return disabledDate(date);
    } else {
      return false;
    }
  }

  ngOnChanges(simples: SimpleChanges) {
    const { display } = simples;
    XIsChange(display) && this.init();
  }

  init() {
    this.setQuarters(this.display());
  }

  isStartQuarter(date: Date) {
    if (!this.rangeType() || !this.rangeValue()) return;
    if (!XIsNull(this.rangeValue()[0])) {
      return this.datePipe.transform(this.rangeValue()[0], 'yyyyMM') === this.datePipe.transform(date, 'yyyyMM');
    }
    return;
  }

  isEndQuarter(date: Date) {
    if (!this.rangeType() || !this.rangeValue()) return;
    if (!XIsNull(this.rangeValue()[1])) {
      return this.datePipe.transform(this.rangeValue()[1], 'yyyyMM') === this.datePipe.transform(date, 'yyyyMM');
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
      return [...x];
    });
    this.onTdMouseenter(cell, false);
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
        return [...x];
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
      this.dates.update((x) => {
        x.map((y) => {
          this.clearState(y);
          return y;
        });
        return [...x];
      });
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

  setQuarters(date: Date) {
    let year = date.getFullYear();
    let dates: XDateCell[] = [];
    for (let i = 0; i < 4; i++) {
      const cell = { date: new Date(year, i * 3, 1), isFirstDay: i === 0, isLastDay: i === 3 };
      dates = [...dates, this.setDayState(cell)];
    }
    this.dates.set(dates);
    this.chunkDates.set(XChunk(dates, 4));

    if (this.dates.length > 0) {
      this.rangeChange.emit([dates[0].date!, dates[dates.length - 1].date!]);
    }
  }

  setDayState(cell: XDateCell): XDateCell {
    const time = cell.date?.getTime()!;
    const fquarter = this.datePipe.transform(cell.date, 'yyyyMM');
    const fquartery = this.datePipe.transform(cell.date, 'yyyy');
    const fdisplayy = this.datePipe.transform(this.display(), 'yyyy');
    const fnow = this.datePipe.transform(this.now, 'yyyyMM');
    cell.isLastOrNext = fquartery !== fdisplayy;
    cell.isNow = fquarter === fnow;
    cell.isDisabled = this.isDisabled(cell.date!);
    if (this.rangePicker()) {
      if (!this.rangeValue()) return cell;
      const [start, end] = this.rangeValue();
      cell.isInRange = !!start && !!end && time >= start! && time <= end!;
      cell.isRangeStartRight = !!start && !!end && fquarter === this.datePipe.transform(start!, 'yyyyMM');
      cell.isRangeEndLeft = !!start && !!end && fquarter === this.datePipe.transform(end!, 'yyyyMM');
    }
    return cell;
  }

  quarterClick(cell: XDateCell) {
    this.model.set(cell.date);
    if (this.rangePicker()) {
      this.dates.update((x) => {
        x.map((y) => {
          this.clearState(y);
          this.setDayState(y);
          return y;
        });
        return [...x];
      });
    }
  }

  getLocaleQuarter(date: Date) {
    return this.dateQuarterPipe.transform(date);
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
    this.setQuarters(this.display());
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
