import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-developing',
  templateUrl: './developing.component.html',
  styleUrls: ['./developing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevelopingComponent implements OnInit {
  private wd = inject(DOCUMENT).defaultView!;
  constructor(public router: Router) {}

  ngOnInit() {}
  push() {
    this.router.navigateByUrl(`/index/home`);
  }
  back() {
    this.wd.history.back();
  }
}
