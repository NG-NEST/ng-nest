import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  Input,
  Inject
} from '@angular/core';
import { XMenuPrefix, XMenuNode, XMenuProperty } from './menu.property';
import { XClassMap, XIsChange, XIsEmpty, XSetData, groupBy } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: `${XMenuPrefix}`,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuComponent extends XMenuProperty implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  showCategory = false;
  @Input() set target(ele: string | HTMLElement) {
    this._target = typeof ele === 'string' ? this.doc.querySelector(ele) : ele;
  }
  get scroll(): HTMLElement {
    return this._target;
  }
  nodeClassMap: XClassMap = {};
  datas: XMenuNode[] = [];
  nodes: XMenuNode[] = [];
  rootIndex: number = 0;
  activated: XMenuNode;
  activatedElementRef: ElementRef;
  expanded: any[] = [];
  private _unSubject = new Subject<void>();
  private _target: HTMLElement;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef, @Inject(DOCUMENT) public doc: any) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
    XIsChange(changes.collapsed) && this.setClassMap();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.activatedElementRef && this.scroll) {
      const nodeRect: DOMRect = this.activatedElementRef.nativeElement.getBoundingClientRect();
      const scrollRect: DOMRect = this.scroll.getBoundingClientRect();
      let scrollTop = nodeRect.top - scrollRect.top - scrollRect.height;
      if (scrollTop > 0) {
        let offset = 0;
        while (offset < scrollRect.height / 2) {
          offset = offset + nodeRect.height;
        }
        this.scroll.scrollTop = scrollTop + offset;
      }
    }
  }

  onNodeClick(node: XMenuNode) {
    if (!this.collapsed) {
      this.rootIndex = this.nodes.indexOf(this.getRoot(node));
      this.nodeClick.emit(node);
      this.cdr.detectChanges();
    } else {
      this.onToggle(null, node, true);
    }
  }

  rootIndexChange(index: number) {
    this.rootIndex = index;
    this.nodeClick.emit(this.nodes[index]);
    this.cdr.detectChanges();
  }

  onToggle(event: Event | null, node: XMenuNode, isDropdown = false) {
    if ((this.collapsed && !isDropdown) || node.categoryNode) return;
    if (!node.leaf) {
      this.activated = node;
    } else {
      event?.stopPropagation();
      node.open = !node.open;
      if (node.open && !node.childrenLoaded) {
        node.childrenLoaded = true;
      }
    }
    this.nodeClick.emit(node);
    node.change && node.change();
    this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XMenuPrefix}-${this.layout}`] = this.layout ? true : false;
    this.classMap[`${XMenuPrefix}-collapsed`] = Boolean(this.collapsed);
    this.nodeClassMap[`x-size-${this.size}`] = this.size ? true : false;
    this.cdr.detectChanges();
  }

  private setData() {
    XSetData<XMenuNode>(this.data, this._unSubject).subscribe((x) => {
      this.setDataChange(x);
    });
  }

  private setDataChange(value: XMenuNode[]) {
    !XIsEmpty(this.activatedId) && this.setActivatedNode(value);
    let handlerDatas: XMenuNode[] = [];
    const getChildren = (node: XMenuNode, level: number) => {
      node.level = level;
      node.children = value.filter((y) => y.pid === node.id);
      node.leaf = node.children?.length > 0;
      if (node.leaf) {
        node.open = Boolean(this.expandedAll) || level <= this.expandedLevel || this.expanded.indexOf(node.id) >= 0;
        node.childrenLoaded = node.open;
        node.children.map((y) => getChildren(y, level + 1));
        this.setCategory(node);
      }
      handlerDatas = [...handlerDatas, node];
      return node;
    };
    this.nodes = value.filter((x) => XIsEmpty(x.pid)).map((x) => getChildren(x, 0));
    this.datas = handlerDatas;
    this.cdr.detectChanges();
  }

  private getRoot(value: XMenuNode) {
    let root = value;
    const getParent = (node: XMenuNode) => {
      const parent = this.datas.find((x) => node.pid === x.id) as XMenuNode;
      if (XIsEmpty(parent?.pid)) root = parent;
      else getParent(parent);
    };
    if (!XIsEmpty(value.pid)) getParent(value);
    return root;
  }

  setCategory(value: XMenuNode) {
    const group = groupBy(value.children as XMenuNode[], 'category');
    for (let list of group) {
      const first = list[0];
      if (first.category) {
        list.unshift({
          id: `${first.pid}__${first.category}`,
          pid: first.pid,
          label: first.category,
          level: first.level,
          categoryNode: true
        });
      }
    }
    let con: XMenuNode[] = [];
    group.map((x) => {
      con = con.concat(x);
    });
    value.children = con;
  }

  setActivatedNode(nodes: XMenuNode[]) {
    this.activated = nodes.find((x) => x.id == this.activatedId) as XMenuNode;
    if (this.activated) {
      this.setParentOpen(nodes, this.activated);
    }
  }

  setParentOpen(nodes: XMenuNode[], node: XMenuNode) {
    const getParent = (child: XMenuNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = nodes.find((x) => x.id === child.pid) as XMenuNode;
      if (!XIsEmpty(parent)) {
        this.expanded = [...this.expanded, parent.id];
        getParent(parent);
      }
    };
    getParent(node);
  }
}
