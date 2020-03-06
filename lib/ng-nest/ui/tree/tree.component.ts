import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { XTreePrefix, XTreeNode } from './tree.type';
import {
  XDataConvert,
  XData,
  XIsObservable,
  XToDataConvert,
  XIsEmpty,
  XInputBoolean,
  XIsFunction,
  XIsUndefined,
  XIsChange
} from '@ng-nest/ui/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: `${XTreePrefix}`,
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTreeComponent implements OnChanges {
  @Input() @XDataConvert() data?: XData<XTreeNode[]>;
  @Input() @XInputBoolean() checkbox?: boolean;
  @Input() expanded = [];
  @Input() checked = [];
  @Input() @XInputBoolean() expandedAll: boolean;
  @Input() labelTemp?: TemplateRef<void>;
  @Output() activatedChange = new EventEmitter<XTreeNode>();
  @Output() selectedChange = new EventEmitter<XTreeNode[]>();
  @ViewChild('tree', { static: true }) tree: ElementRef;
  nodes: XTreeNode[] = [];
  activatedNode: XTreeNode;
  lazy: boolean = false;
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.expandedAll) && this.setExpandedAll();
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
        this.cdr.detectChanges();
      });
    } else if (XIsFunction(this.data)) {
      this.lazy = true;
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Function)()
        .pipe(map(x => XToDataConvert(x)))
        .subscribe(x => {
          this.setDataChange(x);
          this.cdr.detectChanges();
        });
    } else {
      this.setDataChange(this.data as XTreeNode[]);
    }
  }

  private setDataChange(value: XTreeNode[]) {
    const getChildren = (node: XTreeNode, level: number) => {
      node.level = level;
      node.open = this.expandedAll || this.expanded.indexOf(node.id) >= 0;
      node.checked = this.checked.indexOf(node.id) >= 0 ? [node.id] : [];
      node.childrenLoaded = node.open;
      if (XIsUndefined(node.children)) node.children = value.filter(y => y.pid === node.id);
      if (XIsUndefined(node.leaf)) node.leaf = node.children.length > 0;
      if (node.leaf) node.children.map(y => getChildren(y, level + 1));
      return node;
    };
    this.nodes = value.filter(x => XIsEmpty(x.pid)).map(x => getChildren(x, 0));
  }

  getCheckedNodes(): XTreeNode[] {
    let result = [];
    const getChildren = (nodes: XTreeNode[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach(x => {
        if (!XIsEmpty(x.checked)) result = [...result, x];
        getChildren(x.children);
      });
    };
    getChildren(this.nodes);
    return result;
  }

  getCheckedKeys() {
    return this.getCheckedNodes().map(x => x.id);
  }

  setCheckedKeys(keys: any[] = []) {
    const setChildren = (nodes: XTreeNode[], clear = false) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach(x => {
        x.checked = !clear && keys.indexOf(x.id) >= 0 ? [x.id] : [];
        x.change && x.change(true);
        setChildren(x.children, clear);
      });
    };
    setChildren(this.nodes, keys.length === 0);
  }

  setExpandedAll() {
    const setChildren = (nodes: XTreeNode[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach(x => {
        x.open = this.expandedAll;
        x.change && x.change();
        setChildren(x.children);
      });
    };
    setChildren(this.nodes);
  }
}
