import { Component } from '@angular/core';

@Component({
  selector: 'ex-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class ExMultipleComponent {
  data1 = [
    { id: 1, label: '一级 1' },
    { id: 2, label: '一级 2' },
    { id: 3, label: '一级 3' },
    { id: 5, label: '二级 1-1', pid: 1 },
    { id: 6, label: '二级 1-2', pid: 1 },
    { id: 7, label: '二级 1-3', pid: 1 },
    { id: 8, label: '二级 1-4', pid: 1 },
    { id: 9, label: '二级 2-1', pid: 2 },
    { id: 10, label: '二级 2-2', pid: 2 },
    { id: 11, label: '二级 2-3', pid: 2 },
    { id: 12, label: '二级 2-4', pid: 2 },
    { id: 13, label: '二级 3-1', pid: 3 },
    { id: 14, label: '二级 3-2', pid: 3 },
    { id: 15, label: '二级 3-3', pid: 3 },
    { id: 16, label: '二级 3-4', pid: 3 },
    { id: 21, label: '三级 1-1-1', pid: 5 },
    { id: 22, label: '三级 1-1-2', pid: 5 },
    { id: 23, label: '三级 1-1-3', pid: 5 },
    { id: 24, label: '三级 1-1-4', pid: 5 }
  ];
  data2 = JSON.parse(JSON.stringify(this.data1));
  data3 = JSON.parse(JSON.stringify(this.data1));
  data4 = JSON.parse(JSON.stringify(this.data1));
  model1: any;
  model2: any = [
    { id: 10, label: '二级 2-2' },
    { id: 21, label: '三级 1-1-1' }
  ];
  model3 = [];
  model4 = [10, 11, 13, 16, 21, 23];

  change(event: any) {
    console.log(event);
  }
}
