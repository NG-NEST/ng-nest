import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data: XData<XStepsNode> = [
    { label: 'log in', icon: 'fto-user' },
    { label: 'verification', icon: 'fto-user-check' },
    { label: 'payment', icon: 'fto-credit-card' },
    { label: 'carry out', icon: 'fto-smile' }
  ];
}
