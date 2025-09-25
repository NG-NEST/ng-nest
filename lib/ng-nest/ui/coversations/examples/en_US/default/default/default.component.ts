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
    { id: 1, label: 'Coversation 1' },
    { id: 2, label: 'Coversation 2' },
    { id: 3, label: 'Coversation 3' },
    {
      id: 4,
      label: 'Coversation4 Coversation4 Coversation4 Coversation4 Coversation4',
      divided: true,
      disabled: true
    }
  ]);
}
