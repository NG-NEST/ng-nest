import { Component, signal } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XSliderComponent } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-custom',
  imports: [XSliderComponent, XIconComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  data = signal([
    { label: '用户管理', icon: 'fto-box' },
    { label: '配置管理', icon: 'fto-settings' },
    '角色管理',
    '任务',
    '工作',
    '消息',
    '流程',
    '新闻'
  ]);
}
