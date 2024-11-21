import { Component, signal } from '@angular/core';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-size',
  imports: [XSliderComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  data = signal(['用户管理', '配置管理', '角色管理', '任务', '工作', '消息', '流程', '新闻']);
}
