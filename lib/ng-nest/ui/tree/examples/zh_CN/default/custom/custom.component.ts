import { Component } from '@angular/core';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [XTreeComponent, XLinkComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  data: XTreeNode[] = [
    { id: 1, label: '一级 1', checked: true },
    { id: 2, label: '一级 2', checked: true },
    { id: 3, label: '一级 3', checked: true },
    { id: 5, label: '二级 1-1', pid: 1, checked: true },
    { id: 6, label: '二级 1-2', pid: 1, checked: true },
    { id: 7, label: '二级 1-3', pid: 1, checked: true },
    { id: 8, label: '二级 1-4', pid: 1, checked: true },
    { id: 9, label: '二级 2-1', pid: 2, checked: true },
    { id: 10, label: '二级 2-2', pid: 2, checked: true },
    { id: 11, label: '二级 2-3', pid: 2, checked: true },
    { id: 12, label: '二级 2-4', pid: 2, checked: true },
    { id: 13, label: '二级 3-1', pid: 3, checked: true },
    { id: 14, label: '二级 3-2', pid: 3, checked: true },
    { id: 15, label: '二级 3-3', pid: 3, checked: true },
    { id: 16, label: '二级 3-4', pid: 3, checked: true },
    { id: 21, label: '三级 1-1-1', pid: 5, checked: true },
    { id: 22, label: '三级 1-1-2', pid: 5, checked: true },
    { id: 23, label: '三级 1-1-3', pid: 5, checked: true },
    { id: 24, label: '三级 1-1-4', pid: 5, checked: true }
  ];

  resetData() {
    this.data = [
      { id: 1, label: '一级 1', checked: true },
      { id: 2, label: '一级 2', checked: true },
      { id: 3, label: '一级 3', checked: false },
      { id: 5, label: '二级 1-1', pid: 1, checked: true },
      { id: 6, label: '二级 1-2', pid: 1, checked: true },
      { id: 7, label: '二级 1-3', pid: 1, checked: true },
      { id: 8, label: '二级 1-4', pid: 1, checked: true },
      { id: 9, label: '二级 2-1', pid: 2, checked: true },
      { id: 10, label: '二级 2-2', pid: 2, checked: true },
      { id: 11, label: '二级 2-3', pid: 2, checked: true },
      { id: 12, label: '二级 2-4', pid: 2, checked: true },
      { id: 13, label: '二级 3-1', pid: 3, checked: false },
      { id: 14, label: '二级 3-2', pid: 3, checked: false },
      { id: 15, label: '二级 3-3', pid: 3, checked: false },
      { id: 16, label: '二级 3-4', pid: 3, checked: false },
      { id: 21, label: '三级 1-1-1', pid: 5, checked: false },
      { id: 22, label: '三级 1-1-2', pid: 5, checked: false },
      { id: 23, label: '三级 1-1-3', pid: 5, checked: false },
      { id: 24, label: '三级 1-1-4', pid: 5, checked: false }
    ];
  }
}
