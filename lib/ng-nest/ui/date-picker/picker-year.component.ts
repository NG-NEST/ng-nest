import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { XChunk, XIsChange, XConfigService, XIsNull, XIsFunction } from '@ng-nest/ui/core';
import { XDateCell, XPickerYearProperty } from './date-picker.property';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'x-picker-year',
  standalone: true,
  imports: [DatePipe, NgTemplateOutlet, XLinkComponent],
  templateUrl: './picker-year.component.html',
  styleUrls: ['./picker-year.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class XPickerYearComponent extends XPickerYearProperty implements OnChanges {
  now = new Date();
  dates: XDateCell[] = [];
  chunkDates: XDateCell[][] = [];
  start!: number;
  end!: number;

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

  isDisabled(date: Date) {
    if (this.disabledDate && XIsFunction(this.disabledDate)) {
      return this.disabledDate(date);
    } else {
      return false;
    }
  }

  private cdr = inject(ChangeDetectorRef);
  private datePipe = inject(DatePipe);
  configService = inject(XConfigService);

  ngOnChanges(simples: SimpleChanges) {
    const { display } = simples;
    XIsChange(display) && this.init();
  }

  init() {
    this.setYears(this.display);
  }

  isStartYear(date: Date) {
    if (!this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[0])) {
      return this.datePipe.transform(this.rangeValue[0], 'yyyy') === this.datePipe.transform(date, 'yyyy');
    }
    return;
  }

  isEndYear(date: Date) {
    if (!this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[1])) {
      return this.datePipe.transform(this.rangeValue[1], 'yyyy') === this.datePipe.transform(date, 'yyyy');
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

  setYears(date: Date) {
    let year = date.getFullYear();
    this.start = Math.floor(year / 10) * 10;
    this.end = this.start + 9;
    let dates: XDateCell[] = [];
    for (let i = -3; i < 13; i++) {
      const dt = new Date(this.start + i, 1, 1);
      const cell: XDateCell = {
        date: dt,
        isNow: this.datePipe.transform(this.now, 'yyyy') === this.datePipe.transform(dt, 'yyyy'),
        isLastOrNext: i < 0 || i > 9,
        isFirstDay: i === 0,
        isLastDay: i === 9
      };
      dates = [...dates, this.setDayState(cell)];
    }
    this.dates = dates;
    this.chunkDates = XChunk(dates, 4);
    this.startChange.emit(this.start);
  }

  setDayState(cell: XDateCell): XDateCell {
    const time = cell.date?.getTime()!;
    const fyear = this.datePipe.transform(cell.date, 'yyyy');
    const fnow = this.datePipe.transform(this.now, 'yyyy');
    cell.isNow = fyear === fnow;
    cell.isDisabled = this.isDisabled(cell.date!);
    if (this.rangePicker) {
      if (!this.rangeValue) return cell;
      const [start, end] = this.rangeValue;
      cell.isInRange = !!start && !!end && time >= start! && time <= end!;
      cell.isRangeStartRight = !!start && !!end && fyear === this.datePipe.transform(start!, 'yyyy');
      cell.isRangeEndLeft = !!start && !!end && fyear === this.datePipe.transform(end!, 'yyyy');
    }
    return cell;
  }

  yearClick(cell: XDateCell) {
    this.model = cell.date;
    this.modelChange.emit(cell.date);
    if (this.rangePicker) {
      this.clearState(...this.dates);
      for (let item of this.dates) {
        this.setDayState(item);
      }
      this.rangeDateClick.emit(cell);
    }
    this.cdr.markForCheck();
  }

  lastOrNext(year: Date) {
    const yearStr = this.datePipe.transform(year, 'yyyy') as string;
    return yearStr < `${this.start}` || yearStr > `${this.end}`;
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
    this.setYears(this.display);
  }

  nextYears(num: number) {
    this.start += num;
    let date = new Date(this.display);
    date.setFullYear(this.start);
    this.setDisplay(date);
    this.yearChange.emit(num);
    this.cdr.detectChanges();
  }

  trackByYear(_index: number, item: string | Date | XDateCell) {
    return item;
  }
}
