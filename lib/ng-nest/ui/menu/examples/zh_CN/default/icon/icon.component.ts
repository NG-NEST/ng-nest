import { Component, signal } from '@angular/core';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XMenuComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = signal([
    '最新活动',
    { label: '产品', icon: 'fto-package' },
    '解决方案',
    { label: '帮助和支持', icon: 'fto-phone' }
  ]);
}
