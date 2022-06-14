import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostBinding,
  Input
} from '@angular/core';
import { XTreeNodePrefix, XTreeNode, XTreeNodeProperty, XTreeAction } from './tree.property';
import { XIsEmpty, XConfigService, XBoolean } from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: `${XTreeNodePrefix}, [${XTreeNodePrefix}]`,
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeNodeComponent extends XTreeNodeProperty implements OnInit {
  @Input() parent!: XTreeNodeComponent;
  @Input() tree: any;
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
    return Number(this.node?.level ? this.node.level : 0) * Number(this.tree.spacing);
  }

  constructor(
    // @Optional() public tree: XTreeComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.node.change = (check: boolean) => {
      if (check) this.setCheckbox();
      this.cdr.detectChanges();
    };
    this.level = this.node?.level ? this.node.level : 0;
    if (!this.tree.levelCheck) return;
    if (this.node.checked) this.setCheckbox();
    this.setIndeterminate(this.node);
  }

  onToggle(event: Event, node: XTreeNode) {
    node.open = !node.open;
    if (this.virtualScroll) {
      if (this.lazy && !node.childrenLoaded) {
        this.getLazyData(node, () => this.virtualToggle(node));
      } else {
        this.virtualToggle(node);
      }
    } else if (node.open && !node.childrenLoaded) {
      if (this.lazy) {
        this.getLazyData(node);
      } else {
        node.childrenLoaded = true;
      }
    }
    event.preventDefault();
    event.stopPropagation();
    this.cdr.detectChanges();
  }

  virtualToggle(node: XTreeNode) {
    let index = this.tree.nodes.indexOf(node);
    if (node.open) {
      let addNodes: XTreeNode[] = [];
      const getNodes = (nd: XTreeNode) => {
        for (let child of nd.children!) {
          addNodes.push(child);
          child.open && getNodes(child);
        }
      };
      getNodes(node);
      this.tree.nodes.splice(index + 1, 0, ...addNodes);
    } else {
      let delCount = 0;
      const getCount = (nd: XTreeNode) => {
        delCount += nd.children!.length;
        for (let child of nd.children!) {
          child.open && getCount(child);
        }
      };
      getCount(node);
      this.tree.nodes.splice(index + 1, delCount);
    }
    this.tree.nodes = [...this.tree.nodes];
  }

  getLazyData(node: XTreeNode, callBack?: () => void) {
    this.loading = true;
    (this.lazyData as (pid?: any) => Observable<XTreeNode[]>)(node.id)
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
        if (callBack) callBack();
        this.cdr.detectChanges();
      });
  }

  onActivate(event: Event, node: XTreeNode) {
    const change: Function = this.tree.activatedNode?.change as Function;
    this.tree.nodeOpen && node.leaf && this.onToggle(event, node);
    if (this.tree.activatedNode) {
      if (this.tree.activatedNode.id === node.id && !this.tree.allowManyActivated) return;
    }
    this.tree.activatedNode = node;
    this.tree.activatedChange.emit(node);
    change && change();
    event.stopPropagation();
    this.cdr.detectChanges();
  }

  onCheckboxChange() {
    this.setCheckbox();
    this.tree.checkboxChange.emit(this.node);
  }

  setCheckbox() {
    if (!this.tree.levelCheck) return;
    this.node.indeterminate = this.node.checked;
    this.node.children && this.setChildrenCheckbox(this.node.checked as boolean);
    if (this.virtualScroll) {
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
    } else {
      this.parent?.setParentCheckbox();
    }
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

  getNodeDisabled(disabled?: boolean) {
    return disabled as XBoolean;
  }

  onAction(event: Event, action: XTreeAction, node: XTreeNode) {
    action.handler && action.handler(node);
    event.stopPropagation();
  }

  trackByItem(_index: number, item: XTreeAction | XTreeNode) {
    return item.id;
  }
}
