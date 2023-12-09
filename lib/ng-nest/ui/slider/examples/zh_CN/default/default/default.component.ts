import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderComponent, XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XSliderComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data: XData<XSliderNode> = ['用户管理', '配置管理', '角色管理', '任务', '工作', '消息', '流程', '新闻'];
}
