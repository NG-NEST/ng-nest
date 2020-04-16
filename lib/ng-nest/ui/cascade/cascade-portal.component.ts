import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  NgZone,
  Renderer2,
  OnDestroy
} from '@angular/core';
import { XCascadeNode } from './cascade.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'x-cascade-portal',
  templateUrl: './cascade-portal.component.html',
  styleUrls: ['./cascade-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCascadePortalComponent implements OnInit, OnDestroy {
  nodes: XCascadeNode[][] = [];
  datas: XCascadeNode[] = [];
  selecteds: XCascadeNode[] = [];
  value: any;
  valueChange: Subject<any>;
  closePortal: Function;
  nodeEmit: Function;
  values: XCascadeNode[] = [];
  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  constructor(private renderer: Renderer2, public ngZone: NgZone, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.init();
    this.valueChange$ = this.valueChange.subscribe((x) => {
      this.value = x;
      this.init();
      this.cdr.markForCheck();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          this.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this.valueChange$?.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    } else {
      this.values = [];
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    let node = this.datas.find((x) => x.id === this.value) as XCascadeNode;
    this.selecteds = [node];
    this.nodes = [this.datas.filter((x) => x.pid === node.pid)];
    console.log(this.nodes);
    while (!XIsEmpty(node.pid)) {
      node = this.datas.find((x) => x.id === node.pid) as XCascadeNode;
      this.selecteds = [node, ...this.selecteds];
      this.nodes = [this.datas.filter((x) => x.pid === node.pid), ...this.nodes];
    }
    this.values = this.selecteds.map((x) => x.id) as XCascadeNode[];
    console.log(this.values, this.nodes);
  }

  nodeClick(node: XCascadeNode) {
    const level = Number(node.level);
    this.ngZone.run(() => {
      if (node.leaf) {
        if (this.nodes.length === level) {
          this.nodes = [...this.nodes, node.children] as XCascadeNode[][];
          this.selecteds = [...this.selecteds, node];
        } else {
          if (this.nodes.length > Number(level) + 1) {
            this.nodes = this.nodes.splice(0, level + 1);
            this.selecteds = this.selecteds.splice(0, level + 1);
          }
          this.nodes[level + 1] = node.children as XCascadeNode[];
          this.selecteds[level] = node;
        }
        this.values = this.selecteds.map((x) => x.id);
        this.cdr.detectChanges();
      } else {
        if (this.selecteds.length === level + 1) {
          this.selecteds = this.selecteds.splice(0, level);
        }
        this.selecteds = [...this.selecteds, node];
        this.nodeEmit({
          node: node,
          label: this.selecteds.map((x) => x.label).join(` / `)
        });
      }
    });
  }
}
