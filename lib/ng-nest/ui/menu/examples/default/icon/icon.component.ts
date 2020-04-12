import { Component } from '@angular/core';

@Component({
  selector: 'ex-icon',
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = ['最新活动', { label: '产品', icon: 'fto-package' }, '解决方案', { label: '帮助和支持', icon: 'fto-phone' }];
}
