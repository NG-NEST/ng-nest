import { Component, signal } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XThoughtChainComponent } from '@ng-nest/ui/thought-chain';
import { XThoughtChainNode } from '@ng-nest/ui/thought-chain';

@Component({
  selector: 'ex-default',
  imports: [XThoughtChainComponent, XCardComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {
  data = signal<XThoughtChainNode[]>([
    { id: '111', label: 'Thought chain title - 1', description: 'Thought chain description - 1' },
    { id: '222', label: 'Thought chain title - 2', description: 'Thought chain description - 2' },
    { id: '333', label: 'Thought chain title - 3', description: 'Thought chain description - 3' },
    { id: '444', label: 'Thought chain title - 4', description: 'Thought chain description - 4' }
  ]);
}
