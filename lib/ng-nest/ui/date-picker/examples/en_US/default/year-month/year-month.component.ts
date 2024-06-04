import { Component, signal } from '@angular/core';
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
  model1 = signal<Date | null>(null);
  model2 = signal<Date | null>(null);
  model3 = signal<Date | null>(null);
  model4 = signal<Date | null>(null);

  change(event: any) {
    console.log(event);
  }
}
