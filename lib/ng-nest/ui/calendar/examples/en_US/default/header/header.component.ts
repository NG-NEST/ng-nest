import { Component } from '@angular/core';
import { XCalendarData } from '@ng-nest/ui/calendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ex-header',
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
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: 'Deal with content 1' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: 'Deal with content 2' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: 'Deal with content 3' },
        { id: this.pipeDate.transform(rd, 'HH:mm '), label: 'Deal with content 4' }
      ];
      i++;
      if (i === 10) break;
    }

    this.data = dt;
  }
}
