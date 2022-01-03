import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  NgZone,
  OnDestroy,
  HostBinding,
  HostListener,
  TemplateRef
} from '@angular/core';
import { XCascadeNode, XCascadeNodeTrigger } from './cascade.property';
import { XIsEmpty, XConnectBaseAnimation, XPositionTopBottom } from '@ng-nest/ui/core';
import { of, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'x-cascade-portal',
  templateUrl: './cascade-portal.component.html',
  styleUrls: ['./cascade-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XCascadePortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    this.animating(true);
  }

  nodes: XCascadeNode[][] = [];
  datas: XCascadeNode[] = [];
  selecteds: XCascadeNode[] = [];
  value: any;
  valueChange!: Subject<any>;
  positionChange!: Subject<any>;
  closePortal!: Function;
  destroyPortal!: Function;
  animating!: Function;
  nodeEmit!: Function;
  values: XCascadeNode[] = [];
  nodeTpl!: TemplateRef<any>;
  nodeTrigger!: XCascadeNodeTrigger;
  nodeHoverDelay!: number;
  hoverDelayUnSub = new Subject<void>();
  inputCom!: XInputComponent;
  private _unSubject = new Subject<void>();

  constructor(public ngZone: NgZone, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.init();
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.value = x;
      this.init();
      this.cdr.detectChanges();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
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
    while (!XIsEmpty(node.pid)) {
      node = this.datas.find((x) => x.id === node.pid) as XCascadeNode;
      this.selecteds = [node, ...this.selecteds];
      this.nodes = [this.datas.filter((x) => x.pid === node.pid), ...this.nodes];
    }
    this.values = this.selecteds.map((x) => x.id) as XCascadeNode[];
  }

  nodeMouseenter(node: XCascadeNode) {
    of(true)
      .pipe(delay(this.nodeHoverDelay), takeUntil(this.hoverDelayUnSub))
      .subscribe(() => this.nodeExpansion(node, false));
  }

  nodeMouseleave() {
    this.hoverDelayUnSub.next();
  }

  nodeClick(node: XCascadeNode) {
    this.nodeExpansion(node);
  }

  nodeExpansion(node: XCascadeNode, click = true) {
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
      } else if (click) {
        if (this.selecteds.length >= level + 1) {
          this.selecteds = this.selecteds.splice(0, level);
        }
        this.selecteds = [...this.selecteds, node];
        this.nodeEmit({
          node: node,
          nodes: this.selecteds,
          label: this.selecteds.map((x) => x.label).join(` / `)
        });
      }
    });
  }
}
