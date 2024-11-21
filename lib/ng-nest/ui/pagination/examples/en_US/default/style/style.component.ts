import { Component, signal } from '@angular/core';
import { XPaginationComponent } from '@ng-nest/ui/pagination';

@Component({
  selector: 'ex-style',
  imports: [XPaginationComponent],
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
  index = signal(1);
  size = signal(10);
  total = signal(100);
  change(index: number) {
    console.log(index);
  }
}
