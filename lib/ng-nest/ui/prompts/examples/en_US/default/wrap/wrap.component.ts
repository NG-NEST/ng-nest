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
      label: 'Core Methods for Effective Time Management',
      icon: 'fto-headphones',
      iconStyle: { color: '#3B82F6' }
    },
    {
      label: 'Quick and Healthy Breakfast Ideas',
      icon: 'fto-meh',
      iconStyle: { color: '#67c23a' }
    },
    {
      label: 'Practical Tips to Boost Focus',
      icon: 'fto-package',
      iconStyle: { color: '#e6a23c' }
    },
    {
      label: 'Essential Packing List for First-Time Solo Travel',
      icon: 'fto-trello',
      iconStyle: { color: '#f56c6c' }
    }
  ]);
}
