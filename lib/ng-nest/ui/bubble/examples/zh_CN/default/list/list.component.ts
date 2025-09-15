import { Component, signal } from '@angular/core';
import { XBubbleComponent, XBubblesComponent } from '@ng-nest/ui/bubble';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-list',
  imports: [XBubbleComponent, XBubblesComponent, XButtonComponent, XButtonsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ExListComponent {
  data = signal([
    {
      role: 'ai',
      content: 'Hi, I am an AI assistant. How can I help you?',
      typing: false
    },
    {
      role: 'user',
      content: 'What is the weather like today?',
      typing: false
    },
    {
      role: 'ai',
      content: 'The weather looks good today. It is currently 70 degrees Fahrenheit with a 60%.',
      typing: false
    },
    {
      role: 'user',
      content: 'What is the weather like today?',
      typing: false
    },
    {
      role: 'ai',
      content: 'The weather looks good today. It is currently 70 degrees Fahrenheit with a 60%.',
      typing: false
    },
    {
      role: 'user',
      content: 'What is the weather like today?',
      typing: false
    }
  ]);

  addItem() {
    const last = this.data()[this.data().length - 1];
    if (last.role === 'user') {
      this.data.update((items) => {
        items.push({
          role: 'ai',
          content: `The weather looks good today. It is currently 70 degrees Fahrenheit with a 60%.`,
          typing: true
        });
        return items;
      });
    } else if (last.role === 'ai') {
      this.data.update((items) => {
        items.push({
          role: 'user',
          content: 'What is the weather like today?',
          typing: false
        });
        return items;
      });
    }
  }
}
