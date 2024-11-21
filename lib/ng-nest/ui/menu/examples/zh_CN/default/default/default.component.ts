import { Component, signal } from '@angular/core';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ex-default',
  imports: [XMenuComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = signal(['最新活动', '产品', '解决方案', '帮助和支持']);
}
