import { Component } from '@angular/core';

@Component({
  selector: 'ex-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class ExCardComponent {
  list = [1, 2, 3, 4, 5];
}
