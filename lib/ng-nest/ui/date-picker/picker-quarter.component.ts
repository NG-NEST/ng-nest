import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XChunk, XIsChange, XConfigService, XIsNull, XIsFunction } from '@ng-nest/ui/core';
import { XDateCell, XDatePickerType, XPickerQuarterProperty } from './date-picker.property';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { XI18nDatePicker, XI18nService } from '@ng-nest/ui/i18n';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { XDateQuarterPipe } from './date-quarter.pipe';

@Component({
  selector: 'x-picker-quarter',
  templateUrl: './picker-quarter.component.html',
  styleUrls: ['./picker-quarter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe, XDateQuarterPipe]
})
export class XPickerQuarterComponent extends XPickerQuarterProperty implements OnChanges {
  now = new Date();
  dates: XDateCell[] = [];
  chunkDates: XDateCell[][] = [];
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

  isDisabled(date: Date) {
    if (this.disabledDate && XIsFunction(this.disabledDate)) {
      return this.disabledDate(date);
    } else {
      return false;
    }
  }

  constructor(
    public renderer: Renderer2,
    public datePipe: DatePipe,
    public lowerCasePipe: LowerCasePipe,
    public dateQuarterPipe: XDateQuarterPipe,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public i18n: XI18nService
  ) {
    super();
  }

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
  }

  ngOnChanges(simples: SimpleChanges) {
    const { display } = simples;
    XIsChange(display) && this.init();
  }

  init() {
    this.setQuarters(this.display);
  }

  isStartQuarter(date: Date) {
    if (!this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[0])) {
      return this.datePipe.transform(this.rangeValue[0], 'yyyyMM') === this.datePipe.transform(date, 'yyyyMM');
    }
    return;
  }

  isEndQuarter(date: Date) {
    if (!this.rangeType || !this.rangeValue) return;
    if (!XIsNull(this.rangeValue[1])) {
      return this.datePipe.transform(this.rangeValue[1], 'yyyyMM') === this.datePipe.transform(date, 'yyyyMM');
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
            (time < start! && itemTime >= time && itemTime < start!) || (time > start! && itemTime > start! && itemTime <= time);
          item.isRangeHoverStart = itemTime === time && time < start!;
          item.isRangeHoverEnd = itemTime === time && time > start!;
        } else if (XIsNull(start) && !XIsNull(end)) {
          item.isRangeHoverEndLeft = time < end! && itemTime === end!;
          item.isRangeHoverEndRight = time > end! && itemTime === end!;
          item.isRangeHover = (time < end! && itemTime >= time && itemTime < end!) || (time > end! && itemTime > end! && itemTime <= time);
          item.isRangeHoverStart = itemTime === time && time < end!;
          item.isRangeHoverEnd = itemTime === time && time > end!;
        } else if (!XIsNull(start) && !XIsNull(end)) {
          item.isRangeHoverStartLeft = time < start! && itemTime === start!;
          item.isRangeHoverEndRight = time > end! && itemTime === end!;
          item.isRangeHover =
            (time < start! && itemTime >= time && itemTime < start!) || (time > end! && itemTime > end! && itemTime <= time);
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

  setQuarters(date: Date) {
    let year = date.getFullYear();
    let dates: XDateCell[] = [];
    for (let i = 0; i < 4; i++) {
      const cell = { date: new Date(year, i * 3, 1), isFirstDay: i === 0, isLastDay: i === 3 };
      dates = [...dates, this.setDayState(cell)];
    }
    this.dates = dates;
    this.chunkDates = XChunk(dates, 4);

    if (this.dates.length > 0) {
      this.rangeChange.emit([dates[0].date!, dates[dates.length - 1].date!]);
    }

    this.cdr.detectChanges();
  }

  setDayState(cell: XDateCell): XDateCell {
    const time = cell.date?.getTime()!;
    const fquarter = this.datePipe.transform(cell.date, 'yyyyMM');
    const fquartery = this.datePipe.transform(cell.date, 'yyyy');
    const fdisplayy = this.datePipe.transform(this.display, 'yyyy');
    const fnow = this.datePipe.transform(this.now, 'yyyyMM');
    cell.isLastOrNext = fquartery !== fdisplayy;
    cell.isNow = fquarter === fnow;
    cell.isDisabled = this.isDisabled(cell.date!);
    if (this.rangePicker) {
      if (!this.rangeValue) return cell;
      const [start, end] = this.rangeValue;
      cell.isInRange = !!start && !!end && time >= start! && time <= end!;
      cell.isRangeStartRight = !!start && !!end && fquarter === this.datePipe.transform(start!, 'yyyyMM');
      cell.isRangeEndLeft = !!start && !!end && fquarter === this.datePipe.transform(end!, 'yyyyMM');
    }
    return cell;
  }

  quarterClick(cell: XDateCell) {
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

  getLocaleQuarter(date: Date) {
    return this.dateQuarterPipe.transform(date);
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
    this.setQuarters(this.display);
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

  trackByQuarter(_index: number, item: string | Date | XDateCell) {
    return item;
  }
}
