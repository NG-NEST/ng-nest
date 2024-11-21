import { Component, signal } from '@angular/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-description',
  imports: [XStepsComponent],
  templateUrl: './description.component.html'
})
export class ExDescriptionComponent {
  data = signal<XStepsNode[]>([
    { label: 'carry out', description: 'This is the description.' },
    { label: 'processing', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ]);
}
