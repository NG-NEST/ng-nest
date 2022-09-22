import { Component, ViewChild } from '@angular/core';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-virtual-scroll',
  templateUrl: './virtual-scroll.component.html'
})
export class ExVirtualScrollComponent {
  data: XTreeNode[] = [
    { id: 1, label: 'First 1' },
    { id: 2, label: 'First 2' },
    { id: 3, label: 'First 3' },
    { id: 5, label: 'Second 1-1', pid: 1 },
    { id: 6, label: 'Second 1-2', pid: 1 },
    { id: 7, label: 'Second 1-3', pid: 1 },
    { id: 8, label: 'Second 1-4', pid: 1 },
    ...Array.from({ length: 3000 }).map((_, index) => ({ id: 10000 + index, label: `Second 1-${index + 5}`, pid: 1 })),
    { id: 9, label: 'Second 2-1', pid: 2 },
    { id: 10, label: 'Second 2-2', pid: 2 },
    { id: 11, label: 'Second 2-3', pid: 2 },
    { id: 12, label: 'Second 2-4', pid: 2 },
    { id: 13, label: 'Second 3-1', pid: 3 },
    { id: 14, label: 'Second 3-2', pid: 3 },
    { id: 15, label: 'Second 3-3', pid: 3 },
    { id: 16, label: 'Second 3-4', pid: 3 },
    { id: 21, label: 'Three 1-1-1', pid: 5 },
    { id: 22, label: 'Three 1-1-2', pid: 5 },
    { id: 23, label: 'Three 1-1-3', pid: 5 },
    ...Array.from({ length: 3000 }).map((_, index) => ({ id: 20000 + index, label: `Three 1-1-${index + 4}`, pid: 5 }))
  ];

  dataLazy1: XTreeNode[] = JSON.parse(JSON.stringify(this.data));
  dataLazy2: XTreeNode[] = JSON.parse(JSON.stringify(this.data));

  scrollHeight = 400;

  @ViewChild('treeCom') treeCom!: XTreeComponent;
  @ViewChild('treeComLazy') treeComLazy!: XTreeComponent;
  getData1 = (pid?: any): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      let result = this.dataLazy1
        .filter((y) => y.pid === pid)
        .map((x) => {
          x.leaf = this.dataLazy1.find((y) => y.pid === x.id) ? true : false;
          return x;
        });
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 500);
    });
  };

  getData2 = (pid?: any): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      let result = this.dataLazy2
        .filter((y) => y.pid === pid)
        .map((x) => {
          x.leaf = this.dataLazy2.find((y) => y.pid === x.id) ? true : false;
          return x;
        });
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 500);
    });
  };

  selected?: XTreeNode;
  selectedLazy?: XTreeNode;

  info(node: XTreeNode) {
    this.selected = node;
    console.log(this.selected);
  }

  add() {
    this.treeCom.addNode({ id: new Date().getTime(), label: 'new root node' });
  }

  addChild() {
    if (this.selected) {
      this.treeCom.addNode({ id: new Date().getTime(), label: 'new node', pid: this.selected.id });
    }
  }

  update() {
    if (this.selected) {
      this.treeCom.updateNode(this.selected!, { id: this.selected.id, label: 'update node' });
    }
  }

  remove() {
    if (this.selected) {
      this.treeCom.removeNode(this.selected);
    }
  }

  infoLazy(node: XTreeNode) {
    this.selectedLazy = node;
    console.log(this.selectedLazy);
  }

  addLazy() {
    this.treeComLazy.addNode({ id: new Date().getTime(), label: 'new root node' });
  }

  addChildLazy() {
    if (this.selectedLazy) {
      this.treeComLazy.addNode({ id: new Date().getTime(), label: 'new node', pid: this.selectedLazy.id });
    }
  }

  updateLazy() {
    if (this.selectedLazy) {
      this.treeComLazy.updateNode(this.selectedLazy!, { id: this.selectedLazy.id, label: 'update node' });
    }
  }

  removeLazy() {
    if (this.selectedLazy) {
      this.treeComLazy.removeNode(this.selectedLazy);
    }
  }
}
