import { JsonPipe } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTreeNode, XTreeComponent } from '@ng-nest/ui/tree';

@Component({
  selector: 'ex-control',
  imports: [JsonPipe, XTreeComponent, XButtonComponent],
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ExControlComponent {
  data = signal<XTreeNode[]>([
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
  ]);
  treeCom = viewChild.required<XTreeComponent>('treeCom');
  activatedNode = signal<XTreeNode | null>(null);
  selectedNodes = signal<XTreeNode[]>([]);
  expandedAll = signal(true);
  content = signal<any[]>([]);

  activatedChange(node: XTreeNode) {
    this.activatedNode.set(node);
  }

  getCheckedKeys() {
    this.content.set(this.treeCom().getCheckedKeys());
  }

  setCheckedKeys(keys: number[] = []) {
    this.treeCom().setCheckedKeys(keys);
  }

  setExpandedAll() {
    this.expandedAll.update((x) => !x);
  }
}
