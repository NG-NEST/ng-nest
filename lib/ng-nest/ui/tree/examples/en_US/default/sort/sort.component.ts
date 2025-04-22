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
    { id: 1, sort: 100, label: 'First 1' },
    { id: 2, sort: 300, label: 'First 2' },
    { id: 3, sort: 200, label: 'First 3' },
    { id: 5, label: 'Second 1-1', sort: 400, pid: 1 },
    { id: 6, label: 'Second 1-2', sort: 300, pid: 1 },
    { id: 7, label: 'Second 1-3', sort: 100, pid: 1 },
    { id: 8, label: 'Second 1-4', sort: 200, pid: 1 },
    { id: 9, label: 'dSecond 2-1', pid: 2 },
    { id: 10, label: 'cSecond 2-2', pid: 2 },
    { id: 11, label: 'bSecond 2-3', pid: 2 },
    { id: 12, label: 'aSecond 2-4', pid: 2 },
    { id: 13, label: 'Second 3-1', pid: 3 },
    { id: 14, label: 'Second 3-2', pid: 3 },
    { id: 15, label: 'Second 3-3', pid: 3 },
    { id: 16, label: 'Second 3-4', pid: 3 },
    { id: 21, label: 'Three 1-1-1', pid: 5 },
    { id: 22, label: 'Three 1-1-2', pid: 5 },
    { id: 23, label: 'Three 1-1-3', pid: 5 }
  ]);

  treeCom = viewChild.required<XTreeComponent>('treeCom');

  selected = signal<XTreeNode | null>(null);

  info(node: XTreeNode) {
    this.selected.set(node);
    console.log(this.selected());
  }

  add() {
    this.treeCom().addNode({ id: new Date().getTime(), sort: 50, label: 'new root node' });
  }

  addChild() {
    if (this.selected()) {
      this.treeCom().addNode({ id: new Date().getTime(), sort: 110, label: 'new node', pid: this.selected()!.id });
    }
  }

  update() {
    if (this.selected()) {
      this.treeCom().updateNode(this.selected()!, { id: this.selected()!.id, sort: 30, label: 'update node' });
    }
  }

  remove() {
    if (this.selected()) {
      this.treeCom().removeNode(this.selected()!);
    }
  }
}
