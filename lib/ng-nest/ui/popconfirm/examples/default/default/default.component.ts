import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  confirm() {
    console.log('confirm');
  }
  cancel() {
    console.log('cancel');
  }
}
