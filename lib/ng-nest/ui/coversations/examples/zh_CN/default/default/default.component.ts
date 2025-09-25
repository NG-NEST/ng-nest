import { Component, signal } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XCoversationsComponent, XCoversationNode } from '@ng-nest/ui/coversations';

@Component({
  selector: 'ex-default',
  imports: [XCoversationsComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {
  data = signal<XData<XCoversationNode>>([
    { id: 1, label: '对话1' },
    { id: 2, label: '对话2' },
    { id: 3, label: '对话3' },
    {
      id: 4,
      label: '对话4对话4对话4对话4对话4对话4对话4对话4对话4对话4对话4对话4对话4对话4',
      divided: true,
      disabled: true
    }
  ]);
}
