import { Component, signal } from '@angular/core';
import { XCrumbComponent } from '@ng-nest/ui/crumb';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XCrumbComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = signal(['首页', '用户管理', '用户列表', '用户详情']);
}
