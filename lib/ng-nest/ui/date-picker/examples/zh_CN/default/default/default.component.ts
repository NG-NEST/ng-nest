import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XDatePickerComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model1 = signal<Date | null>(null);
  model2 = signal(new Date());
}
