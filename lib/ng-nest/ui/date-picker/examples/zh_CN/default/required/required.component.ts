import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-required',
  imports: [FormsModule, XDatePickerComponent],
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent {
  model = signal<Date | null>(null);
}
