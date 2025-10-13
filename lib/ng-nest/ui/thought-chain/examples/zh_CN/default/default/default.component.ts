import { Component, signal } from '@angular/core';
import { XThoughtChainComponent } from '@ng-nest/ui/thought-chain';
import { XThoughtChainNode } from '@ng-nest/ui/thought-chain';

@Component({
  selector: 'ex-default',
  imports: [XThoughtChainComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {
  data = signal<XThoughtChainNode[]>([
    { id: '111', label: 'Thought chain title - 1', content: 'Thought chain content - 1' },
    { id: '222', label: 'Thought chain title - 2', content: 'Thought chain content - 2' },
    { id: '333', label: 'Thought chain title - 3', content: 'Thought chain content - 3' },
    { id: '444', label: 'Thought chain title - 4', content: 'Thought chain content - 4' }
  ]);
}
