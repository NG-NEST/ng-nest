import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../layout/layout.service';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @HostBinding('class.small') get small() {
    return this.layout.small;
  }
  @HostBinding('class.xsmall') get xsmall() {
    return this.layout.xsmall;
  }
  constructor(public router: Router, public layout: LayoutService) {}

  ngOnInit() {}
}
