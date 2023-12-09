import { Injectable } from '@angular/core';
import { XIsEmpty, XRemove } from '@ng-nest/ui/core';
import { XTreeNode } from './tree.property';

@Injectable({ providedIn: 'root' })
export class XTreeService {
  getChildren(data: XTreeNode[], node: XTreeNode) {
    const res: XTreeNode[] = [];
    const gChildren = (nd: XTreeNode) => {
      const children = data.filter((x) => x.pid === nd.id);
      if (XIsEmpty(children)) return;
      for (let child of children) {
        res.push(child);
        gChildren(child);
      }
    };
    gChildren(node);

    return res;
  }

  getParents(data: XTreeNode[], node: XTreeNode) {
    const res: XTreeNode[] = [];
    const gParent = (nd: XTreeNode) => {
      if (!nd.pid) return;
      const parent = data.find((x) => x.id === nd.pid);
      if (!parent) return;
      res.push(parent);
      gParent(parent);
    };
    gParent(node);

    return res;
  }

  getOpenChildren(data: XTreeNode[], node: XTreeNode) {
    const res: XTreeNode[] = [];
    const gChildren = (nd: XTreeNode) => {
      if (!nd.open) return;
      const children = data.filter((x) => x.pid === nd.id);
      if (XIsEmpty(children)) return;
      for (let child of children) {
        res.push(child);
        gChildren(child);
      }
    };
    gChildren(node);

    return res;
  }

  moveNode(data: XTreeNode[], from: XTreeNode, to: XTreeNode, pos: -1 | 1) {
    if (XIsEmpty(data)) return;
    const formIndex = data.findIndex((x) => x.id === from.id);
    const toIndex = data.findIndex((x) => x.id === to.id);
    XRemove(data, (x) => x.id === from.id);
    if (from.pid === to.pid) {
      const index = toIndex > formIndex ? toIndex - 1 : toIndex;
      data.splice(pos === -1 ? index : index + 1, 0, from);
    } else if (from.pid !== to.pid) {
      from.pid = to.pid;
      const diffLevel = to.level! - from.level!;
      from.level = to.level;
      const fromChildren = this.getChildren(data, from);
      fromChildren.forEach((x) => {
        x.level = x.level! + diffLevel;
      });
      const index = toIndex > formIndex ? toIndex - 1 : toIndex;
      data.splice(pos === -1 ? index : index + 1, 0, from);
    }
  }
}
