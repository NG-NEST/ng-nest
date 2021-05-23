import { XTreeNode } from '@ng-nest/ui/tree';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TreeService {
  data: XTreeNode[] = [
    { id: 1, label: '雷浩集团' },
    { id: 2, label: '企业发展事业群', pid: 1 },
    { id: 3, label: '社交网络事业群', pid: 1 },
    { id: 4, label: '互动娱乐事业群', pid: 1 },
    { id: 5, label: '移动互联网事业群', pid: 1 },
    { id: 6, label: '网络媒体事业群', pid: 1 },
    { id: 7, label: '人事部', pid: 4 },
    { id: 8, label: '行政部', pid: 4 },
    { id: 9, label: '财务部', pid: 4 }
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
