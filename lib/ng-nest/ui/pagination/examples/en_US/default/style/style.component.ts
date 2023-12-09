import { Component } from '@angular/core';
import { XPaginationComponent } from '@ng-nest/ui/pagination';

@Component({
  selector: 'ex-style',
  standalone: true,
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
  index = 1;
  size = 10;
  total = 100;
  change(index: number) {
    console.log(index);
  }
}
