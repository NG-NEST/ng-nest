import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-activated',
  templateUrl: './activated.component.html'
})
export class ExActivatedComponent {
  data: XData<XSliderNode> = ['用户管理', '配置管理', '角色管理', '任务', '工作', '消息', '流程', '新闻'];
}
