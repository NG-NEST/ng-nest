import { Component, signal } from '@angular/core';
import { XBubbleComponent } from '@ng-nest/ui/bubble';
import { XButtonComponent } from '@ng-nest/ui/button';
import { marked } from 'marked';

@Component({
  selector: 'ex-renderer',
  imports: [XBubbleComponent, XButtonComponent],
  templateUrl: './renderer.component.html',
  styleUrl: './renderer.component.scss'
})
export class ExRendererComponent {
  content = signal(`
> markdown renderer example!

## link

link: [ng-nest](https://ngnest.com)

## list

- item 1
- item 2
- item 3
`);

  mdRenderer = (content: string) => marked.parse(content) as string;

  addContent() {
    this.content.update((x) => {
      x += '\n - hello world !';
      return x;
    });
  }
}
