import { Component, signal } from '@angular/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-status',
  imports: [XStepsComponent],
  templateUrl: './status.component.html'
})
export class ExStatusComponent {
  data = signal<XStepsNode[]>([
    { label: 'carry out', description: 'This is the description.' },
    { label: 'Execution error', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ]);
}
