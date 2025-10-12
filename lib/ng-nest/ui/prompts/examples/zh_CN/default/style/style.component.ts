import { Component, signal } from '@angular/core';
import { XPromptsComponent } from '@ng-nest/ui/prompts';

@Component({
  selector: 'ex-style',
  imports: [XPromptsComponent],
  templateUrl: './style.component.html',
  styleUrl: './style.component.scss'
})
export class ExStyleComponent {
  data = signal([
    {
      label: '高效时间管理的核心方法',
      description: '哪些习惯能真正帮我节省每天两小时？',
      icon: 'fto-headphones',
      iconStyle: { color: '#3B82F6' },
      style: { flex: 'none', width: 'calc(50% - 0.25rem)' }
    },
    {
      label: '10分钟健康早餐推荐',
      description: '有哪些既快又营养的早餐搭配可以选？',
      icon: 'fto-meh',
      iconStyle: { color: '#67c23a' },
      style: { flex: 'none', width: 'calc(50% - 0.25rem)' }
    },
    {
      label: '提升专注力的实用技巧',
      description: '总是容易分心，有什么方法能快速集中注意力？',
      icon: 'fto-package',
      iconStyle: { color: '#e6a23c' },
      style: { flex: 'none', width: 'calc(50% - 0.25rem)' }
    },
    {
      label: '首次独自旅行必备清单',
      description: '第一次一个人出门，哪些物品绝对不能漏带？',
      icon: 'fto-trello',
      iconStyle: { color: '#f56c6c' },
      style: { flex: 'none', width: 'calc(50% - 0.25rem)' }
    }
  ]);
}
