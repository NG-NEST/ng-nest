import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  model1 = 0;
  model2 = 60;
  constructor() {}

  ngOnInit() {}
}
