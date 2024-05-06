import { Component } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = [
    { label: 'log in', icon: 'fto-user' },
    { label: 'verification', icon: 'fto-user-check' },
    { label: 'payment', icon: 'fto-credit-card' },
    { label: 'carry out', icon: 'fto-smile' }
  ];
}
