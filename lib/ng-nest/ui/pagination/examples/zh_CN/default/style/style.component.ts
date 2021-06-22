import { Component } from '@angular/core';

@Component({
  selector: 'ex-style',
  templateUrl: './style.component.html'
})
export class ExStyleComponent {
  index = 5;
  size = 15;
  total = 80;
  change(index: number) {}
}
