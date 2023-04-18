import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Renderer2, inject } from '@angular/core';
import { XDatePickerDisabledDate, XDatePickerDisabledTime, XDatePickerRangType } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-disabled-date',
  templateUrl: './disabled-date.component.html',
  styleUrls: ['./disabled-date.component.scss'],
  providers: [DatePipe]
})
export class ExDisabledDateComponent {
  document = inject(DOCUMENT);
  constructor(private datePipe: DatePipe, private renderer: Renderer2) {}

  ngOnInit() {
    let style = this.renderer.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.cssClass { color: #F00; }';
    this.document.getElementsByTagName('head')[0].appendChild(style);
  }

  today = new Date();
  model = new Date();

  disabledDate: XDatePickerDisabledDate = (current: Date): boolean => {
    const currentDate = new Date(this.datePipe.transform(current, 'yyyy-MM-dd')!).getTime();
    const today = new Date(this.datePipe.transform(this.today, 'yyyy-MM-dd')!).getTime();
    return currentDate > today;
  };

  disabledTime: XDatePickerDisabledTime = () => ({
    disabledHours: () => Array.from({ length: 12 }).map((_, i) => i),
    disabledMinutes: () => Array.from({ length: 30 }).map((_, i) => i),
    disabledSeconds: () => Array.from({ length: 40 }).map((_, i) => i)
  });

  disabledRangeTime: XDatePickerDisabledTime = (type?: XDatePickerRangType) => {
    if (type === 'start') {
      return {
        disabledHours: () => Array.from({ length: 12 }).map((_, i) => i + 12),
        disabledMinutes: () => Array.from({ length: 30 }).map((_, i) => i + 30),
        disabledSeconds: () => Array.from({ length: 20 }).map((_, i) => i + 20)
      };
    } else {
      return {
        disabledHours: () => Array.from({ length: 12 }).map((_, i) => i),
        disabledMinutes: () => Array.from({ length: 30 }).map((_, i) => i),
        disabledSeconds: () => Array.from({ length: 40 }).map((_, i) => i)
      };
    }
  };
}
