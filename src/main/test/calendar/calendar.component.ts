import { Component } from '@angular/core';
import {
  ExCardComponent,
  ExDefaultComponent,
  ExHeaderComponent
} from '@ng-nest/ui/calendar/examples';

@Component({
  selector: 'te-calendar',
  imports: [ExDefaultComponent, ExCardComponent, ExHeaderComponent],
  templateUrl: './calendar.component.html'
})
export class TeCalendarComponent {}
