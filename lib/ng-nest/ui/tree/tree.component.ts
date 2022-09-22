import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges,
  QueryList,
  ViewChildren
} from '@angular/core';
import { XTreePrefix, XTreeNode, XTreeProperty } from './tree.property';
import { XIsObservable, XIsEmpty, XIsFunction, XIsUndefined, XIsChange, XSetData, XConfigService, XResize } from '@ng-nest/ui/core';
import { debounceTime, map, Observable, Subject, takeUntil } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { XTreeNodeComponent } from './tree-node.component';

@Component({
  selector: `${XTreePrefix}`,
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeComponent extends XTreeProperty implements OnChanges {
  @ViewChild('tree', { static: true }) tree!: ElementRef;
  @ViewChild('virtualBody') virtualBody!: CdkVirtualScrollViewport;
  nodeComponents!: QueryList<XTreeNodeComponent>;
  @ViewChildren(XTreeNodeComponent)
  public set _nodeComponents(value: QueryList<XTreeNodeComponent>) {
    this.nodeComponents = value;
  }
  nodes: XTreeNode[] = [];
  virtualNodes: XTreeNode[] = [];
  activatedNode!: XTreeNode;
  dataIsFunc = false;
  getting = false;
  treeData: XTreeNode[] = [];

  private _unSubject = new Subject<void>();
  private _resizeObserver!: ResizeObserver;
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
    XIsChange(data) && this.setData();
    XIsChange(expandedAll) && this.setExpandedAll();
    XIsChange(activatedId) && this.setActivatedNode(this.treeData);
    XIsChange(checked) && this.setCheckedKeys(this.checked);
    XIsChange(manual) && this.setManual();
  }

  ngAfterViewInit() {
    if (this.virtualScroll && this.heightAdaption) {
      this.setVirtualScrollHeight();
      XResize(this.heightAdaption as HTMLElement)
        .pipe(debounceTime(30), takeUntil(this._unSubject))
        .subscribe((x) => {
          this._resizeObserver = x.resizeObserver;
          this.setVirtualScrollHeight();
        });
    }
    this.setScorllTop();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
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

  private setVirtualScrollHeight() {
    this.virtualScrollHeight = (this.heightAdaption as HTMLElement).clientHeight;
    this.minBufferPx = this.virtualScrollHeight;
    this.maxBufferPx = this.virtualScrollHeight * 1.2;
    this.virtualBody['_scrollStrategy']['_minBufferPx'] = this.minBufferPx;
    this.virtualBody['_scrollStrategy']['_maxBufferPx'] = this.maxBufferPx;
    this.cdr.detectChanges();
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
      if (XIsUndefined(node.children)) {
        node.children = value.filter((y) => y.pid === node.id);
        if (this.levelCheck && node.children && node.checked) {
          for (let nd of node.children) {
            nd.checked = true;
            this.checked.push(nd.id);
          }
        }
      }
      if (XIsUndefined(node.leaf)) node.leaf = (node.children?.length as number) > 0;
      if (node.leaf) node.children?.map((y) => getChildren(y, level + 1));
      return node;
    };
    this.treeData = value;
    this.nodes = value.filter((x) => XIsEmpty(x.pid)).map((x) => getChildren(x, 0));
    for (let item of value) {
      if (item.open) {
        this.setParentOpen(value, item);
      }
    }
    this.setExpanded();
    this.cdr.detectChanges();
  }

  setScorllTop() {
    if (!this.scrollElement || !this.activatedNode) return;
    let inx = this.nodes.indexOf(this.activatedNode);
    let com = this.nodeComponents.get(inx);
    if (!com) return;
    let ele = com.elementRef.nativeElement as HTMLElement;
    let scrollEle = this.scrollElement;
    let min = scrollEle.scrollTop;
    let max = scrollEle.scrollTop + scrollEle.clientHeight;
    if (ele.offsetTop + ele.clientHeight > max) {
      let scrollTop = ele.offsetTop + ele.clientHeight - scrollEle.clientHeight;
      scrollEle.scrollTop = scrollTop;
    }
    if (ele.offsetTop < min) {
      scrollEle.scrollTop = ele.offsetTop;
    }
  }

  getCheckedNodes(): XTreeNode[] {
    let result: XTreeNode[] = [];
    const getChildren = (nodes: XTreeNode[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        if (x.checked && !result.includes(x)) {
          result = [...result, x];
        }
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
        x.checked = !clear && keys.includes(x.id);
        x.change && x.change(true);
        setChildren(x.children as XTreeNode[], clear);
      });
    };
    setChildren(this.nodes, keys.length === 0);
    this.cdr.detectChanges();
  }

  setExpandedAll() {
    if (this.expandedAll && this.treeData.length === this.nodes.length) return;
    const setChildren = (nodes: XTreeNode[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        x.open = Boolean(this.expandedAll);
        x.change && x.change();
        setChildren(x.children as XTreeNode[]);
      });
    };
    setChildren(this.nodes);

    if (this.expandedAll === false) {
      this.nodes = this.treeData.filter((x) => XIsEmpty(x.pid));
    } else {
      if (this.virtualNodes.length === 0) {
        this.virtualNodes = [...this.nodes];
      }
      this.nodes = [...this.virtualNodes];
      for (let item of this.virtualNodes) {
        this.setVirtualExpandedAll(item, this.expandedAll as boolean);
      }
    }
  }

  setExpanded() {
    for (let item of this.nodes) {
      if (item.open) {
        let index = this.nodes.indexOf(item);
        this.nodes.splice(index + 1, 0, ...(item.children as XTreeNode[]));
      }
    }
    this.nodes = [...this.nodes];
  }

  setVirtualExpandedAll(item: XTreeNode, expandedAll: boolean) {
    let index = this.nodes.indexOf(item);
    if (expandedAll) {
      let addNodes: XTreeNode[] = [];
      const getNodes = (nd: XTreeNode) => {
        for (let child of nd.children!) {
          addNodes.push(child);
          getNodes(child);
        }
      };
      getNodes(item);
      this.nodes.splice(index + 1, 0, ...addNodes);
    }
    this.nodes = [...this.nodes];
  }

  virtualToggle(node: XTreeNode) {
    let index = this.nodes.indexOf(node);
    if (node.open) {
      let addNodes: XTreeNode[] = [];
      const getNodes = (nd: XTreeNode) => {
        for (let child of nd.children!) {
          addNodes.push(child);
          child.open && getNodes(child);
        }
      };
      getNodes(node);
      this.nodes.splice(index + 1, 0, ...addNodes);
    } else {
      let delCount = 0;
      const getCount = (nd: XTreeNode) => {
        delCount += nd.children!.length;
        for (let child of nd.children!) {
          child.open && getCount(child);
        }
      };
      getCount(node);
      this.nodes.splice(index + 1, delCount);
    }
    this.nodes = [...this.nodes];
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
        if (!this.expanded.includes(parent.id)) {
          this.expanded = [...this.expanded, parent.id];
          parent.open = true;
          parent.change && parent.change();
          getParent(parent);
        }
      }
    };
    getParent(node);
  }

  setParentCheck(nodes: XTreeNode[], node: XTreeNode) {
    const getParent = (child: XTreeNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = nodes.find((x) => x.id === child.pid) as XTreeNode;
      if (!XIsEmpty(parent)) {
        if (!this.expanded.includes(parent.id)) {
          this.expanded = [...this.expanded, parent.id];
          parent.open = true;
          parent.change && parent.change();
          getParent(parent);
        }
      }
    };
    getParent(node);
  }

  onToggle(event: Event, node: XTreeNode) {
    node.open = !node.open;
    if (this.lazy && !node.childrenLoaded) {
      this.getLazyData(node, () => this.virtualToggle(node));
    } else {
      this.virtualToggle(node);
    }
    event.preventDefault();
    event.stopPropagation();
    this.cdr.detectChanges();
  }

  getLazyData(node: XTreeNode, callBack?: () => void) {
    node.loading = true;
    node.change && node.change();
    (this.data as (pid?: any) => Observable<XTreeNode[]>)(node.id)
      .pipe(
        map((x) =>
          x.map((y) => {
            y.level = (node.level as number) + 1;
            y.checked = node.checked;
            return y;
          })
        )
      )
      .subscribe((x) => {
        node.children = x;
        node.childrenLoaded = true;
        node.loading = false;
        if (callBack) callBack();
        node.change && node.change();
        this.cdr.detectChanges();
      });
  }

  addNode(node: XTreeNode) {
    let parent = this.treeData.find((x) => x.id === node.pid);
    const _addNode = () => {
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
        this.virtualToggle(parent);
        this.cdr.detectChanges();
        parent.change && parent.change();
      } else if (XIsEmpty(node.pid)) {
        this.activatedId = node.id;
        node.level = 0;
        this.treeData = [...this.treeData, node];
        this.nodes = [...this.nodes, node];
        this.setActivatedNode(this.treeData);
        this.cdr.detectChanges();
      }
    };
    if (this.lazy && parent && !parent.childrenLoaded) {
      this.getLazyData(parent, () => {
        _addNode();
      });
    } else {
      _addNode();
    }
  }

  removeNode(node: XTreeNode) {
    let parent = this.treeData.find((x) => x.id === node.pid);
    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.splice(parent.children.indexOf(node), 1);
      parent.leaf = parent.children.length > 0;
      if (!parent.leaf) this.activatedId = parent.id;
      let index = this.nodes.indexOf(node);
      let aindex = index - 1;
      if (index === 0 && this.nodes.length > 1) {
        aindex = 1;
      }
      let activatedNode = this.nodes[aindex];
      this.activatedId = activatedNode.id;
      this.setActivatedNode(this.nodes);
      this.nodes.splice(index, 1);
      this.nodes = [...this.nodes];
      if (activatedNode) {
        activatedNode.change && activatedNode.change();
      }
      this.cdr.detectChanges();
      parent.change && parent.change();
    } else if (XIsEmpty(node.pid)) {
      this.treeData.splice(this.treeData.indexOf(node), 1);
      this.nodes.splice(this.nodes.indexOf(node), 1);
      this.nodes = [...this.nodes];
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
