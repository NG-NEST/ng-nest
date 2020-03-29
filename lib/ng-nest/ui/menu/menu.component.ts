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
  OnDestroy,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { XMenuPrefix, XMenuLayout, XMenuNode, XMenuTrigger } from './menu.type';
import { XClassMap, XDataConvert, XData, XIsChange, XIsObservable, XToDataConvert, XSize, XIsEmpty } from '@ng-nest/ui/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XMenuPrefix}`,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() @XDataConvert() data: XData<XMenuNode[]>;
  @Input() layout: XMenuLayout = 'row';
  @Input() size: XSize = 'medium';
  @Input() trigger: XMenuTrigger = 'hover';
  @Input() nodeTpl: TemplateRef<any>;
  @Output() nodeClick = new EventEmitter<XMenuNode>();
  classMap: XClassMap = {};
  nodeClassMap: XClassMap = {};
  datas: XMenuNode[] = [];
  nodes: XMenuNode[] = [];
  rootIndex: number = 0;
  private unSubject = new Subject();

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.unsubscribe();
  }

  onNodeClick(node: XMenuNode) {
    this.rootIndex = this.nodes.indexOf(this.getRoot(node));
    this.nodeClick.emit(node);
    this.cdr.detectChanges();
  }

  rootIndexChange(index: number) {
    this.rootIndex = index;
    this.nodeClick.emit(this.nodes[index]);
    this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XMenuPrefix}-${this.layout}`] = this.layout ? true : false;
    this.nodeClassMap[`x-size-${this.size}`] = this.size ? true : false;
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      (this.data as Observable<any>)
        .pipe(
          map(x => XToDataConvert(x)),
          takeUntil(this.unSubject)
        )
        .subscribe(x => {
          this.setDataChange(x);
        });
    } else {
      this.setDataChange(this.data as XMenuNode[]);
    }
  }

  private setDataChange(value: XMenuNode[]) {
    this.datas = value;
    const getChildren = (node: XMenuNode, level: number) => {
      node.level = level;
      node.children = value.filter(y => y.pid === node.id);
      node.leaf = node.children.length > 0;
      if (node.leaf) node.children.map(y => getChildren(y, level + 1));
      return node;
    };
    this.nodes = value.filter(x => XIsEmpty(x.pid)).map(x => getChildren(x, 0));
    this.cdr.detectChanges();
  }

  private getRoot(value: XMenuNode) {
    let root = value;
    const getParent = (node: XMenuNode) => {
      const parent = this.datas.find(x => node.pid === x.id);
      if (XIsEmpty(parent?.pid)) root = parent;
      else getParent(parent);
    };
    if (!XIsEmpty(value.pid)) getParent(value);
    return root;
  }
}
