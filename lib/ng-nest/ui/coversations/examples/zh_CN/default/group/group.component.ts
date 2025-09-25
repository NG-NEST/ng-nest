import { Component, signal } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XCoversationsComponent, XCoversationNode } from '@ng-nest/ui/coversations';

@Component({
  selector: 'ex-group',
  imports: [XCoversationsComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class ExGroupComponent {
  data = signal<XData<XCoversationNode>>([
    { id: 1, label: '对话1', group: '分组1' },
    { id: 2, label: '对话2', group: '分组1' },
    { id: 3, label: '对话3', group: '分组1' },
    { id: 4, label: '对话4', group: '分组2' },
    { id: 5, label: '对话5', group: '分组2' },
    { id: 6, label: '对话6', group: '分组2' },
    {
      id: 7,
      label: '对话7对话7对话7对话7对话7对话7对话7对话7对话7对话7对话7对话7对话7对话7对话7对话7对话7',
      divided: true,
      disabled: true,
      group: '分组2'
    }
  ]);
}
