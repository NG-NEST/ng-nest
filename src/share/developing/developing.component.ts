import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-developing',
  standalone: true,
  templateUrl: './developing.component.html',
  styleUrls: ['./developing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevelopingComponent {
  private wd = inject(DOCUMENT).defaultView!;
  constructor(public router: Router) {}

  push() {
    this.router.navigateByUrl(`/index/home`);
  }
  back() {
    this.wd.history.back();
  }
}
