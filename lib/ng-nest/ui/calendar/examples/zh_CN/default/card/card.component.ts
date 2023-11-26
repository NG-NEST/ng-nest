import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { XCalendarComponent } from '@ng-nest/ui/calendar';

@Component({
  selector: 'ex-card',
  standalone: true,
  imports: [XCalendarComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [DatePipe]
})
export class ExCardComponent {
  constructor() {}

  rangeChange(event: any) {
    console.log(event);
  }

  onDateChange(event: any) {
    console.log(event);
  }
}
