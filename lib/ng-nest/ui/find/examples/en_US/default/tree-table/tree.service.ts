import { Injectable } from "@angular/core";
import { XTreeNode } from "@ng-nest/ui/tree";
import { Observable } from "rxjs";

@Injectable()
export class TreeService {
  data: XTreeNode[] = [
    { id: 1, label: 'LeiHao group' },
    { id: 2, label: 'Enterprises develop', pid: 1 },
    { id: 3, label: 'Social networking', pid: 1 },
    { id: 4, label: 'Interactive entertainment', pid: 1 },
    { id: 5, label: 'Mobile Internet', pid: 1 },
    { id: 6, label: 'Network media', pid: 1 },
    { id: 7, label: 'Personnel department', pid: 4 },
    { id: 8, label: 'Administration department', pid: 4 },
    { id: 9, label: 'Accounting department', pid: 4 }
  ];

  getTreeList = (pid = undefined): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      setTimeout(() => {
        x.next(this.data);
        x.complete();
      }, 10);
    });
  };
}