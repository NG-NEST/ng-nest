import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-step',
  imports: [FormsModule, XTimePickerComponent],
  templateUrl: './step.component.html'
})
export class ExStepComponent {
  model: any;

  change(date: any) {
    console.log(date);
  }
}
