import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XData } from '@ng-nest/ui/core';
import { XCoversationsComponent, XCoversationNode } from '@ng-nest/ui/coversations';

@Component({
  selector: 'ex-model',
  imports: [FormsModule, XCoversationsComponent, XButtonComponent],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})
export class ExModelComponent {
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

  value = signal(1);

  changeValue() {
    const availableValues = [1, 2, 3].filter((val) => val !== this.value());
    const randomIndex = Math.floor(Math.random() * availableValues.length);
    this.value.set(availableValues[randomIndex]);
  }
}
