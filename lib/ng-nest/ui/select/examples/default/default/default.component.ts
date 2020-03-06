import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  data1 = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  data2 = JSON.parse(JSON.stringify(this.data1));
  model1: any;
  model2: any = 'CCCC';
  constructor() {}

  ngOnInit() {}
}
