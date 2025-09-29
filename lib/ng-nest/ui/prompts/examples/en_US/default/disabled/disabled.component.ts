import { Component, signal } from '@angular/core';
import { XPromptsComponent } from '@ng-nest/ui/prompts';

@Component({
  selector: 'ex-disabled',
  imports: [XPromptsComponent],
  templateUrl: './disabled.component.html',
  styleUrl: './disabled.component.scss'
})
export class ExDisabledComponent {
  data = signal([
    {
      label: 'Core Methods for Effective Time Management',
      description: 'What habits can actually help me save two hours every day?',
      icon: 'fto-headphones',
      iconStyle: { color: '#3B82F6' },
      disabled: true
    },
    {
      label: 'Quick and Healthy Breakfast Ideas',
      description: 'What fast, nutritious breakfast options can I choose from?',
      icon: 'fto-meh',
      iconStyle: { color: '#67c23a' }
    },
    {
      label: 'Practical Tips to Boost Focus',
      description: 'I get distracted easily—what techniques can help me concentrate quickly?',
      icon: 'fto-package',
      iconStyle: { color: '#e6a23c' }
    },
    {
      label: 'Essential Packing List for First-Time Solo Travel',
      description: 'What items absolutely can’t I forget on my first solo trip?',
      icon: 'fto-trello',
      iconStyle: { color: '#f56c6c' }
    }
  ]);
}
