import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { XCalendarPrefix, XCalendarProperty, XCalendarNode } from './calendar.property';
import { XIsChange, XConfigService } from '@ng-nest/ui/core';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { XI18nService, XI18nCalendar } from '@ng-nest/ui/i18n';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: `${XCalendarPrefix}`,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe]
})
export class XCalendarComponent extends XCalendarProperty implements OnChanges, OnDestroy {
  now: Date = new Date();
  datetime: Date = new Date();
  activatedDate: Date = new Date();
  monthData: { [prop: string]: XCalendarNode[] } = {};
  locale: XI18nCalendar = {};
  radioData = [
    { label: '月', id: 'month' },
    { label: '年', id: 'year' }
  ];

  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    public lowerCasePipe: LowerCasePipe,
    public configService: XConfigService,
    public i18n: XI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.calendar as XI18nCalendar),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.setLocal();
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setMonthData();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  action(next: number) {
    let datetime = new Date(this.datetime.getTime());
    if (this.model === 'month') {
      datetime.setMonth(datetime.getMonth() + next);
    } else if (this.model === 'year') {
      datetime.setFullYear(datetime.getFullYear() + next);
    }
    this.datetime = datetime;
    this.cdr.markForCheck();
  }

  setLocal() {
    this.radioData = this.radioData.map((x) => {
      x.label = (this.locale as any)[x.id];
      return x;
    });
  }

  setMonthData() {
    let dt: { [prop: string]: XCalendarNode[] } = {};
    for (let key in this.data) {
      let month = this.datePipe.transform(key, 'yyyy-MM') as string;
      let value = '';
      this.data[key].forEach((x) => {
        value += `${x.id}${x.label} <br/>`;
      });
      let item = { id: key, label: value };
      if (dt[month]) {
        dt[month] = [...dt[month], item];
      } else {
        dt[month] = [item];
      }
    }

    this.monthData = dt;
  }

  getLocaleMonth(date: Date) {
    return (this.locale as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  dateOnChange(date: Date) {
    if (this.datePipe.transform(date, 'yyyy-MM-dd') !== this.datePipe.transform(this.activatedDate, 'yyyy-MM-dd')) {
      this.activatedDate = date;
      this.dateChange.emit(this.activatedDate);
      this.cdr.markForCheck();
    }
  }

  modelOnChange() {
    this.cdr.detectChanges();
  }

  rangeOnChange(range: Date[]) {
    this.rangeChange.emit(range);
  }

  getDate(date: Date): XCalendarNode[] {
    return this.data?.[this.datePipe.transform(date, 'yyyy-MM-dd') as string];
  }

  getMonth(date: Date): XCalendarNode[] {
    return this.monthData?.[this.datePipe.transform(date, 'yyyy-MM') as string];
  }

  trackByDate(index: number, item: XCalendarNode) {
    return `${item.id}-${item.label}`;
  }

  trackByMonth(index: number, item: XCalendarNode) {
    return item.id;
  }
}
