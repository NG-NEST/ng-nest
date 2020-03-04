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
  Input,
  HostBinding,
  Optional,
  Host,
  ViewChildren,
  QueryList
} from "@angular/core";
import { XTreeNodePrefix, XTreeNode } from "./tree.type";
import { XTreeComponent } from "./tree.component";
import { XIsEmpty } from "@ng-nest/ui/core";

@Component({
  selector: `${XTreeNodePrefix}, [${XTreeNodePrefix}]`,
  templateUrl: "./tree-node.component.html",
  styleUrls: ["./tree-node.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeNodeComponent implements OnInit, OnChanges {
  @Input() node: XTreeNode = {};
  @Input() parent: XTreeNodeComponent;
  @HostBinding("class.x-tree-node") rootClass = true;
  constructor(
    @Optional() public tree: XTreeComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.node.change = () => this.cdr.detectChanges();
  }

  ngOnChanges(simple: SimpleChanges) {
    let nodeChange = simple.node;
    if (nodeChange && nodeChange.currentValue !== nodeChange.previousValue) {
    }
  }

  onToggle(event: Event, node: XTreeNode) {
    event.stopPropagation();
    node.open = !node.open;
    if (node.open && !node.childrenLoaded) {
      node.childrenLoaded = true;
    }
    this.cdr.detectChanges();
  }

  onActivate(event: Event, node: XTreeNode) {
    let change: Function;
    if (this.tree.activatedNode) {
      change = this.tree.activatedNode.change;
    }
    this.tree.activatedNode = node;
    this.cdr.detectChanges();
    if (change) change();
  }

  onCheckboxChange() {
    this.node.children && this.setChildrenCheckbox(this.node.checked);
    this.parent && this.parent.setParentCheckbox(this.node.checked);
  }

  setChildrenCheckbox(checked: any[]) {
    const setChildren = (children: XTreeNode[], isChecked: boolean) => {
      if (XIsEmpty(children)) return;
      children.forEach(x => {
        x.checked = isChecked ? [x.value] : [];
        x.indeterminate = isChecked;
        if (x.change) x.change();
        setChildren(x.children, isChecked);
      });
    };
    setChildren(this.node.children, !XIsEmpty(checked));
    this.node.indeterminate = !XIsEmpty(checked);
    this.cdr.detectChanges();
  }

  setParentCheckbox(checked: any[]) {
    if (XIsEmpty(this.node.children)) return;
    let checkedList = this.node.children.filter(x => !XIsEmpty(x.checked));
    let indeterminateList = this.node.children.filter(x => x.indeterminate);
    this.node.checked =
      checkedList.length === this.node.children.length ? [this.node.value] : [];
    this.node.indeterminate =
      checkedList.length > 0 || indeterminateList.length > 0;
    this.parent && this.parent.setParentCheckbox(this.node.checked);
    this.cdr.detectChanges();
  }
}
