import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-step',
  standalone: true,
  imports: [FormsModule, XTimePickerComponent],
  templateUrl: './step.component.html'
})
export class ExStepComponent {
  model = signal('');

  change(date: any) {
    console.log(date);
  }
}
