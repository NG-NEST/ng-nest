import { Component, signal } from '@angular/core';
import { XPromptsComponent, XPromptsNode } from '@ng-nest/ui/prompts';

@Component({
  selector: 'ex-wrap',
  imports: [XPromptsComponent],
  templateUrl: './wrap.component.html',
  styleUrl: './wrap.component.scss'
})
export class ExWrapComponent {
  data = signal<XPromptsNode[]>([
    {
      label: '高效时间管理的核心方法',
      icon: 'fto-headphones',
      iconStyle: { color: '#3B82F6' }
    },
    {
      label: '10分钟健康早餐推荐',
      icon: 'fto-meh',
      iconStyle: { color: '#67c23a' }
    },
    {
      description: '提升专注力的实用技巧',
      icon: 'fto-package',
      iconStyle: { color: '#e6a23c' }
    },
    {
      description: '首次独自旅行必备清单',
      icon: 'fto-trello',
      iconStyle: { color: '#f56c6c' }
    }
  ]);
}
