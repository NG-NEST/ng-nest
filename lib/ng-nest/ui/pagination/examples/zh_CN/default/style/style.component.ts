import { Component } from '@angular/core';

@Component({
  selector: 'ex-style',
  templateUrl: './style.component.html',
  styles: [
    `
      :host .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
export class ExStyleComponent {
  index = 1;
  size = 10;
  total = 100;
  change(index: number) {}
}
