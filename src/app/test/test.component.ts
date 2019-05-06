import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ns-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
