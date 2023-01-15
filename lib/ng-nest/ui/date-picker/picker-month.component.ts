import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XChunk, XIsChange, XConfigService } from '@ng-nest/ui/core';
import { XDatePickerType, XPickerMonthProperty } from './date-picker.property';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { XI18nDatePicker, XI18nService } from '@ng-nest/ui/i18n';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'x-picker-month',
  templateUrl: './picker-month.component.html',
  styleUrls: ['./picker-month.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe]
})
export class XPickerMonthComponent extends XPickerMonthProperty implements OnChanges {
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

  init() {
    this.setMonths(this.display);
  }

  setMonths(date: Date) {
    let year = date.getFullYear();
    let dates: Date[] = [];
    for (let i = 0; i < 16; i++) {
      dates = [...dates, new Date(year, i, 1)];
    }
    this.dates = XChunk(dates, 4) as Date[][];
    if (this.dates.length > 0) {
      this.rangeChange.emit([dates[0], dates[dates.length - 1]]);
    }
  }

  monthClick(date: Date) {
    this.model = date;
    this.modelChange.emit(date);
    this.cdr.markForCheck();
  }

  getLocaleMonth(date: Date) {
    return (this.locale as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
    this.setMonths(this.display);
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

  trackByMonth(_index: number, item: Date) {
    return item;
  }
}
