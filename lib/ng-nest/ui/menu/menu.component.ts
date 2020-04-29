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
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { XMenuPrefix, XMenuNode, XMenuProperty } from './menu.property';
import { XClassMap, XIsChange, XIsEmpty, XSetData, XGetChildren } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';

@Component({
  selector: `${XMenuPrefix}`,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuComponent extends XMenuProperty implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  nodeClassMap: XClassMap = {};
  datas: XMenuNode[] = [];
  nodes: XMenuNode[] = [];
  rootIndex: number = 0;
  activated: XMenuNode;
  private _unSubject = new Subject<void>();

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
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

  onToggle(event: Event, node: XMenuNode) {
    if (!node.leaf) {
      this.activated = node;
    } else {
      event.stopPropagation();
      node.open = !node.open;
      if (node.open && !node.childrenLoaded) {
        node.childrenLoaded = true;
      }
    }
    this.nodeClick.emit(node);
    this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XMenuPrefix}-${this.layout}`] = this.layout ? true : false;
    this.nodeClassMap[`x-size-${this.size}`] = this.size ? true : false;
  }

  private setData() {
    XSetData<XMenuNode>(this.data, this._unSubject).subscribe((x) => {
      this.datas = x;
      this.nodes = x.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XMenuNode>(x, y, 0));
      this.cdr.detectChanges();
    });
  }

  private getRoot(value: XMenuNode) {
    let root = value;
    const getParent = (node: XMenuNode) => {
      const parent = this.datas.find((x) => node.pid === x.id) as XMenuNode;
      if (XIsEmpty(parent?.pid)) root = parent;
      else getParent(parent);
    };
    if (!XIsEmpty(value.pid)) getParent(value);
    return root;
  }
}
