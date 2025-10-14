import { Component, signal, viewChild } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XCardComponent } from '@ng-nest/ui/card';
import { XThoughtChainComponent } from '@ng-nest/ui/thought-chain';
import { XThoughtChainNode } from '@ng-nest/ui/thought-chain';
import { delay, of } from 'rxjs';

@Component({
  selector: 'ex-next',
  imports: [XThoughtChainComponent, XCardComponent, XButtonComponent],
  templateUrl: './next.component.html',
  styleUrl: './next.component.scss'
})
export class ExNextComponent {
  thoughtChain = viewChild.required<XThoughtChainComponent>('thoughtChain');

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
      description: 'Thought chain description - 1'
    },
    {
      id: 2,
      label: 'Thought chain title - 2',
      status: 'error',
      icon: this.iconMap.error,
      description: 'Thought chain description - 2'
    },
    {
      id: 3,
      label: 'Thought chain title - 3',
      status: 'success',
      icon: this.iconMap.success,
      description: 'Thought chain description - 3'
    },
    {
      id: 4,
      label: 'Thought chain title - 4',
      status: 'success',
      icon: this.iconMap.success,
      description: 'Thought chain description - 4'
    }
  ]);

  id = 5;

  addChain() {
    const id = this.id++;
    const item: XThoughtChainNode = {
      id,
      label: `Thought chain title - ${id}`,
      status: 'pending',
      description: `pending...`
    };
    this.thoughtChain().addNode(item);

    of(true)
      .pipe(delay(2000))
      .subscribe(() => {
        item.status = 'success';
        item.icon = this.iconMap.success;
        item.description = `Thought chain description - ${id}`;
        this.thoughtChain().updateNode(item);
      });
  }
}
