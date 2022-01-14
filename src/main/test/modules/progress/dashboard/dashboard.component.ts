import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'ex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ExDashboardComponent {
  percent = 40;
  constructor() {
    interval(1000).subscribe(() => {
      if (this.percent > 0) {
        this.percent -= 10;
      } else if (this.percent === 0) {
        this.percent = 100;
      }
    });
  }
}
