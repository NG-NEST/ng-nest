import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCardComponent } from '@ng-nest/ui/card';
import { XSize } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XThoughtChainComponent } from '@ng-nest/ui/thought-chain';
import { XThoughtChainNode } from '@ng-nest/ui/thought-chain';

@Component({
  selector: 'ex-collapsible',
  imports: [FormsModule, XThoughtChainComponent, XCardComponent, XRadioComponent],
  templateUrl: './collapsible.component.html',
  styleUrl: './collapsible.component.scss'
})
export class ExCollapsibleComponent {
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');

  iconMap = {
    success: 'fto-check',
    error: 'fto-alert-circle'
  };

  data = signal<XThoughtChainNode[]>([
    {
      id: 1,
      label: 'Thought chain title - 1',
      status: 'success',
      icon: this.iconMap.success,
      description: 'Thought chain description - 1',
      content: '<p>Thought chain content - 1</p><p>Thought chain content - 1</p>'
    },
    {
      id: 2,
      label: 'Thought chain title - 2',
      status: 'error',
      icon: this.iconMap.error,
      description: 'Thought chain description - 2',
      content: '<p>Thought chain content - 2</p><p>Thought chain content - 2</p>'
    },
    {
      id: 3,
      label: 'Thought chain title - 3',
      status: 'success',
      icon: this.iconMap.success,
      description: 'Thought chain description - 3',
      content: '<p>Thought chain content - 3</p><p>Thought chain content - 3</p>'
    },
    {
      id: 4,
      label: 'Thought chain title - 4',
      status: 'success',
      icon: this.iconMap.success,
      description: 'Thought chain description - 4',
      content: '<p>Thought chain content - 4</p><p>Thought chain content - 4</p>'
    }
  ]);
}
