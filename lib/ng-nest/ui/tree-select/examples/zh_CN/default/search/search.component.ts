import { Component } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class ExSearchComponent {
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
  model1: any;

  data2 = (val: any): Observable<XTreeSelectNode[]> => {
    return new Observable((x) => {
      let data = JSON.parse(JSON.stringify(this.data1));
      setTimeout(() => {
        let nodes: XTreeSelectNode[] = data.filter((x: XTreeSelectNode) => x.label.indexOf(val) >= 0);
        const getParent = (node: XTreeSelectNode) => {
          if (XIsEmpty(node.pid)) return;
          const parent = data.find((x: XTreeSelectNode) => x.id === node.pid);
          if (!XIsEmpty(parent)) {
            if (nodes.every((x) => x.id !== parent.id)) {
              nodes.push(parent);
            }
          }
        };
        for (let node of nodes) {
          getParent(node);
        }
        x.next(nodes);
        x.complete();
      }, 300);
    });
  };
  model2: any;

  data3 = JSON.parse(JSON.stringify(this.data1));
  model3: any;

  data4 = (val: any): Observable<XTreeSelectNode[]> => {
    return new Observable((x) => {
      let data = JSON.parse(JSON.stringify(this.data1));
      setTimeout(() => {
        let nodes: XTreeSelectNode[] = data.filter((x: XTreeSelectNode) => x.label.indexOf(val) >= 0);
        const getParent = (node: XTreeSelectNode) => {
          if (XIsEmpty(node.pid)) return;
          const parent = data.find((x: XTreeSelectNode) => x.id === node.pid);
          if (!XIsEmpty(parent)) {
            if (nodes.every((x) => x.id !== parent.id)) {
              nodes.push(parent);
            }
          }
        };
        for (let node of nodes) {
          getParent(node);
        }
        x.next(nodes);
        x.complete();
      }, 300);
    });
  };
  model4: any;

  change(event: any) {
    console.log(event);
  }
}
