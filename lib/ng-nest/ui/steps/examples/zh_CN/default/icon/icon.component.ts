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
    { label: '登录', icon: 'fto-user' },
    { label: '验证', icon: 'fto-user-check' },
    { label: '付款', icon: 'fto-credit-card' },
    { label: '完成', icon: 'fto-smile' }
  ];
}
