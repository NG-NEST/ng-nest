import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-developing',
  templateUrl: './developing.component.html',
  styleUrls: ['./developing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevelopingComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
  push() {
    this.router.navigateByUrl(`/index/home`);
  }
  back() {
    window.history.back();
  }
}
