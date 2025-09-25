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
    { id: 1, label: 'Coversation1', group: 'group1' },
    { id: 2, label: 'Coversation2', group: 'group1' },
    { id: 3, label: 'Coversation3', group: 'group1' },
    { id: 4, label: 'Coversation4', group: 'group2' },
    { id: 5, label: 'Coversation5', group: 'group2' },
    { id: 6, label: 'Coversation6', group: 'group2' },
    {
      id: 7,
      label: 'Coversation7 Coversation7 Coversation7 Coversation7 Coversation7',
      divided: true,
      disabled: true,
      group: 'group2'
    }
  ]);
}
