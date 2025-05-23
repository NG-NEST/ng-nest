import { Component, signal } from '@angular/core';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';

@Component({
  selector: 'ex-height',
  imports: [XTreeComponent],
  templateUrl: './height.component.html',
  styleUrls: ['./height.component.scss']
})
export class ExHeightComponent {
  data = signal<XTreeNode[]>([
    { id: 1, label: '一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1' },
    { id: 2, label: '一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2' },
    { id: 3, label: '一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3' },
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
  ]);
  data1 = signal<XTreeNode[]>([
    { id: 1, label: '一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1' },
    { id: 2, label: '一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2' },
    { id: 3, label: '一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3' },
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
  ]);
  data2 = signal<XTreeNode[]>([
    {
      id: 1,
      label: '一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级 1',
      nowrap: false,
      alignItems: 'start'
    },
    { id: 2, label: '一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2', height: '60px' },
    { id: 3, label: '一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3一级 3' },
    { id: 5, label: '二级 1-1', pid: 1 },
    { id: 6, label: '二级 1-2', pid: 1 },
    { id: 7, label: '二级 1-3', pid: 1 },
    { id: 8, label: '二级 1-4', pid: 1, disabled: true },
    { id: 9, label: '二级 2-1', pid: 2 },
    { id: 10, label: '二级 2-2', pid: 2 },
    { id: 11, label: '二级 2-3', pid: 2 },
    { id: 12, label: '二级 2-4', pid: 2 },
    { id: 13, label: '二级 3-1', pid: 3 },
    { id: 14, label: '二级 3-2', pid: 3 },
    { id: 15, label: '二级 3-3', pid: 3, disabled: true },
    { id: 16, label: '二级 3-4', pid: 3 },
    { id: 21, label: '三级 1-1-1', pid: 5 },
    { id: 22, label: '三级 1-1-2', pid: 5 },
    { id: 23, label: '三级 1-1-3', pid: 5 },
    { id: 24, label: '三级 1-1-4', pid: 5 }
  ]);
}
