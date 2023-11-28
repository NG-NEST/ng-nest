import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-year-month',
  standalone: true,
  imports: [FormsModule, XDatePickerComponent],
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
