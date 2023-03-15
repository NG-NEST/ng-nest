import { Component } from '@angular/core';
import { XAddMonths } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class ExRangeComponent {
  model: any;

  modelString = ['2023-02-07', '2023-02-10'];

  modelDate = [new Date(), XAddMonths(new Date(), 1)];

  modelNumber = [new Date().getTime(), XAddMonths(new Date(), 1).getTime()];

  modelDateTime: any;

  modelDateHour: any;

  modelDateMinute: any;

  modelWeek: any;

  change(event: any) {
    console.log(event);
  }
}
