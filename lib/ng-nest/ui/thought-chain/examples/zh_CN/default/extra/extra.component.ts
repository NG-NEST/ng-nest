import { Component, signal } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XThoughtChainComponent } from '@ng-nest/ui/thought-chain';
import { XThoughtChainNode } from '@ng-nest/ui/thought-chain';

@Component({
  selector: 'ex-extra',
  imports: [XThoughtChainComponent, XDropdownComponent, XButtonComponent, XCardComponent],
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.scss'
})
export class ExExtraComponent {
  data = signal<XThoughtChainNode[]>([
    { id: '111', label: 'Thought chain title - 1', description: 'Thought chain description - 1' },
    { id: '222', label: 'Thought chain title - 2', description: 'Thought chain description - 2' },
    { id: '333', label: 'Thought chain title - 3', description: 'Thought chain description - 3' },
    { id: '444', label: 'Thought chain title - 4', description: 'Thought chain description - 4' }
  ]);

  operation(node: XThoughtChainNode) {
    console.log(node);
  }
}
