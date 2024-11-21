import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  inject,
  computed,
  signal,
  effect
} from '@angular/core';
import { XMenuPrefix, XMenuNode, XMenuProperty } from './menu.property';
import { XIsChange, XIsEmpty, XGroupBy } from '@ng-nest/ui/core';
import { DOCUMENT, NgClass, NgTemplateOutlet } from '@angular/common';
import { XSliderComponent } from '@ng-nest/ui/slider';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';
import { XMenuNodeComponent } from './menu-node.component';

@Component({
  selector: `${XMenuPrefix}`,
  imports: [NgClass, NgTemplateOutlet, XSliderComponent, XDropdownComponent, XMenuNodeComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuComponent extends XMenuProperty implements OnChanges {
  showCategory = signal(false);
  get scroll(): HTMLElement {
    return this._target;
  }
  datas = signal<XMenuNode[]>([]);
  nodes = signal<XMenuNode[]>([]);
  rootIndex = signal(0);
  activated = signal<XMenuNode | null>(null);
  activatedElementRef = signal<ElementRef<HTMLElement> | null>(null);
  expanded = signal<any[]>([]);
  private doc = inject(DOCUMENT);
  private _target!: HTMLElement;

  classMap = computed(() => ({
    [`${XMenuPrefix}-${this.layout()}`]: !XIsEmpty(this.layout()),
    [`${XMenuPrefix}-collapsed`]: this.collapsed()
  }));
  nodeClassMap = computed(() => ({
    [`x-size-${this.size()}`]: !XIsEmpty(this.size())
  }));

  constructor() {
    super();
    effect(() => {
      this.setScrollTop();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data, activatedId, target } = changes;
    XIsChange(data) && this.setDataChange(this.data());
    XIsChange(activatedId) && this.setActivatedNode(this.datas());
    if (XIsChange(target)) {
      const target = this.target();
      this._target = typeof target === 'string' ? this.doc.querySelector(target)! : target!;
    }
  }

  setScrollTop() {
    if (this.activatedElementRef() && this.scroll) {
      if (typeof this.activatedElementRef()!.nativeElement.getBoundingClientRect !== 'function') {
        return;
      }
      const nodeRect: DOMRect = this.activatedElementRef()!.nativeElement.getBoundingClientRect();
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
    if (!this.collapsed()) {
      this.rootIndex.set(this.nodes().indexOf(this.getRoot(node)));
      this.activatedId.set(node.id);
      this.activated.set(node);
      this.nodeClick.emit(node);
    } else {
      this.onToggle(null, node, true);
    }
  }

  rootIndexChange(index: number) {
    this.rootIndex.set(index);
    let node = this.nodes()[index];
    this.activatedId.set(node.id);
    this.activated.set(node);
    this.nodeClick.emit(node);
  }

  onToggle(event: Event | null, node: XMenuNode, isDropdown = false) {
    if ((this.collapsed() && !isDropdown) || node.categoryNode) return;
    if (!node.leaf) {
      this.activated.set(node);
    } else {
      event?.stopPropagation();
      node.open = !node.open;
      if (node.open && !node.childrenLoaded) {
        node.childrenLoaded = true;
      }
    }
    this.nodeClick.emit(node);
  }

  private setDataChange(value: XMenuNode[]) {
    !XIsEmpty(this.activatedId()) && this.setActivatedNode(value);
    let handlerDatas: XMenuNode[] = [];
    const getChildren = (node: XMenuNode, level: number) => {
      node.level = level;
      node.children = value.filter((y) => y.pid === node.id);
      node.leaf = node.children?.length > 0;
      if (node.leaf) {
        node.open = this.expandedAll() || level <= this.expandedLevel() || this.expanded().indexOf(node.id) >= 0;
        node.childrenLoaded = node.open;
        node.children.map((y) => getChildren(y, level + 1));
        node.children = this.setCategory(node.children);
      }
      handlerDatas = [...handlerDatas, node];
      return node;
    };

    this.nodes.set(this.setCategory(value.filter((x) => XIsEmpty(x.pid))).map((x) => getChildren(x, 0)));
    this.datas.set(handlerDatas);
  }

  private getRoot(value: XMenuNode) {
    let root = value;
    const getParent = (node: XMenuNode) => {
      const parent = this.datas().find((x) => node.pid === x.id) as XMenuNode;
      if (XIsEmpty(parent?.pid)) root = parent;
      else getParent(parent);
    };
    if (!XIsEmpty(value.pid)) getParent(value);
    return root;
  }

  setCategory(nodes: XMenuNode[]) {
    const group = XGroupBy(nodes as XMenuNode[], 'category');
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
    return con;
  }

  setActivatedNode(nodes: XMenuNode[]) {
    this.activated.set(nodes.find((x) => x.id == this.activatedId()) as XMenuNode);
    this.rootIndex.set(nodes.findIndex((x) => x.id == this.activatedId() && !x.pid));
    if (this.activated()) {
      this.setParentOpen(nodes, this.activated()!);
    }
  }

  setParentOpen(nodes: XMenuNode[], node: XMenuNode) {
    const getParent = (child: XMenuNode) => {
      if (XIsEmpty(child.pid)) return;
      const parent = nodes.find((x) => x.id === child.pid) as XMenuNode;
      if (!XIsEmpty(parent)) {
        this.expanded.set([...this.expanded(), parent.id]);
        getParent(parent);
      }
    };
    getParent(node);
  }
}
