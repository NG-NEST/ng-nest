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
    { id: 1, label: '对话1', group: '2025-01-02' },
    { id: 2, label: '对话2', group: '2025-01-02' },
    { id: 3, label: '对话3', group: '2025-01-02' },
    { id: 4, label: '对话4', group: '2025-01-01' },
    { id: 5, label: '对话5', group: '2025-01-01' },
    { id: 6, label: '对话6', group: '2025-01-01' }
  ]);

  data2 = signal<XData<XCoversationNode>>([
    { id: 1, label: '对话1', group: '2025-01-02' },
    { id: 2, label: '对话2', group: '2025-01-02' },
    { id: 3, label: '对话3', group: '2025-01-02' },
    { id: 4, label: '对话4', group: '2025-01-01' },
    { id: 5, label: '对话5', group: '2025-01-01' },
    { id: 6, label: '对话6', group: '2025-01-01' }
  ]);
}
