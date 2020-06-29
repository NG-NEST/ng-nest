import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostBinding,
  Optional,
  Input
} from '@angular/core';
import { XTreeNodePrefix, XTreeNode, XTreeNodeProperty, XTreeAction } from './tree.property';
import { XTreeComponent } from './tree.component';
import { XIsEmpty } from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';

@Component({
  selector: `${XTreeNodePrefix}, [${XTreeNodePrefix}]`,
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeNodeComponent extends XTreeNodeProperty implements OnInit {
  @Input() parent: XTreeNodeComponent;
  @HostBinding('class.x-tree-node') rootClass = true;
  private _loading = false;
  public get loading() {
    return this._loading;
  }
  public set loading(value) {
    this._loading = value;
    this.cdr.detectChanges();
  }

  get paddingLeft() {
    return Number(this.level) * Number(this.tree.spacing);
  }

  constructor(
    @Optional() public tree: XTreeComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.node.change = (check: boolean) => {
      if (check) this.onCheckboxChange();
      this.cdr.detectChanges();
    };
    this.level = this.node?.level ? this.node.level : 0;
    if (this.node.checked) this.onCheckboxChange();
    this.setIndeterminate(this.node);
  }

  onToggle(event: Event, node: XTreeNode) {
    node.open = !node.open;
    if (node.open && !node.childrenLoaded) {
      if (this.lazy) {
        this.loading = true;
        this.lazyData(node.id)
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
            this.loading = false;
            this.cdr.detectChanges();
          });
      } else {
        node.childrenLoaded = true;
      }
    }
    event.preventDefault();
    event.stopPropagation();
    this.cdr.detectChanges();
  }

  onActivate(event: Event, node: XTreeNode) {
    const change: Function = this.tree.activatedNode?.change as Function;
    this.tree.nodeOpen && node.leaf && this.onToggle(event, node);
    if (this.tree.activatedNode) {
      if (this.tree.activatedNode.id === node.id) return;
    }
    this.tree.activatedNode = node;
    this.tree.activatedChange.emit(node);
    change && change();
    event.stopPropagation();
    this.cdr.detectChanges();
  }

  onCheckboxChange() {
    this.node.indeterminate = this.node.checked;
    this.node.children && this.setChildrenCheckbox(this.node.checked as boolean);
    this.parent?.setParentCheckbox();
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
    this.parent?.setParentCheckbox();
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

  onAction(event: Event, action: XTreeAction, node: XTreeNode) {
    action.handler && action.handler(node);
    event.stopPropagation();
  }
}
