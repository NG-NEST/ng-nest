import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-time',
  standalone: true,
  imports: [FormsModule, XDatePickerComponent],
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class ExTimeComponent {
  model1 = new Date();
  model2 = new Date();
  model3 = new Date();
}
