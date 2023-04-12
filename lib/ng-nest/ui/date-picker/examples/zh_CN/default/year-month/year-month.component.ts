import { Component } from '@angular/core';

@Component({
  selector: 'ex-year-month',
  templateUrl: './year-month.component.html',
  styleUrls: ['./year-month.component.scss']
})
export class ExYearMonthComponent {
  model1: any;
  model2: any;
  model3: any;
  model4: any;

  change(event: any) {
    console.log(event);
  }
}
