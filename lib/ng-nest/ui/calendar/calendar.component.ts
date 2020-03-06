import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { XCalendarPrefix, XCalendarNode, XCalendarData, XCalendarModel } from './calendar.type';
import { XInputBoolean, XSize, XInputNumber, XIsNumber, XDataConvert, XData } from '@ng-nest/ui/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: `${XCalendarPrefix}`,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class XCalendarComponent implements OnInit, OnChanges {
  @Input() data?: XCalendarData;
  @Input() model?: XCalendarModel = 'month';
  @Output() dateChange = new EventEmitter();
  @Output() rangeChange = new EventEmitter();
  @ViewChild('calendar', { static: true }) calendar: ElementRef;
  now: Date = new Date();
  datetime: Date = new Date();
  activatedDate: Date = new Date();
  monthData = {};
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public datePipe: DatePipe
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setMonthData();
    }
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
    let dt = {};
    for (let key in this.data) {
      let month = this.datePipe.transform(key, 'yyyy-MM');
      let value = '';
      this.data[key].forEach(x => {
        value += `${x.label} ${x.id}<br/>`;
      });
      let item = { label: key, value: value };
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

  modelOnChange(model: any) {
    this.cdr.detectChanges();
  }

  rangeOnChange(range: Date[]) {
    this.rangeChange.emit(range);
  }
}
