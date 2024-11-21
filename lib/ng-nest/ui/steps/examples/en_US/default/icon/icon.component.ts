import { Component, signal } from '@angular/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-icon',
  imports: [XStepsComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = signal<XStepsNode[]>([
    { label: 'log in', icon: 'fto-user' },
    { label: 'verification', icon: 'fto-user-check' },
    { label: 'payment', icon: 'fto-credit-card' },
    { label: 'carry out', icon: 'fto-smile' }
  ]);
}
