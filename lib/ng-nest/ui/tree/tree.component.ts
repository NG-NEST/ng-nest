import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Input
} from "@angular/core";
import { XTreePrefix, XTreeNode } from "./tree.type";
import {
  XDataConvert,
  XData,
  XIsObservable,
  XToDataConvert,
  XIsEmpty,
  XInputBoolean
} from "@ng-nest/ui/core";
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: `${XTreePrefix}`,
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeComponent implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XTreeNode[]>;
  @Input() @XInputBoolean() checkbox?: boolean;
  @ViewChild("tree", { static: true }) tree: ElementRef;
  nodes: XTreeNode[] = [];
  activatedNode: XTreeNode;
  private data$: Subscription | null = null;
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }

  private setData() {
    if (typeof this.data === "undefined") return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>)
        .pipe(map(x => XToDataConvert(x)))
        .subscribe(x => {
          this.setDataChange(x);
        });
    } else {
      this.setDataChange(this.data as XTreeNode[]);
    }
  }

  private setDataChange(value: XTreeNode[]) {
    let getChildren = (node: XTreeNode, level: number) => {
      node.level = level;
      node.children = value.filter(y => y.parentValue === node.value);
      node.hasChild = node.children.length > 0;
      if (node.hasChild) node.children.map(y => getChildren(y, level + 1));
      return node;
    };
    this.nodes = value
      .filter(x => XIsEmpty(x.parentValue))
      .map(x => getChildren(x, 0));
  }
}
