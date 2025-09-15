import { Component, signal } from '@angular/core';
import { XBubbleComponent } from '@ng-nest/ui/bubble';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-typing',
  imports: [XBubbleComponent, XButtonComponent],
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.scss'
})
export class ExTypingComponent {
  content = signal('hello world ! hello world ! hello world ! ❤️');

  addContent() {
    this.content.update((x) => {
      x += 'hello world ! hello world ! hello world ! ❤️';
      return x;
    });
  }
}
