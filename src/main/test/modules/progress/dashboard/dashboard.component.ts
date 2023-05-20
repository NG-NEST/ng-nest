import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'ex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ExDashboardComponent {
  percent = 40;
  platformId = inject(PLATFORM_ID);
  isBrowser = true;
  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;
    interval(1000).subscribe(() => {
      if (this.percent > 0) {
        this.percent -= 10;
      } else if (this.percent === 0) {
        this.percent = 100;
      }
    });
  }
}
