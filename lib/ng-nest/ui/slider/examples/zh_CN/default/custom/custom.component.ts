import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSliderNode } from '@ng-nest/ui/slider';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  data: XData<XSliderNode> = [
    { label: '用户管理', icon: 'fto-box' },
    { label: '配置管理', icon: 'fto-settings' },
    '角色管理',
    '任务',
    '工作',
    '消息',
    '流程',
    '新闻'
  ];
}
