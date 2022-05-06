import { Component } from '@angular/core';

@Component({
  selector: 'ex-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class ExMultipleComponent {
  data1 = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  data2 = JSON.parse(JSON.stringify(this.data1));
  data3 = JSON.parse(JSON.stringify(this.data1));
  data4 = JSON.parse(JSON.stringify(this.data1));
  model1: any;
  model2: any = [
    { id: 'AAAA', label: 'AAAA' },
    { id: 'BBBB', label: 'BBBB' }
  ];
  model3 = [];
  model4 = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];

  change(event: any) {
    console.log(event);
  }
}
