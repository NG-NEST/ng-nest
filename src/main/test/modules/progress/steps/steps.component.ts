import { Component } from '@angular/core';

@Component({
  selector: 'ex-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class ExStepsComponent {
  percent = 50;
  plus(num: number) {
    if ((this.percent === 0 && num === -10) || (this.percent === 100 && num === 10)) return;
    this.percent = this.percent + num;
  }
}
