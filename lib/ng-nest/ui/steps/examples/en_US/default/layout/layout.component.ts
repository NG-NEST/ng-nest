import { Component } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-layout',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './layout.component.html'
})
export class ExLayoutComponent {
  data = [
    { label: 'carry out', description: 'This is the description.' },
    { label: 'processing', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ];
}
