import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ok() {
    console.log('ok');
  }
  cancel() {
    console.log('cancel');
  }
}
