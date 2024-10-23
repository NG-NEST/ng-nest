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

  moveNode(data: XTreeNode[], from: XTreeNode, to: XTreeNode, pos: -1 | 0 | 1) {
    if (XIsEmpty(data)) return;
    const isAddChildNode = pos === 0;
    const formIndex = data.findIndex((x) => x.id === from.id);
    const toIndex = data.findIndex((x) => x.id === to.id);
    XRemove(data, (x) => x.id === from.id);
    if (from.pid === to.pid) {
      let diffLevel = 0;
      if (isAddChildNode) {
        from.pid = to.id;
        diffLevel = to.level! + 1 - from.level!;
        from.level = to.level! + 1;
        to.open = true;
      } else {
        diffLevel = to.level! - from.level!;
      }
      const fromChildren = this.getChildren(data, from);
      fromChildren.forEach((x) => {
        x.level = x.level! + diffLevel;
      });
      const index = toIndex > formIndex ? toIndex - 1 : toIndex;
      data.splice(pos === -1 ? index : index + 1, 0, from);
    } else if (from.pid !== to.pid) {
      let diffLevel = 0;
      if (isAddChildNode) {
        from.pid = to.id;
        diffLevel = to.level! + 1 - from.level!;
        from.level = to.level! + 1;
        to.open = true;
      } else {
        from.pid = to.pid;
        diffLevel = to.level! - from.level!;
        from.level = to.level;
      }
      const fromChildren = this.getChildren(data, from);
      fromChildren.forEach((x) => {
        x.level = x.level! + diffLevel;
      });
      const index = toIndex > formIndex ? toIndex - 1 : toIndex;
      data.splice(pos === -1 ? index : index + 1, 0, from);
    }
  }
}
