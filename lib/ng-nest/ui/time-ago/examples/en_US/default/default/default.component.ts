import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { XAddSeconds, XAddMinutes, XAddHours, XAddDays, XAddMonths, XAddYears } from '@ng-nest/ui/core';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [DatePipe, XTimeAgoPipe],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  format = signal('yyyy-MM-dd HH:mm:ss');
  date = signal(new Date());
  dateSeconds = signal(XAddSeconds(this.date(), -5));
  dateMinutes = signal(XAddMinutes(this.date(), -5));
  dateHours = signal(XAddHours(this.date(), -5));
  dateDays = signal(XAddDays(this.date(), -5));
  dateMonths = signal(XAddMonths(this.date(), -5));
  dateYears = signal(XAddYears(this.date(), -5));
}
