import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
