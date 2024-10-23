import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
  inject,
  computed,
  signal,
  output
} from '@angular/core';
import { XTreeNodePrefix, XTreeNode, XTreeNodeProperty, XTreeAction } from './tree.property';
import { XIsEmpty, XBoolean, XComputedStyle, XToCssPx, XIsObjectArray, XIsArray } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XTreeService } from './tree.service';
import { DOCUMENT, NgStyle } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { FormsModule } from '@angular/forms';
import { XKeywordDirective } from '@ng-nest/ui/keyword';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XTreeComponent } from './tree.component';

@Component({
  selector: `${XTreeNodePrefix}, [${XTreeNodePrefix}]`,
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    XIconComponent,
    XCheckboxComponent,
    XOutletDirective,
    XLinkComponent,
    XKeywordDirective
  ],
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeNodeComponent extends XTreeNodeProperty {
  tree = inject(XTreeComponent, { optional: true, host: true })!;
  nodeMouseenter = output<{ event: MouseEvent; node: XTreeNode; ele: ElementRef }>();
  @HostBinding('class.x-tree-node') rootClass = true;
  private document = inject(DOCUMENT);
  fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
  private unSubject = new Subject<void>();

  @HostListener('mouseenter', ['$event']) onMouseenter(event: MouseEvent) {
    this.nodeMouseenter.emit({ event: event, node: this.node(), ele: this.elementRef });
  }

  @HostListener('mouseleave') onMouseleave(_event: MouseEvent) {
    if (!this.tree.dragging()) return;
    const hoverTreeNode = this.tree.hoverTreeNode();
    hoverTreeNode && hoverTreeNode.change && hoverTreeNode.change();
    this.cdr.detectChanges();
  }

  showDragIndicator = computed(() => {
    return this.tree.dragging() && this.tree.hoverTreeNode()?.id === this.id();
  });

  isChildrenLast = computed(() => {
    let parent = this.tree.nodes().find((x: XTreeNode) => x.id === this.pid());
    if (!parent || !parent.children) return false;
    const index = parent.children.indexOf(this.node());
    return index + 1 === parent.children.length;
  });

  isParentLast = computed(() => {
    let parents = this.treeService.getParents(this.tree.nodes(), this.node());
    if (parents.length <= 1) return [];
    const res: boolean[] = [];
    parents.reduce((pre: XTreeNode, curr: XTreeNode) => {
      if (pre === null) return curr;
      const index = curr.children?.indexOf(pre)!;
      res.push(index + 1 === curr.children?.length!);
      return curr;
    });

    return res.reverse();
  });

  verticalLevel = computed(() => {
    if (this.level()! > 0) {
      return Array.from({ length: this.level()! }).map((_x, index) => index + 1);
    } else {
      return [];
    }
  });

  verticalWidth = computed(() => {
    return XToCssPx(this.tree.spacing(), this.fontSize()) / 2;
  });

  paddingLeft = computed(() => (this.level()! ? this.level()! : 0) * XToCssPx(this.tree.spacing(), this.fontSize()));

  indicatorWidth = computed(() => {
    if (this.tree.dragPosition() === 0) {
      return `calc(100% - ${this.paddingLeft() + XToCssPx(this.tree.spacing(), this.fontSize()) + (this.leaf() ? this.fontSize() * 1.5 : 0)}px)`;
    }
    return `calc(100% - ${this.paddingLeft() + (this.leaf() ? this.fontSize() * 1.5 : 0)}px)`;
  });

  indicatorStyle = computed(() => {
    if (this.tree.dragPosition() === 1) {
      return { bottom: `-${0.0625 * this.fontSize()}px` };
    } else if (this.tree.dragPosition() === -1) {
      return { top: `-${0.0625 * this.fontSize()}px` };
    } else if (this.tree.dragPosition() === 0) {
      return {
        bottom: `-${0.0625 * this.fontSize()}px`
      };
    }
    return {};
  });

  changed = signal(false);

  activated = computed(() => {
    this.changed();
    const activatedId = this.tree.activatedId();
    if (this.tree.multiple()) {
      if (this.tree.objectArray()) {
        return XIsObjectArray<XTreeNode[]>(activatedId) && activatedId.map((x: XTreeNode) => x.id).includes(this.id());
      } else {
        return XIsArray<any[]>(activatedId) && activatedId.includes(this.id());
      }
    } else {
      return activatedId === this.id();
    }
  });

  private cdr = inject(ChangeDetectorRef);
  private treeService = inject(XTreeService);
  elementRef = inject(ElementRef);

  ngOnInit() {
    const node = this.node();
    node.change = (check: boolean) => {
      if (check) this.setCheckbox();
      this.cdr.detectChanges();
    };
    if (!this.tree.levelCheck()) return;
    if (this.checked()) this.setCheckbox();
    this.setIndeterminate(this.node());
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
  }

  onActivate(event: Event, node: XTreeNode) {
    const change: Function = this.tree.activatedNode()?.change as Function;
    this.tree.nodeOpen() && !this.leaf() && this.onToggle(event, node);
    const onChange = () => {
      change && change();
      event.preventDefault();
      event.stopPropagation();
      this.cdr.detectChanges();
    };
    if (this.tree.onlyLeaf() && !this.leaf()) {
      onChange();
      return;
    }
    if (this.tree.multiple()) {
      if (!this.tree.activatedId()) this.tree.activatedId.set([]);
      if (this.tree.objectArray()) {
        const ids = this.tree.activatedId().map((x: XTreeNode) => x.id);
        if (ids.includes(node.id)) {
          this.tree.activatedId.update((x) => {
            x.splice(ids.indexOf(node.id), 1);
            return [...x];
          });
        } else {
          this.tree.activatedId.update((x) => {
            x.push(node);
            return [...x];
          });
        }
      } else {
        if (this.tree.activatedId().includes(node.id)) {
          this.tree.activatedId.update((x) => {
            x.splice(this.tree.activatedId().indexOf(node.id), 1);
            return [...x];
          });
        } else {
          this.tree.activatedId.update((x) => {
            x.push(node.id);
            return [...x];
          });
        }
      }
    } else {
      this.tree.activatedId.set(node.id);
    }
    if (this.tree.activatedNode()) {
      if (this.tree.activatedNode()?.id === node.id && !this.tree.allowManyActivated()) return;
    }
    this.tree.activatedNode.set(node);
    this.changed.update((x) => !x);
    this.tree.activatedChange.emit(node);
    this.tree.nodeClick.emit(node);
    onChange();
  }

  onCheckboxChange() {
    this.setCheckbox();
    this.tree.checkboxChange?.emit(this.node());
  }

  getVerticalLeft(i: number) {
    const spacing = XToCssPx(this.tree.spacing(), this.fontSize());
    return (i - 1) * spacing + spacing / 2;
  }

  setCheckbox() {
    if (!this.tree.levelCheck()) return;
    this.node().indeterminate = this.checked();
    this.node().children && this.setChildrenCheckbox(this.checked()!);
    const setParent = (node: XTreeNode) => {
      let parent = this.tree.nodes().find((x: XTreeNode) => x.id === node.pid);
      if (!parent || XIsEmpty(parent.children)) return;
      let checkedList = parent.children?.filter((y: XTreeNode) => y.checked);
      let indeterminateList = parent.children?.filter((y: XTreeNode) => y.indeterminate);
      parent.checked = checkedList?.length === parent.children?.length;
      parent.indeterminate = (checkedList as XTreeNode[]).length > 0 || (indeterminateList as XTreeNode[]).length > 0;
      parent.change && parent.change();
      setParent(parent);
    };
    setParent(this.node());
    this.cdr.detectChanges();
  }

  setChildrenCheckbox(checked: boolean) {
    const setChildren = (children: XTreeNode[], isChecked: boolean) => {
      if (XIsEmpty(children)) return;
      for (let x of children) {
        if (x.disabled) continue;
        x.checked = isChecked;
        x.indeterminate = isChecked;
        x.change && x.change();
        setChildren(x.children as XTreeNode[], isChecked);
      }
    };
    setChildren(this.node().children as XTreeNode[], checked);
    this.cdr.detectChanges();
  }

  setParentCheckbox() {
    if (XIsEmpty(this.node().children)) return;
    let checkedList = this.node().children?.filter((x) => x.checked);
    let indeterminateList = this.node().children?.filter((x) => x.indeterminate);
    this.node().checked = checkedList?.length === this.node().children?.length;
    this.node().indeterminate =
      (checkedList as XTreeNode[]).length > 0 || (indeterminateList as XTreeNode[]).length > 0;
    this.cdr.detectChanges();
  }

  setIndeterminate(node: XTreeNode) {
    const getChildren = (children: XTreeNode[]) => {
      if (XIsEmpty(children)) return;
      children.forEach((x) => {
        if (x.indeterminate || x.checked) {
          node.indeterminate = true;
          return;
        }
        getChildren(x.children as XTreeNode[]);
      });
    };
    getChildren(node.children as XTreeNode[]);
    this.cdr.detectChanges();
  }

  getNodeDisabled(disabled?: boolean) {
    return disabled as XBoolean;
  }

  onAction(event: Event, action: XTreeAction, node: XTreeNode) {
    action.handler && action.handler(node);
    event.stopPropagation();
  }

  onToggle(event: Event, node: XTreeNode) {
    this.toggle.emit(node);
    event?.preventDefault();
    event?.stopPropagation();
  }

  trackByItem(_index: number, item: XTreeNode) {
    return `${item.id}-${item.level}`;
  }

  trackByAction(_index: number, item: XTreeAction) {
    return item.id;
  }
}
