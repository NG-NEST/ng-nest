import { Component, signal } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XData } from '@ng-nest/ui/core';
import { XCoversationsComponent, XCoversationNode } from '@ng-nest/ui/coversations';
import { XDropdownComponent, XDropdownNode } from '@ng-nest/ui/dropdown';

@Component({
  selector: 'ex-template',
  imports: [XCoversationsComponent, XIconComponent, XDropdownComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class ExTemplateComponent {
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

  operation(node: XDropdownNode) {
    console.log(node);
  }
}
