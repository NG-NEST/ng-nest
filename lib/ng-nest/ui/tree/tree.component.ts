import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  NgZone,
  viewChild,
  viewChildren,
  signal,
  computed,
  inject,
  effect
} from '@angular/core';
import { XTreePrefix, XTreeNode, XTreeProperty } from './tree.property';
import {
  XIsEmpty,
  XIsFunction,
  XIsUndefined,
  XIsChange,
  XSetData,
  XConfigService,
  XResize,
  XRemove,
  XResizeObserver,
  XComputedStyle,
  XToCssPx
} from '@ng-nest/ui/core';
import { debounceTime, map, Observable, Subject } from 'rxjs';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { XTreeNodeComponent } from './tree-node.component';
import { CdkDrag, CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { XTreeService } from './tree.service';
import { XIconComponent } from '@ng-nest/ui/icon';
import { DOCUMENT } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XTreePrefix}`,
  standalone: true,
  imports: [DragDropModule, ScrollingModule, XTreeNodeComponent, XIconComponent],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeComponent extends XTreeProperty implements OnChanges {
  tree = viewChild('tree', { read: ElementRef<HTMLElement> });
  virtualBody = viewChild('virtualBody', { read: CdkVirtualScrollViewport });
  dropList = viewChild('dropList', { read: CdkDropList<HTMLElement> });
  nodeComponents = viewChildren(XTreeNodeComponent);
  private document = inject(DOCUMENT);
  private fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));

  nodes: XTreeNode[] = [];

  virtualNodes: XTreeNode[] = [];
  activatedNode = signal<XTreeNode | null>(null);
  dataIsFunc = false;
  getting = false;
  treeData: XTreeNode[] = [];

  dragging = signal(false);
  dragPosition = signal<-1 | 1>(-1);
  hoverTreeNode = signal<XTreeNode | null>(null);
  hoverTreeEle!: ElementRef;
  draggingTreeNode: XTreeNode | null = null;
  hasChecked = false;

  get isEmpty() {
    return XIsEmpty(this.nodes);
  }

  private _unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public ngZone: NgZone,
    public treeService: XTreeService
  ) {
    super();

    effect(() => {
      const virtualBody = this.virtualBody();
      if (virtualBody) {
        virtualBody['_scrollStrategy']['_minBufferPx'] = this.minBufferPxSignal();
        virtualBody['_scrollStrategy']['_maxBufferPx'] = this.maxBufferPxSignal();
      }
    });
  }

  heightAdaptionSignal = toSignal(
    XResize(this.heightAdaption()!).pipe(
      debounceTime(30),
      map(({ resizeObserver }) => {
        this.resizeObserver = resizeObserver;
        return this.document.documentElement.clientWidth;
      })
    ),
    {
      initialValue: this.heightAdaption()?.clientHeight!
    }
  );

  virtualScrollHeightSignal = computed(() => {
    const virtualScroll = this.virtualScroll();
    const heightAdaption = this.heightAdaption();
    if (virtualScroll && heightAdaption) {
      return this.heightAdaptionSignal();
    } else {
      return XToCssPx(this.virtualScrollHeight(), this.fontSize());
    }
  });

  minBufferPxSignal = computed(() => {
    const virtualScroll = this.virtualScroll();
    const heightAdaption = this.heightAdaption();
    if (virtualScroll && heightAdaption) {
      return this.virtualScrollHeightSignal();
    } else {
      return this.minBufferPx();
    }
  });

  maxBufferPxSignal = computed(() => {
    const virtualScroll = this.virtualScroll();
    const heightAdaption = this.heightAdaption();
    if (virtualScroll && heightAdaption) {
      return this.virtualScrollHeightSignal() * 1.2;
    } else {
      return this.maxBufferPx();
    }
  });

  ngOnChanges(changes: SimpleChanges): void {
    const { expandedAll, data, activatedId, checked, manual } = changes;
    XIsChange(data) && this.setData();
    XIsChange(activatedId) && this.setActivatedNode(this.treeData);
    XIsChange(expandedAll) && this.setExpandedAll();
    XIsChange(checked) && this.setCheckedKeys(this.checked());
    XIsChange(manual) && this.setManual();
  }

  ngAfterViewInit() {
    this.setScorllTop();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this.resizeObserver?.disconnect();
  }

  setData() {
    if (typeof this.data() === 'undefined') return;
    this.dataIsFunc = false;
    if (XIsFunction(this.data())) {
      this.dataIsFunc = true;
      this.getDataByFunc();
    } else {
      XSetData<XTreeNode>(this.data(), this._unSubject).subscribe((x) => {
        this.setDataChange(x);
      });
    }
  }

  cdkDragStarted(event: CdkDragStart) {
    this.dragging.set(true);
    this.draggingTreeNode = event.source.data;
    if (event.source.data.open) {
      this.onToggle(event.event, event.source.data);
    }
    this.nodeDragStarted.emit({ event, from: this.draggingTreeNode! });
  }

  cdkDragEnded(event: CdkDragEnd) {
    this.dragging.set(false);
    const hoverTreeNode = this.hoverTreeNode();
    if (hoverTreeNode) {
      if (hoverTreeNode.id !== event.source.data.id) {
        this.insertNode(event.source.data, hoverTreeNode, this.dragPosition());
      }
      hoverTreeNode.change && hoverTreeNode.change();
      this.nodeDragEnded.emit({
        event,
        from: event.source.data,
        to: hoverTreeNode,
        position: this.dragPosition()
      });
    }
  }

  insertNode(dragNode: XTreeNode, hoverNode: XTreeNode, dragPosition: -1 | 1) {
    let parent = this.nodes.find((x) => x.id === dragNode.pid);
    this.treeService.moveNode(this.treeData, dragNode, hoverNode, dragPosition);
    this.setDataChange(this.treeData, true, false, true, parent);
  }

  cdkDragMoved(event: CdkDragMove<XTreeNode>) {
    const hoverTreeNode = this.hoverTreeNode();
    if (!this.dragging() || !hoverTreeNode) return;
    const y = event.pointerPosition.y;
    if (event.source.data.id === hoverTreeNode.id) return;
    const target = this.hoverTreeEle.nativeElement as HTMLElement;
    const { top, height } = target.getBoundingClientRect();
    const des = Math.max(height * 0.5, 2);
    if (y > top && y < top + des) {
      this.dragPosition.set(-1);
    } else if (y > top + des && y < top + height) {
      this.dragPosition.set(1);
    }
    hoverTreeNode.change && hoverTreeNode.change();
    this.nodeDragMoved.emit({
      event,
      from: this.draggingTreeNode!,
      to: hoverTreeNode,
      position: this.dragPosition()
    });
  }

  predicate(_drag: CdkDrag<XTreeNode>, _drop: CdkDropList<XTreeNode>) {
    return true;
  }

  private setManual() {
    if (this.dataIsFunc) this.getDataByFunc();
  }

  private getDataByFunc() {
    if (!this.manual) return;
    XSetData<XTreeNode>((this.data() as Function)(), this._unSubject).subscribe((x) => {
      this.setDataChange(x);
    });
  }

  private setDataChange(
    value: XTreeNode[],
    regetChildren = false,
    init = true,
    parentOpen = true,
    lazyParant?: XTreeNode
  ) {
    if (XIsEmpty(this.checked()) || !this.hasChecked) this.checked.set([]);
    const getChildren = (node: XTreeNode, level: number) => {
      if (init) {
        node.level = level;
        node.open =
          this.expandedAll() || level <= this.expandedLevel() || this.expanded().includes(node.id) || node.open;
        node.checked = this.checked().includes(node.id) || node.checked;
        node.childrenLoaded = node.open;
      }
      if (XIsUndefined(node.children) || regetChildren) {
        node.children = value.filter((y) => y.pid === node.id);
        if (this.levelCheck() && node.children && node.checked) {
          for (let nd of node.children) {
            nd.checked = true;
            this.checked.update((x) => {
              x.push(nd.id);
              return x;
            });
          }
        }
      }
      if ((!this.lazy() && (XIsUndefined(node.leaf) || regetChildren)) || node.id === lazyParant?.id) {
        node.leaf = (node.children?.length as number) === 0;
      }
      if (!node.leaf) node.children?.map((y) => getChildren(y, level + 1));
      return node;
    };
    this.treeData = value;
    this.nodes = value.filter((x) => XIsEmpty(x.pid)).map((x) => getChildren(x, 0));
    if (parentOpen) {
      for (let item of value) {
        if (!item.leaf && item.open) {
          this.setParentOpen(value, item);
        }
      }
    }
    this.setExpanded();
    this.cdr.detectChanges();
  }

  nodeMouseenter($event: { event: MouseEvent; node: XTreeNode; ele: ElementRef }) {
    const { node, ele } = $event;
    if (!this.dragging()) return;
    let before = this.hoverTreeNode();
    this.hoverTreeNode.set(node);
    this.hoverTreeEle = ele;
    const hoverTreeNode = this.hoverTreeNode();
    if (hoverTreeNode) {
      hoverTreeNode.change && hoverTreeNode.change();
    }
    if (before) {
      before.change && before.change();
    }

    if (!node.leaf && !node.open) {
      let from = this.nodes.indexOf(this.draggingTreeNode!);
      let to = this.nodes.indexOf(node);
      if (to - from !== -1) {
        this.onToggle(null!, node);
      }
    }
  }

  setScorllTop() {
    const scrollElement = this.scrollElement();
    if (!scrollElement || !this.activatedNode()) return;
    const inx = this.nodes.indexOf(this.activatedNode()!);
    let com = this.nodeComponents().find((_, index) => index === inx);
    if (!com) return;
    let ele = com.elementRef.nativeElement as HTMLElement;
    let scrollEle = scrollElement;
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
    if (!XIsEmpty(keys)) this.hasChecked = true;
    const setChildren = (nodes: XTreeNode[], clear = false) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        x.checked = !clear && keys.includes(x.id);
        x.change && x.change(true);
        setChildren(x.children as XTreeNode[], clear);
      });
    };
    setChildren(this.nodes, XIsEmpty(keys));
    this.cdr.detectChanges();
  }

  setExpandedAll() {
    if (this.expandedAll() && this.treeData.length === this.nodes.length) return;
    const setChildren = (nodes: XTreeNode[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        x.open = this.expandedAll();
        x.change && x.change();
        setChildren(x.children as XTreeNode[]);
      });
    };
    setChildren(this.nodes);

    if (this.expandedAll() === false) {
      this.nodes = this.treeData.filter((x) => XIsEmpty(x.pid));
    } else {
      if (this.virtualNodes.length === 0) {
        this.virtualNodes = [...this.nodes];
      }
      this.nodes = [...this.virtualNodes];
      for (let item of this.virtualNodes) {
        this.setVirtualExpandedAll(item, this.expandedAll());
      }
    }
  }

  setExpanded() {
    for (let item of this.nodes) {
      if (item.open && item.children) {
        let index = this.nodes.indexOf(item);
        this.nodes.splice(index + 1, 0, ...(item.children as XTreeNode[]));
      }
      item.change && item.change();
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
        if (XIsEmpty(nd.children)) return;
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
        if (XIsEmpty(nd.children)) return;
        delCount += nd.children!.length;
        for (let child of nd.children!) {
          child.open && getCount(child);
        }
      };
      getCount(node);
      this.nodes.splice(index + 1, delCount);
    }

    this.addOrRemoveExpanded(node);
    this.nodes = [...this.nodes];
    this.virtualBody()?.checkViewportSize();
    this.cdr.detectChanges();
  }

  addOrRemoveExpanded(node: XTreeNode) {
    if (node.open) {
      if (!this.expanded().includes(node.id)) {
        this.expanded.update((x) => {
          x.push(node.id);
          return x;
        });
      }
    } else {
      if (this.expanded().includes(node.id)) {
        this.expanded.update((x) => {
          x.splice(this.expanded().indexOf(node.id), 1);
          return x;
        });
      }
    }
  }

  setActivatedNode(nodes: XTreeNode[], parentOpen = true, dataChange = true) {
    if (XIsEmpty(this.activatedId()) && this.multiple()) {
      this.activatedId.set([]);
    }
    let before = this.activatedNode();
    if (this.multiple()) {
      if (this.activatedId().length > 0) {
        let ids = this.objectArray() ? this.activatedId().map((x: XTreeNode) => x.id) : this.activatedId();
        for (let i = 0; i < ids.length; i++) {
          let node = nodes.find((x) => x.id === ids[i]) as XTreeNode;
          if (node) {
            parentOpen && this.setParentOpen(nodes, node);
            if (i === ids.length - 1) {
              this.activatedNode.set(node);
              this.activatedChange.emit(this.activatedNode()!);
            }
          }
        }
      }
    } else {
      let activatedId = this.activatedId();
      this.activatedNode.set(nodes.find((x) => x.id == activatedId) as XTreeNode);
      if (this.activatedNode()) {
        parentOpen && this.setParentOpen(nodes, this.activatedNode()!);
        this.activatedChange.emit(this.activatedNode()!);
      }
    }
    if (before) {
      before.change && before.change();
    }
    if (!XIsEmpty(nodes) && dataChange) {
      this.setDataChange(nodes, false, true, parentOpen);
    }
  }

  setParentOpen(nodes: XTreeNode[], node: XTreeNode) {
    const getParent = (child: XTreeNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = nodes.find((x) => x.id === child.pid) as XTreeNode;
      if (!XIsEmpty(parent)) {
        if (!this.expanded().includes(parent.id)) {
          this.expanded.update((x) => [...x, parent.id]);
        }
        parent.open = true;
        parent.change && parent.change();
        getParent(parent);
      }
    };
    getParent(node);
  }

  setParentCheck(nodes: XTreeNode[], node: XTreeNode) {
    const getParent = (child: XTreeNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = nodes.find((x) => x.id === child.pid) as XTreeNode;
      if (!XIsEmpty(parent)) {
        if (!this.expanded().includes(parent.id)) {
          this.expanded.update((x) => [...x, parent.id]);
        }
        parent.open = true;
        parent.change && parent.change();
        getParent(parent);
      }
    };
    getParent(node);
  }

  onToggle(event: Event, node: XTreeNode) {
    node.open = !node.open;
    if (this.lazy() && !node.childrenLoaded) {
      this.getLazyData(node, () => this.virtualToggle(node));
    } else {
      this.virtualToggle(node);
    }
    event?.preventDefault();
    event?.stopPropagation();
  }

  getLazyData(node: XTreeNode, callBack?: () => void) {
    node.loading = true;
    node.change && node.change();
    (this.data() as (pid?: any) => Observable<XTreeNode[]>)(node.id)
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
        this.treeData = [...this.treeData, ...x];
        if (callBack) callBack();
        node.change && node.change();
        this.cdr.detectChanges();
      });
  }

  addNode(node: XTreeNode) {
    let parent = this.treeData.find((x) => x.id === node.pid)!;
    const _addNode = () => {
      if (parent) {
        node.level = parent.level! + 1;
        node.pid = parent.id;
        node.leaf = true;
        parent.leaf = false;
        parent.open = true;
        this.treeData = [...this.treeData, node];
        this.setParentOpen(this.treeData, node);
        this.setDataChange(this.treeData, true, false, false);
        this.setActivatedId(node);
        this.setActivatedNode(this.nodes, true, false);
        node.change && node.change();
      } else if (XIsEmpty(node.pid)) {
        node.level = 0;
        node.leaf = true;
        this.treeData = [...this.treeData, node];
        this.nodes = [...this.nodes, node];
        this.setActivatedId(node);
        this.setActivatedNode(this.nodes, true, false);
        node.change && node.change();
      }
    };
    if (this.lazy() && parent && !parent.childrenLoaded) {
      this.getLazyData(parent, () => {
        _addNode();
      });
    } else {
      _addNode();
    }
  }

  setActivatedId(node: XTreeNode) {
    if (this.multiple()) {
      if (this.objectArray()) {
        this.activatedId.set([node]);
      } else {
        this.activatedId.set([node.id]);
      }
    } else {
      this.activatedId.set(node.id);
    }
  }

  removeNode(node: XTreeNode) {
    let parent = this.treeData.find((x) => x.id === node.pid)!;
    const removeChildren = (nd: XTreeNode) => {
      XRemove(this.treeData, (x) => x.id === nd.id);
      if (nd.children) {
        for (let item of nd.children) {
          removeChildren(item);
        }
      }
    };
    removeChildren(node);

    if (parent) {
      if (!parent.children) parent.children = [];
      const childIndex = parent.children.findIndex((x) => x.id === node.id);
      if (childIndex > -1) {
        parent.children.splice(childIndex, 1);
      }
      parent.leaf = parent.children.length === 0;
    }
    this.setDataChange(this.treeData, true, false, false);
  }

  updateNode(node: XTreeNode, nowNode: XTreeNode) {
    Object.assign(node, nowNode);
    node.change && node.change();
  }

  trackByItem(_index: number, item: XTreeNode) {
    return item;
  }
}
