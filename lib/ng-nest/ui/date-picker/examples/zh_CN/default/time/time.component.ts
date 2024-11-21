import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-time',
  imports: [FormsModule, XDatePickerComponent],
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class ExTimeComponent {
  model1 = signal(new Date());
  model2 = signal(new Date());
  model3 = signal(new Date());
}
