import { Component } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-status',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './status.component.html'
})
export class ExStatusComponent {
  data = [
    { label: 'carry out', description: 'This is the description.' },
    { label: 'Execution error', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ];
}
