import { Component, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';

@Component({
  selector: 'ex-sort',
  imports: [FormsModule, XTreeComponent, XButtonComponent],
  templateUrl: './sort.component.html'
})
export class ExSortComponent {
  data = signal<XTreeNode[]>([
    { id: 1, sort: 100, label: '一级 1' },
    { id: 2, sort: 300, label: '一级 2' },
    { id: 3, sort: 200, label: '一级 3' },
    { id: 5, label: '二级 1-1', sort: 400, pid: 1 },
    { id: 6, label: '二级 1-2', sort: 300, pid: 1 },
    { id: 7, label: '二级 1-3', sort: 100, pid: 1 },
    { id: 8, label: '二级 1-4', sort: 200, pid: 1 },
    { id: 9, label: 'd二级 2-1', pid: 2 },
    { id: 10, label: 'c二级 2-2', pid: 2 },
    { id: 11, label: 'b二级 2-3', pid: 2 },
    { id: 12, label: 'a二级 2-4', pid: 2 },
    { id: 13, label: '二级 3-1', pid: 3 },
    { id: 14, label: '二级 3-2', pid: 3 },
    { id: 15, label: '二级 3-3', pid: 3 },
    { id: 16, label: '二级 3-4', pid: 3 },
    { id: 21, label: '三级 1-1-1', pid: 5 },
    { id: 22, label: '三级 1-1-2', pid: 5 },
    { id: 23, label: '三级 1-1-3', pid: 5 }
  ]);

  treeCom = viewChild.required<XTreeComponent>('treeCom');

  selected = signal<XTreeNode | null>(null);

  info(node: XTreeNode) {
    this.selected.set(node);
    console.log(this.selected());
  }

  add() {
    this.treeCom().addNode({ id: new Date().getTime(), sort: 50, label: '新增根节点' });
  }

  addChild() {
    if (this.selected()) {
      this.treeCom().addNode({ id: new Date().getTime(), sort: 110, label: '新增子节点', pid: this.selected()!.id });
    }
  }

  update() {
    if (this.selected()) {
      this.treeCom().updateNode(this.selected()!, { id: this.selected()!.id, sort: 30, label: '更新节点' });
    }
  }

  remove() {
    if (this.selected()) {
      this.treeCom().removeNode(this.selected()!);
    }
  }
}
