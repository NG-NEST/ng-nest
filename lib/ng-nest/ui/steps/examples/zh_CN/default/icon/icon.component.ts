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
    { label: '登录', icon: 'fto-user' },
    { label: '验证', icon: 'fto-user-check' },
    { label: '付款', icon: 'fto-credit-card' },
    { label: '完成', icon: 'fto-smile' }
  ];
}
