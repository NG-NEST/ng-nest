import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  data = ['AAAA', 'BBBB', { label: 'CCCC', leaf: true }, 'DDDD'];
  data1 = JSON.parse(JSON.stringify(this.data));
  data2 = JSON.parse(JSON.stringify(this.data));
  data3 = JSON.parse(JSON.stringify(this.data));
  data4 = JSON.parse(JSON.stringify(this.data));
  data5 = JSON.parse(JSON.stringify(this.data));
  data6 = JSON.parse(JSON.stringify(this.data));
  data7 = JSON.parse(JSON.stringify(this.data));
  data8 = JSON.parse(JSON.stringify(this.data));
  data9 = JSON.parse(JSON.stringify(this.data));
  model1: any;
  model2 = 'AAAA';
  model3: any;
  model4 = ['AAAA', 'BBBB'];
  model5: any;
  model6 = ['BBBB', 'CCCC'];
  model7 = 'BBBB';
  model8: any;
  model9 = ['AAAA', 'BBBB', 'CCCC', 'DDDD'];
  constructor() {}

  ngOnInit() {}

  change9($event: any) {
    console.log($event);
  }
}
