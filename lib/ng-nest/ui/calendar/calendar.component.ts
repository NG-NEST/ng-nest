import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  inject,
  OnInit
} from '@angular/core';
import { XCalendarPrefix, XCalendarProperty, XCalendarNode } from './calendar.property';
import { XIsChange, XConfigService, XIsEmpty } from '@ng-nest/ui/core';
import { DatePipe, LowerCasePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { XI18nService, XI18nCalendar, XI18nDirective } from '@ng-nest/ui/i18n';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XDatePickerComponent, XPickerDateComponent, XPickerMonthComponent } from '@ng-nest/ui/date-picker';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: `${XCalendarPrefix}`,
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    DatePipe,
    FormsModule,
    XLinkComponent,
    XTooltipDirective,
    XRadioComponent,
    XDatePickerComponent,
    XPickerDateComponent,
    XPickerMonthComponent,
    XButtonComponent,
    XButtonsComponent,
    XI18nDirective
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe]
})
export class XCalendarComponent extends XCalendarProperty implements OnInit, OnChanges, OnDestroy {
  now: Date = new Date();
  datetime: Date = new Date();
  activatedDate: Date = new Date();
  monthData: { [property: string]: XCalendarNode[] } = {};
  locale: XI18nCalendar = {};
  radioData = [
    { label: '月', id: 'month' },
    { label: '年', id: 'year' }
  ];

  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private datePipe = inject(DatePipe);
  private lowerCasePipe = inject(LowerCasePipe);
  private i18n = inject(XI18nService);
  configService = inject(XConfigService);

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
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;
    XIsChange(data) && this.setMonthData();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setClassMap() {
    this.classMap[`${XCalendarPrefix}-${this.displayType}`] = !XIsEmpty(this.displayType);
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
    let dt: { [property: string]: XCalendarNode[] } = {};
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
    if (this.data) {
      return this.data[this.datePipe.transform(date, 'yyyy-MM-dd') as string];
    } else {
      return [];
    }
  }

  getMonth(date: Date): XCalendarNode[] {
    return this.monthData?.[this.datePipe.transform(date, 'yyyy-MM') as string];
  }

  trackByMonth(_index: number, item: XCalendarNode) {
    return item.id;
  }
}
