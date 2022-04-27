import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { chunk, XIsChange, XConfigService } from '@ng-nest/ui/core';
import { XDatePickerType, XPickerDatePrefix, XPickerDateProperty } from './date-picker.property';
import { Subject } from 'rxjs';
import { XI18nDatePicker, XI18nService } from '@ng-nest/ui/i18n';
import { map, takeUntil } from 'rxjs/operators';
import { DatePipe, LowerCasePipe } from '@angular/common';

@Component({
  selector: `${XPickerDatePrefix}`,
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
  dates: Date[][] = [];
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

  constructor(
    public renderer: Renderer2,
    public datePipe: DatePipe,
    public lowerCasePipe: LowerCasePipe,
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
    const { display, rangeType } = simples;
    XIsChange(display) && this.init();
    if (rangeType) {
      console.log(this.rangeType);
    }
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  init() {
    this.setDays(this.display);
  }

  setDays(date: Date) {
    let dates: Date[] = [];
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
      let date = new Date(year, month, index);
      dates = [date, ...dates];
      day = date.getDay();
    }

    index = 1;
    do {
      dates = [...dates, new Date(year, month, index)];
      index++;
    } while (index <= lastDate);

    index = 0;
    day = lastDay;
    while (day !== 0 || dates.length !== 7 * 6) {
      index++;
      let date = new Date(year, month + 1, index);
      dates = [...dates, date];
      day = date.getDay();
    }

    this.dates = chunk(dates, 7);

    if (this.dates.length > 0) {
      this.rangeChange.emit([dates[0], dates[dates.length - 1]]);
    }

    this.cdr.detectChanges();
  }

  dateClick(date: Date) {
    this.model = date;
    this.modelChange.emit(date);
    this.cdr.markForCheck();
  }

  getLocaleMonth(date: Date) {
    return (this.locale as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  rangeDisabled(date: Date) {
    if (this.rangeType === 'end') {
      return this.rangeStart !== '' && date.getTime() < this.rangeStart;
    } else if (this.rangeType === 'start') {
      return this.rangeEnd !== '' && date.getTime() > this.rangeEnd;
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

  trackByNode(_index: number, item: string | Date) {
    return item;
  }
}
