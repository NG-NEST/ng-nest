import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XCalendarPrefix, XCalendarProperty, XCalendarNode } from './calendar.property';
import { XIsChange, XConfigService } from '@ng-nest/ui/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: `${XCalendarPrefix}`,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class XCalendarComponent extends XCalendarProperty implements OnChanges {
  now: Date = new Date();
  datetime: Date = new Date();
  activatedDate: Date = new Date();
  monthData: { [prop: string]: XCalendarNode[] } = {};

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setMonthData();
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
}
