import { Component } from '@angular/core';
import { XCalendarComponent, XCalendarData } from '@ng-nest/ui/calendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ex-header',
  standalone: true,
  imports: [XCalendarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe]
})
export class ExHeaderComponent {
  data: XCalendarData = {};
  constructor(private pipeDate: DatePipe) {}

  rangeChange(range: Date[]) {
    let first = range[0].getTime();
    let last = range[1].getTime();
    let dt: { [property: string]: { id: string | null; label: string }[] } = {};
    let i = 0;
    while (true) {
      let rd = Math.floor(Math.random() * (last - first + 1)) + first;
      dt[this.pipeDate.transform(rd, 'yyyy-MM-dd') as string] = [
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: '处理内容1，处理内容1' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: '处理内容2，处理内容2' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: '处理内容3，处理内容3' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: '处理内容4，处理内容4' }
      ];
      i++;
      if (i === 10) break;
    }

    this.data = dt;
  }
}
