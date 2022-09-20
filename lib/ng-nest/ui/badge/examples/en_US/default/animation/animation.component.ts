import { Component } from '@angular/core';

@Component({
  selector: 'ex-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class ExAnimationComponent {
  value = 10;

  valueMax = 98;

  onPlus(num: number) {
    this.value = this.value + num;
    this.valueMax = this.valueMax + num;
  }
}
