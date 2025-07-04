import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
  TemplateRef,
  input,
  output,
  model,
  signal,
  inject,
  DestroyRef,
  OnInit
} from '@angular/core';
import { XCascadeNode, XCascadeNodeTrigger } from './cascade.property';
import { XIsEmpty, XConnectBaseAnimation, XPositionTopBottom } from '@ng-nest/ui/core';
import { of, Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { XInputComponent } from '@ng-nest/ui/input';
import { XListComponent } from '@ng-nest/ui/list';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'x-cascade-portal',
  imports: [FormsModule, XListComponent],
  templateUrl: './cascade-portal.component.html',
  styleUrls: ['./cascade-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XCascadePortalComponent implements OnInit {
  @HostBinding('@x-connect-base-animation') public get getPlacement() {
    return this.placement();
  }
  @HostListener('@x-connect-base-animation.done', ['$event']) done() {
    if (this.destroy()) return;
    this.animating.emit(false);
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    if (this.destroy()) return;
    this.animating.emit(true);
  }

  value = input<any>();
  placement = input<XPositionTopBottom>();
  nodeTpl = input<TemplateRef<any>>();
  inputCom = input<XInputComponent>();
  nodeTrigger = input<XCascadeNodeTrigger>();
  nodeHoverDelay = input<number>(200);
  portalMaxHeight = input<string>('');
  portalHeight = input<string>('');
  portalWidth = input<string>('');
  nodes = model<XCascadeNode[][]>([]);
  datas = input<XCascadeNode[]>([]);

  animating = output<boolean>();
  nodeClick = output<{ node: XCascadeNode; nodes: XCascadeNode[]; label: string }>();
  selecteds = signal<XCascadeNode[]>([]);
  values = signal<XCascadeNode[]>([]);
  destroy = signal(false);

  private unSubject = new Subject<void>();
  private hoverDelayUnSub = new Subject<void>();
  private destroyRef = inject(DestroyRef);

  valueChanged = toObservable(this.value)
    .pipe(
      tap(() => this.init()),
      takeUntil(this.unSubject)
    )
    .subscribe();

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
      this.hoverDelayUnSub.next();
      this.hoverDelayUnSub.complete();
      this.unSubject.next();
      this.unSubject.complete();
    });
  }

  init() {
    if (!XIsEmpty(this.value())) {
      this.setDefault();
    } else {
      this.values.set([]);
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    let node = this.datas().find((x) => x.id === this.value()) as XCascadeNode;
    this.selecteds.set([node]);
    this.nodes.set([this.datas().filter((x) => x.pid === node.pid)]);
    while (!XIsEmpty(node.pid)) {
      node = this.datas().find((x) => x.id === node.pid) as XCascadeNode;
      this.selecteds.set([node, ...this.selecteds()]);
      this.nodes.set([this.datas().filter((x) => x.pid === node.pid), ...this.nodes()]);
    }
    this.values.set(this.selecteds().map((x) => x.id) as XCascadeNode[]);
  }

  nodeMouseenter(node: XCascadeNode) {
    of(true)
      .pipe(delay(this.nodeHoverDelay()), takeUntil(this.hoverDelayUnSub))
      .subscribe(() => this.nodeExpansion(node, false));
  }

  nodeMouseleave() {
    this.hoverDelayUnSub.next();
  }

  onNodeClick(node: XCascadeNode) {
    this.nodeExpansion(node);
  }

  nodeExpansion(node: XCascadeNode, click = true) {
    const level = Number(node.level);
    if (node.leaf) {
      if (this.nodes().length === level) {
        this.nodes.set([...this.nodes(), node.children] as XCascadeNode[][]);
        this.selecteds.set([...this.selecteds(), node]);
      } else {
        if (this.nodes.length > Number(level) + 1) {
          this.nodes.set(this.nodes().splice(0, level + 1));
          this.selecteds.set(this.selecteds().splice(0, level + 1));
        }
        this.nodes()[level + 1] = node.children as XCascadeNode[];
        this.nodes.update((x) => {
          x[level + 1] = node.children as XCascadeNode[];
          if (x.length > level + 1) {
            x.splice(level + 2, x.length);
          }
          return x;
        });
        this.selecteds()[level] = node;
      }
      this.values.set(this.selecteds().map((x) => x.id));
    } else if (click) {
      if (this.selecteds().length >= level + 1) {
        this.selecteds.set(this.selecteds().splice(0, level));
      }
      this.selecteds.set([...this.selecteds(), node]);
      this.nodeClick.emit({
        node: node,
        nodes: this.selecteds(),
        label: this.selecteds()
          .map((x) => x.label)
          .join(` / `)
      });
    }
  }
}
