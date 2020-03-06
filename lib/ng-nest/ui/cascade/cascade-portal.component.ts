import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  NgZone,
  Renderer2,
  OnDestroy
} from '@angular/core';
import { XCascadeNode, XCascadePortal } from './cascade.type';
import { XIsEmpty, removeNgTag } from '@ng-nest/ui/core';
import { Subscription } from 'rxjs';

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
  values = [];
  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(XCascadePortal) public option: any,
    public ngZone: NgZone,
    public cdr: ChangeDetectorRef
  ) {
    this.datas = this.option.datas;
    this.init();
  }

  ngOnInit(): void {
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
      this.init();
      this.cdr.markForCheck();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          this.option.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  init() {
    if (!XIsEmpty(this.option.value)) {
      this.setDefault();
    } else {
      this.nodes = [this.option.nodes];
      this.values = [];
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    let node = this.datas.find(x => x.id === this.option.value);
    this.selecteds = [node];
    this.nodes = [this.datas.filter(x => x.pid === node.pid)];
    while (!XIsEmpty(node.pid)) {
      node = this.datas.find(x => x.id === node.pid);
      this.selecteds = [node, ...this.selecteds];
      this.nodes = [this.datas.filter(x => x.pid === node.pid), ...this.nodes];
    }
    this.values = this.selecteds.map(x => x.id);
  }

  nodeClick(node: XCascadeNode) {
    this.ngZone.run(() => {
      if (node.leaf) {
        if (this.nodes.length === node.level) {
          this.nodes = [...this.nodes, node.children];
          this.selecteds = [...this.selecteds, node];
        } else {
          if (this.nodes.length > node.level + 1) {
            this.nodes = this.nodes.splice(0, node.level + 1);
            this.selecteds = this.selecteds.splice(0, node.level + 1);
          }
          this.nodes[node.level + 1] = node.children;
          this.selecteds[node.level] = node;
        }
        this.values = this.selecteds.map(x => x.id);
        this.cdr.detectChanges();
      } else {
        if (this.selecteds.length === node.level + 1) {
          this.selecteds = this.selecteds.splice(0, node.level);
        }
        this.selecteds = [...this.selecteds, node];
        this.option.nodeEmit({
          node: node,
          label: this.selecteds.map(x => x.label).join(` / `)
        });
      }
    });
  }
}
