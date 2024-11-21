import { Component, signal } from '@angular/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-index',
  imports: [XStepsComponent],
  templateUrl: './index.component.html'
})
export class ExIndexComponent {
  data = signal<XStepsNode[]>([
    { label: 'carry out', description: 'This is the description.' },
    { label: 'processing', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ]);
}
