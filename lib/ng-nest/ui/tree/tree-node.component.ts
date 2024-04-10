import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
  inject
} from '@angular/core';
import { XTreeNodePrefix, XTreeNode, XTreeNodeProperty, XTreeAction } from './tree.property';
import { XIsEmpty, XConfigService, XBoolean } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XTreeService } from './tree.service';
import { NgStyle } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { FormsModule } from '@angular/forms';
import { XKeywordDirective } from '@ng-nest/ui/keyword';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';

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
  @Input() tree: any;
  @Output() nodeMouseenter = new EventEmitter<{ event: MouseEvent; node: XTreeNode; ele: ElementRef }>();
  @HostBinding('class.x-tree-node') rootClass = true;

  private _loading = false;
  public get loading() {
    return this._loading;
  }
  public set loading(value) {
    this._loading = value;
    this.cdr.detectChanges();
  }

  private _unSubject = new Subject<void>();
  get showDragIndicator() {
    return this.tree.dragging && this.tree.hoverTreeNode?.id === this.node.id;
  }

  @HostListener('mouseenter', ['$event']) onMouseenter(event: MouseEvent) {
    this.nodeMouseenter.emit({ event: event, node: this.node, ele: this.elementRef });
  }

  @HostListener('mouseleave') onMouseleave(_event: MouseEvent) {
    if (!this.tree.dragging) return;
    this.tree.hoverTreeNode?.change && this.tree.hoverTreeNode?.change();
    this.cdr.detectChanges();
  }

  get isChildrenLast() {
    let parent = this.tree.nodes.find((x: XTreeNode) => x.id === this.node.pid);
    if (!parent) return false;
    const index = parent.children.indexOf(this.node);
    return index + 1 === parent.children.length;
  }

  get isParentLast() {
    let parents = this.treeService.getParents(this.tree.nodes, this.node);
    if (parents.length <= 1) return [];
    const res: boolean[] = [];
    parents.reduce((pre: XTreeNode, curr: XTreeNode) => {
      if (pre === null) return curr;
      const index = curr.children?.indexOf(pre)!;
      res.push(index + 1 === curr.children?.length!);
      return curr;
    });

    return res.reverse();
  }

  get numLevel() {
    return Number(this.level);
  }

  get verticalLevel() {
    if (this.numLevel > 0) {
      return Array.from({ length: this.numLevel }).map((_x, index) => index + 1);
    } else {
      return [];
    }
  }

  get verticalWidth() {
    return Number(this.tree.spacing) / 2;
  }

  get paddingLeft() {
    return Number(this.node?.level ? this.node.level : 0) * Number(this.tree.spacing);
  }

  get indicatorWidth() {
    return `calc(100% - ${this.paddingLeft + (this.node.leaf ? 1.5 : 0)}rem)`;
  }

  get indicatorStyle() {
    if (this.tree.dragPosition === 1) {
      return { bottom: `${-0.0625}rem` };
    } else if (this.tree.dragPosition === -1) {
      return { top: `${-0.0625}rem` };
    }
    return {};
  }

  get getActivated() {
    if (this.tree.multiple) {
      if (this.tree.objectArray) {
        return this.tree.activatedId?.map((x: XTreeNode) => x.id).includes(this.node.id);
      } else {
        return this.tree.activatedId?.includes(this.node.id);
      }
    } else {
      return this.tree.activatedId === this.node.id;
    }
  }

  private cdr = inject(ChangeDetectorRef);
  private treeService = inject(XTreeService);
  elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.node.change = (check: boolean) => {
      if (check) this.setCheckbox();
      this?.cdr.detectChanges();
    };
    this.level = this.node?.level ? this.node.level : 0;
    if (!this.tree.levelCheck) return;
    if (this.node.checked) this.setCheckbox();
    this.setIndeterminate(this.node);
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.complete();
  }

  onActivate(event: Event, node: XTreeNode) {
    const change: Function = this.tree.activatedNode?.change as Function;
    this.tree.nodeOpen && !node.leaf && this.tree.onToggle(event, node);
    const onChange = () => {
      change && change();
      event.preventDefault();
      event.stopPropagation();
      this.cdr.detectChanges();
    };
    if (this.tree.onlyLeaf && !node.leaf) {
      onChange();
      return;
    }
    if (this.tree.multiple) {
      if (!this.tree.activatedId) this.tree.activatedId = [];
      if (this.tree.objectArray) {
        const ids = this.tree.activatedId.map((x: XTreeNode) => x.id);
        if (ids.includes(node.id)) {
          this.tree.activatedId.splice(ids.indexOf(node.id), 1);
        } else {
          this.tree.activatedId.push(node);
        }
      } else {
        if (this.tree.activatedId.includes(node.id)) {
          this.tree.activatedId.splice(this.tree.activatedId.indexOf(node.id), 1);
        } else {
          this.tree.activatedId.push(node.id);
        }
      }
    } else {
      this.tree.activatedId = node.id;
    }
    if (this.tree.activatedNode) {
      if (this.tree.activatedNode.id === node.id && !this.tree.allowManyActivated) return;
    }
    this.tree.activatedNode = node;
    this.tree.activatedIdChange.emit(this.tree.activatedId);
    this.tree.activatedChange.emit(node);
    this.tree.nodeClick.emit(node);
    onChange();
  }

  onCheckboxChange() {
    this.setCheckbox();
    this.tree.checkboxChange.emit(this.node);
  }

  getVerticalLeft(i: number) {
    return (i - 1) * Number(this.tree.spacing) + Number(this.tree.spacing) / 2;
  }

  setCheckbox() {
    if (!this.tree.levelCheck) return;
    this.node.indeterminate = this.node.checked;
    this.node.children && this.setChildrenCheckbox(this.node.checked as boolean);
    const setParent = (node: XTreeNode) => {
      let parent = this.tree.nodes.find((x: XTreeNode) => x.id === node.pid);
      if (!parent || XIsEmpty(parent.children)) return;
      let checkedList = parent.children?.filter((y: XTreeNode) => y.checked);
      let indeterminateList = parent.children?.filter((y: XTreeNode) => y.indeterminate);
      parent.checked = checkedList?.length === parent.children?.length;
      parent.indeterminate = (checkedList as XTreeNode[]).length > 0 || (indeterminateList as XTreeNode[]).length > 0;
      parent.change && parent.change();
      setParent(parent);
    };
    setParent(this.node);
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
    setChildren(this.node.children as XTreeNode[], checked);
    this.cdr.detectChanges();
  }

  setParentCheckbox() {
    if (XIsEmpty(this.node.children)) return;
    let checkedList = this.node.children?.filter((x) => x.checked);
    let indeterminateList = this.node.children?.filter((x) => x.indeterminate);
    this.node.checked = checkedList?.length === this.node.children?.length;
    this.node.indeterminate = (checkedList as XTreeNode[]).length > 0 || (indeterminateList as XTreeNode[]).length > 0;
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

  trackByItem(_index: number, item: XTreeNode) {
    return `${item.id}-${item.level}`;
  }

  trackByAction(_index: number, item: XTreeAction) {
    return item.id;
  }
}
