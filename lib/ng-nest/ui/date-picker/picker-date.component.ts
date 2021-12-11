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
    const { display } = simples;
    XIsChange(display) && this.init();
  }

  ngOnDestory() {
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

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
    this.setDays(this.display);
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

  typeOnChange(type: XDatePickerType) {
    this.type = type;
    this.typeChange.emit(type);
    this.cdr.detectChanges();
  }

  trackByNode(_index: number, item: string | Date) {
    return item;
  }
}
