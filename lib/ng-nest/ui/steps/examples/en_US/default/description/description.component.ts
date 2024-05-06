import { Component } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-description',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './description.component.html'
})
export class ExDescriptionComponent {
  data = [
    { label: 'carry out', description: 'This is the description.' },
    { label: 'processing', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ];
}
