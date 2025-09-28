import { Component, signal } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XCoversationsComponent, XCoversationNode } from '@ng-nest/ui/coversations';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-group',
  imports: [XCoversationsComponent, XIconComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class ExGroupComponent {
  data1 = signal<XData<XCoversationNode>>([
    { id: 1, label: 'Coversation 1', group: '2025-01-02' },
    { id: 2, label: 'Coversation 2', group: '2025-01-02' },
    { id: 3, label: 'Coversation 3', group: '2025-01-02' },
    { id: 4, label: 'Coversation 4', group: '2025-01-01' },
    { id: 5, label: 'Coversation 5', group: '2025-01-01' },
    { id: 6, label: 'Coversation 6', group: '2025-01-01' }
  ]);

  data2 = signal<XData<XCoversationNode>>([
    { id: 1, label: 'Coversation 1', group: '2025-01-02' },
    { id: 2, label: 'Coversation 2', group: '2025-01-02' },
    { id: 3, label: 'Coversation 3', group: '2025-01-02' },
    { id: 4, label: 'Coversation 4', group: '2025-01-01' },
    { id: 5, label: 'Coversation 5', group: '2025-01-01' },
    { id: 6, label: 'Coversation 6', group: '2025-01-01' }
  ]);
}
