import { Component } from '@angular/core';

@Component({
  selector: 'ex-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class ExCircleComponent {
  percent = 50;
  plus(num: number) {
    if ((this.percent === 0 && num === -5) || (this.percent === 100 && num === 5)) return;
    this.percent = this.percent + num;
  }
}
