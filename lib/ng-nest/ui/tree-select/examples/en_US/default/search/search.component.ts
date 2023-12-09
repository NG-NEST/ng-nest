import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-search',
  standalone: true,
  imports: [FormsModule, XTreeSelectComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class ExSearchComponent {
  data1: XTreeSelectNode[] = [
    { id: 1, label: 'Fruit' },
    { id: 2, label: 'Vegetable' },
    { id: 3, label: 'Drink' },
    { id: 4, label: 'Apple', pid: 1 },
    { id: 5, label: 'Banana', pid: 1 },
    { id: 6, label: 'Pear', pid: 1 },
    { id: 7, label: 'Lettuce', pid: 2 },
    { id: 8, label: 'Cabbage', pid: 2 },
    { id: 9, label: 'Leek', pid: 2 },
    { id: 10, label: 'Soda', pid: 3 },
    { id: 11, label: 'Juice', pid: 3 },
    { id: 12, label: 'Purified water', pid: 3 },
    { id: 13, label: 'Millet banana', pid: 5 },
    { id: 14, label: 'Canna edulis', pid: 5 },
    { id: 15, label: 'Emperor banana', pid: 5 }
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
