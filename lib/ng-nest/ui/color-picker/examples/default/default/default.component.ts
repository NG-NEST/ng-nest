import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  model1: any;
  model2 = '#409eff';
  model3 = 'rgb(64, 158, 255)';
  model4 = 'hsl(210, 100%, 63%)';
  constructor() {}

  ngOnInit() {}
}
