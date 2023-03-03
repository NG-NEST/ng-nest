import { Component } from '@angular/core';
import { XTreeNode } from '@ng-nest/ui/tree';

@Component({
  selector: 'ex-line',
  templateUrl: './line.component.html'
})
export class ExLineComponent {
  data: XTreeNode[] = [
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
    { id: 24, label: '三级 1-1-4', pid: 5 },
    { id: 25, label: '四级 1-1-2-1', pid: 22 },
    { id: 26, label: '四级 1-1-2-2', pid: 22 },
    { id: 27, label: '四级 1-1-2-3', pid: 22 },
    { id: 28, label: '四级 1-1-2-4', pid: 22 },
    { id: 29, label: '四级 1-1-4-1', pid: 24 },
    { id: 30, label: '四级 1-1-4-2', pid: 24 },
    { id: 31, label: '四级 1-1-4-3', pid: 24 },
    { id: 32, label: '四级 1-1-4-4', pid: 24 },
    { id: 33, label: '二级 1-4-1', pid: 8 },
    { id: 34, label: '二级 1-4-2', pid: 8 },
    { id: 35, label: '二级 1-4-3', pid: 8 },
    { id: 36, label: '二级 1-4-4', pid: 8 },
    { id: 37, label: '三级 1-1-4-1', pid: 36 },
    { id: 38, label: '三级 1-1-4-2', pid: 36 },
    { id: 39, label: '三级 1-1-4-3', pid: 36 },
    { id: 40, label: '三级 1-1-4-4', pid: 36 }
  ];
}
