import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-use12hours',
  imports: [FormsModule, XTimePickerComponent],
  templateUrl: './use12hours.component.html',
  styleUrls: ['./use12hours.component.scss']
})
export class ExUse12hoursComponent {
  model1 = signal('');
  model2 = signal(new Date());
}
