import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAddMonths } from '@ng-nest/ui/core';
import { XDateRangeComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-range',
  imports: [FormsModule, XDateRangeComponent],
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class ExRangeComponent {
  model = signal<Date | null>(null);
  modelString = signal(['2023-02-07', '2023-02-10']);
  modelDate = signal([new Date(), XAddMonths(new Date(), 1)]);
  modelNumber = signal([new Date().getTime(), XAddMonths(new Date(), 1).getTime()]);
  modelDateTime = signal<Date | null>(null);
  modelDateHour = signal<Date | null>(null);
  modelDateMinute = signal<Date | null>(null);
  modelWeek = signal<Date | null>(null);
  modelQuarter = signal<Date | null>(null);

  change(event: any) {
    console.log(event);
  }
}
