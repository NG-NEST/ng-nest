import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  Output,
  EventEmitter
} from '@angular/core';
import { XTreeNodePrefix, XTreeNode, XTreeNodeProperty, XTreeAction } from './tree.property';
import { XIsEmpty, XConfigService, XBoolean } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';

@Component({
  selector: `${XTreeNodePrefix}, [${XTreeNodePrefix}]`,
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

  get paddingLeft() {
    return Number(this.node?.level ? this.node.level : 0) * Number(this.tree.spacing);
  }

  get indicatorWidth() {
    return `calc(100% - ${this.paddingLeft + (this.node.leaf ? 1.5 : 0)}rem)`;
  }

  get indicatorStyle() {
    if (this.tree.dragPosition === 1) {
      return { bottom: `${-0.125}rem` };
    } else if (this.tree.dragPosition === -1) {
      return { top: `${-0.125}rem` };
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

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public ngZone: NgZone
  ) {
    super();
  }

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
