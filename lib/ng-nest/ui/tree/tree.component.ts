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
import { XIsObservable, XIsEmpty, XIsFunction, XIsUndefined, XIsChange, XSetData, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';

@Component({
  selector: `${XTreePrefix}`,
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeComponent extends XTreeProperty implements OnChanges {
  @ViewChild('tree', { static: true }) tree!: ElementRef;
  nodes: XTreeNode[] = [];
  activatedNode!: XTreeNode;
  dataIsFunc = false;
  getting = false;
  treeData: XTreeNode[] = [];
  private _unSubject = new Subject<void>();
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { expandedAll, data, activatedId, checked, manual } = changes;
    XIsChange(expandedAll) && this.setExpandedAll();
    XIsChange(data) && this.setData();
    XIsChange(activatedId) && this.setActivatedNode(this.treeData);
    XIsChange(checked) && this.setCheckedKeys(this.checked);
    XIsChange(manual) && this.setManual();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setData() {
    if (typeof this.data === 'undefined') return;
    this.dataIsFunc = false;
    if (XIsObservable(this.data)) {
      XSetData<XTreeNode>(this.data, this._unSubject).subscribe((x) => {
        this.setDataChange(x);
      });
    } else if (XIsFunction(this.data)) {
      this.dataIsFunc = true;
      this.getDataByFunc();
    } else {
      this.setDataChange(this.data as XTreeNode[]);
    }
  }

  private setManual() {
    if (this.dataIsFunc) this.getDataByFunc();
  }

  private getDataByFunc() {
    if (!this.manual) return;
    XSetData<XTreeNode>((this.data as Function)(), this._unSubject).subscribe((x) => {
      this.setDataChange(x);
    });
  }

  private setDataChange(value: XTreeNode[]) {
    !XIsEmpty(this.activatedId) && this.setActivatedNode(value);
    const getChildren = (node: XTreeNode, level: number) => {
      node.level = level;
      node.open = Boolean(this.expandedAll) || level <= this.expandedLevel || this.expanded.indexOf(node.id) >= 0;
      node.checked = this.checked.indexOf(node.id) >= 0;
      node.childrenLoaded = node.open;
      if (XIsUndefined(node.children)) node.children = value.filter((y) => y.pid === node.id);
      if (XIsUndefined(node.leaf)) node.leaf = (node.children?.length as number) > 0;
      if (node.leaf) node.children?.map((y) => getChildren(y, level + 1));
      return node;
    };
    this.treeData = value;
    this.nodes = value.filter((x) => XIsEmpty(x.pid)).map((x) => getChildren(x, 0));
    this.cdr.detectChanges();
  }

  getCheckedNodes(): XTreeNode[] {
    let result: XTreeNode[] = [];
    const getChildren = (nodes: XTreeNode[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        if (x.checked) result = [...result, x];
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
        x.checked = !clear && keys.indexOf(x.id) >= 0;
        x.change && x.change(true);
        setChildren(x.children as XTreeNode[], clear);
      });
    };
    setChildren(this.nodes, keys.length === 0);
    this.cdr.detectChanges();
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
    let before = this.activatedNode;
    this.activatedNode = nodes.find((x) => x.id == this.activatedId) as XTreeNode;
    if (this.activatedNode) {
      this.setParentOpen(nodes, this.activatedNode);
      this.activatedChange.emit(this.activatedNode);
    }
    if (before) {
      before.change && before.change();
    }
  }

  setParentOpen(nodes: XTreeNode[], node: XTreeNode) {
    const getParent = (child: XTreeNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = nodes.find((x) => x.id === child.pid) as XTreeNode;
      if (!XIsEmpty(parent)) {
        this.expanded = [...this.expanded, parent.id];
        parent.open = true;
        parent.change && parent.change();
        getParent(parent);
      }
    };
    getParent(node);
  }

  addNode(node: XTreeNode) {
    let parent = this.treeData.find((x) => x.id === node.pid);
    if (parent) {
      if (!parent.children) parent.children = [];
      this.expanded = [...this.expanded, parent.id];
      this.activatedId = node.id;
      node.level = Number(parent.level) + 1;
      node.pid = parent.id;
      this.treeData.push(node);
      this.setActivatedNode(this.treeData);
      parent.open = true;
      parent.leaf = true;
      parent.children = [...parent.children, node];
      parent.change && parent.change();
    } else if (node.pid == null) {
      this.activatedId = node.id;
      node.level = 0;
      this.treeData = [...this.treeData, node];
      this.nodes = [...this.nodes, node];
      this.setActivatedNode(this.treeData);
      this.cdr.detectChanges();
    }
  }

  removeNode(node: XTreeNode) {
    let parent = this.treeData.find((x) => x.id === node.pid);
    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.splice(parent.children.indexOf(node), 1);
      parent.leaf = parent.children.length > 0;
      if (!parent.leaf) this.activatedId = parent.id;
      parent.change && parent.change();
    } else if (node.pid == null) {
      this.treeData.splice(this.treeData.indexOf(node), 1);
      this.nodes.splice(this.nodes.indexOf(node), 1);
      this.cdr.detectChanges();
    }
  }

  updateNode(node: XTreeNode, nowNode: XTreeNode) {
    Object.assign(node, nowNode);
    node.change && node.change();
  }

  trackByItem(_index: number, item: XTreeNode) {
    return item.id;
  }
}
