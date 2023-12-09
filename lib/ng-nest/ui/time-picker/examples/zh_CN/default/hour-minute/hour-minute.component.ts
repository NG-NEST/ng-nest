import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-hour-minute',
  standalone: true,
  imports: [FormsModule, XTimePickerComponent],
  templateUrl: './hour-minute.component.html',
  styleUrls: ['./hour-minute.component.scss']
})
export class ExHourMinuteComponent {
  model1: any;
  model2: any;
}
