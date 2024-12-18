import { Component, signal } from '@angular/core';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-default',
  imports: [XSliderComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = signal(['用户管理', '配置管理', '角色管理', '任务', '工作', '消息', '流程', '新闻']);
}
