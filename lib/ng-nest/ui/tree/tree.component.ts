import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XTreePrefix, XTreeNode, XTreeProperty } from './tree.property';
import { XIsObservable, XIsEmpty, XIsFunction, XIsUndefined, XIsChange, XSetData } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';

@Component({
  selector: `${XTreePrefix}`,
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeComponent extends XTreeProperty implements OnChanges {
  @ViewChild('tree', { static: true }) tree: ElementRef;
  nodes: XTreeNode[] = [];
  activatedNode: XTreeNode;
  lazy: boolean = false;
  private _unSubject = new Subject<void>();
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.expandedAll) && this.setExpandedAll();
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      XSetData<XTreeNode>(this.data, this._unSubject).subscribe((x) => {
        this.setDataChange(x);
      });
    } else if (XIsFunction(this.data)) {
      this.lazy = true;
      XSetData<XTreeNode>((this.data as Function)(), this._unSubject).subscribe((x) => {
        this.setDataChange(x);
      });
    } else {
      this.setDataChange(this.data as XTreeNode[]);
    }
  }

  private setDataChange(value: XTreeNode[]) {
    !XIsEmpty(this.activatedId) && this.setActivatedNode(value);
    const getChildren = (node: XTreeNode, level: number) => {
      node.level = level;
      node.open = Boolean(this.expandedAll) || level <= this.expandedLevel || this.expanded.indexOf(node.id) >= 0;
      node.checked = this.checked.indexOf(node.id) >= 0 ? [node.id] : [];
      node.childrenLoaded = node.open;
      if (XIsUndefined(node.children)) node.children = value.filter((y) => y.pid === node.id);
      if (XIsUndefined(node.leaf)) node.leaf = (node.children?.length as number) > 0;
      if (node.leaf) node.children?.map((y) => getChildren(y, level + 1));
      return node;
    };
    this.nodes = value.filter((x) => XIsEmpty(x.pid)).map((x) => getChildren(x, 0));
    this.cdr.detectChanges();
  }

  getCheckedNodes(): XTreeNode[] {
    let result: XTreeNode[] = [];
    const getChildren = (nodes: XTreeNode[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        if (!XIsEmpty(x.checked)) result = [...result, x];
        getChildren(x.children as XTreeNode[]);
      });
    };
    getChildren(this.nodes);
    return result;
  }

  getCheckedKeys() {
    return this.getCheckedNodes().map((x) => x.id);
  }

  setCheckedKeys(keys: any[] = []) {
    const setChildren = (nodes: XTreeNode[], clear = false) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        x.checked = !clear && keys.indexOf(x.id) >= 0 ? [x.id] : [];
        x.change && x.change(true);
        setChildren(x.children as XTreeNode[], clear);
      });
    };
    setChildren(this.nodes, keys.length === 0);
  }

  setExpandedAll() {
    const setChildren = (nodes: XTreeNode[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        x.open = Boolean(this.expandedAll);
        x.change && x.change();
        setChildren(x.children as XTreeNode[]);
      });
    };
    setChildren(this.nodes);
  }

  setActivatedNode(nodes: XTreeNode[]) {
    this.activatedNode = nodes.find((x) => x.id == this.activatedId) as XTreeNode;
    if (this.activatedNode) {
      this.setParentOpen(nodes, this.activatedNode);
      this.activatedChange.emit(this.activatedNode);
    }
  }

  setParentOpen(nodes: XTreeNode[], node: XTreeNode) {
    const getParent = (child: XTreeNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = nodes.find((x) => x.id === child.pid) as XTreeNode;
      if (!XIsEmpty(parent)) {
        this.expanded = [...this.expanded, parent.id];
        getParent(parent);
      }
    };
    getParent(node);
  }
}
