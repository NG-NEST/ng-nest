import { Component, signal } from '@angular/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-layout',
  imports: [XStepsComponent],
  templateUrl: './layout.component.html'
})
export class ExLayoutComponent {
  data = signal<XStepsNode[]>([
    { label: 'carry out', description: 'This is the description.' },
    { label: 'processing', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ]);
}
