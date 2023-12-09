import { Component } from '@angular/core';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';

@Component({
  selector: 'ex-label',
  standalone: true,
  imports: [XTreeSelectComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  data1: XTreeSelectNode[] = [
    { id: 1, label: '水果' },
    { id: 2, label: '蔬菜' },
    { id: 3, label: '饮料' },
    { id: 4, label: '苹果', pid: 1 },
    { id: 5, label: '香蕉', pid: 1 },
    { id: 6, label: '梨子', pid: 1 },
    { id: 7, label: '生菜', pid: 2 },
    { id: 8, label: '大白菜', pid: 2 },
    { id: 9, label: '韭菜', pid: 2 },
    { id: 10, label: '汽水', pid: 3 },
    { id: 11, label: '果汁', pid: 3 },
    { id: 12, label: '纯净水', pid: 3 },
    { id: 13, label: '小米蕉', pid: 5 },
    { id: 14, label: '仙人蕉', pid: 5 },
    { id: 15, label: '皇帝蕉', pid: 5 }
  ];
  data2: XTreeSelectNode[] = JSON.parse(JSON.stringify(this.data1));
  data3: XTreeSelectNode[] = JSON.parse(JSON.stringify(this.data1));
  data4: XTreeSelectNode[] = JSON.parse(JSON.stringify(this.data1));
}
