import { Component } from '@angular/core';
import { XCalendarData } from '@ng-nest/ui/calendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  providers: [DatePipe]
})
export class ExDefaultComponent {
  data: XCalendarData = {};
  constructor(private pipeDate: DatePipe) {}

  rangeChange(range: Date[]) {
    let first = range[0].getTime();
    let last = range[1].getTime();
    let dt = {};
    let i = 0;
    while (true) {
      let rd = Math.floor(Math.random() * (last - first + 1)) + first;
      dt[this.pipeDate.transform(rd, 'yyyy-MM-dd')] = [
        { label: this.pipeDate.transform(rd, 'HH:mm '), value: '处理内容1，处理内容1' },
        { label: this.pipeDate.transform(rd, 'HH:mm '), value: '处理内容2，处理内容2' },
        { label: this.pipeDate.transform(rd, 'HH:mm '), value: '处理内容3，处理内容3' },
        { label: this.pipeDate.transform(rd, 'HH:mm '), value: '处理内容4，处理内容4' },
        { label: this.pipeDate.transform(rd, 'HH:mm '), value: '处理内容5，处理内容5' },
        { label: this.pipeDate.transform(rd, 'HH:mm '), value: '处理内容6，处理内容6' }
      ];
      i++;
      if (i === 10) break;
    }

    this.data = dt;
  }
}
