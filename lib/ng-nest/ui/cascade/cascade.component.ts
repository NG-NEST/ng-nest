import { XCascadePortalComponent } from './cascade-portal.component';
import { Subject, fromEvent } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  inject,
  AfterViewInit,
  OnDestroy,
  viewChild,
  signal,
  computed,
  ComponentRef,
  effect
} from '@angular/core';
import { XCascadeNode, XCascadeProperty } from './cascade.property';
import { XIsEmpty, XIsChange, XSetData, XGetChildren, XCorner, XParents, XPlacement } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import {
  Overlay,
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayRef
} from '@angular/cdk/overlay';
import { filter, takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { DOCUMENT } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'x-cascade',
  imports: [FormsModule, ReactiveFormsModule, XInputComponent],
  templateUrl: './cascade.component.html',
  styleUrls: ['./cascade.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCascadeComponent)]
})
export class XCascadeComponent extends XCascadeProperty implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  cascade = viewChild.required('cascade', { read: ElementRef<HTMLElement> });
  inputCom = viewChild.required('inputCom', { read: XInputComponent });

  clearable = signal(false);
  enter = signal(false);
  animating = signal(false);
  datas = signal<XCascadeNode[]>([]);
  nodes = signal<XCascadeNode[]>([]);
  portal!: XPortalOverlayRef<XCascadePortalComponent>;
  icon = signal('fto-chevron-down');
  displayValue = computed(() => {
    let node = this.datas().find((x) => x.id === this.value()) as XCascadeNode;
    if (XIsEmpty(node)) {
      return '';
    } else {
      let selecteds = [node];
      while (!XIsEmpty(node.pid)) {
        node = this.datas().find((x) => x.id === node.pid) as XCascadeNode;
        selecteds = [node, ...selecteds];
      }
      return selecteds.map((x) => x.label).join(` / `);
    }
  });
  valueTplContextSignal = computed(() => {
    if (this.valueTplContext()) return this.valueTplContext();
    let node = this.datas().find((x) => x.id === this.value()) as XCascadeNode;
    if (XIsEmpty(node)) {
      return { $node: null, $nodes: null, $isValue: true };
    } else {
      let selecteds = [node];
      while (!XIsEmpty(node.pid)) {
        node = this.datas().find((x) => x.id === node.pid) as XCascadeNode;
        selecteds = [node, ...selecteds];
      }
      return {
        $node: node,
        $nodes: selecteds,
        $isValue: true
      };
    }
  });
  closeSubject: Subject<void> = new Subject();
  private unSubject = new Subject<void>();
  private document = inject(DOCUMENT);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);

  private realPlacement = signal<XPlacement | null>(null);
  portalComponent = signal<ComponentRef<XCascadePortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('value', this.value()));
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
    effect(() => this.portalComponent()?.setInput('nodeTpl', this.nodeTpl()));
    effect(() => this.portalComponent()?.setInput('inputCom', this.inputCom()));
    effect(() => this.portalComponent()?.setInput('datas', this.datas()));
    effect(() => this.portalComponent()?.setInput('nodes', [this.nodes()]));
    effect(() => this.portalComponent()?.setInput('nodeTrigger', this.nodeTrigger()));
    effect(() => this.portalComponent()?.setInput('nodeHoverDelay', this.nodeHoverDelay()));
  }

  ngOnInit() {
    this.setSubject();
    this.setParantScroll();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  setData() {
    XSetData<XCascadeNode>(this.data(), this.unSubject).subscribe((x) => {
      this.datas.set(x);
      this.nodes.set(x.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XCascadeNode>(x, y, 0)));
      this.setPortal();
    });
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
    });
  }

  setParantScroll() {
    if (!this.document) return;
    const parents = XParents(this.elementRef.nativeElement);
    let firstScroll: HTMLElement | null = null;
    for (let item of parents) {
      if (item.clientHeight < item.scrollHeight) {
        firstScroll = item;
        break;
      }
    }
    if (firstScroll && firstScroll.tagName !== 'BODY') {
      fromEvent(firstScroll, 'scroll')
        .pipe(
          filter(() => this.portalAttached()!),
          takeUntil(this.unSubject)
        )
        .subscribe(() => {
          this.portal?.overlayRef?.updatePosition();
          const eract = this.elementRef.nativeElement.getBoundingClientRect();
          const frect = firstScroll!.getBoundingClientRect();
          if (eract.top + eract.height - frect.top < 0 || eract.bottom > frect.bottom) {
            this.closeSubject.next();
          }
        });
    }
  }

  menter() {
    if (this.disabledComputed()) return;
    this.enter.set(true);
    if (!XIsEmpty(this.value())) {
      this.icon.set('');
      this.clearable.set(true);
    }
  }

  mleave() {
    if (this.disabledComputed()) return;
    this.enter.set(false);
    if (this.clearable()) {
      this.icon.set('fto-chevron-down');
      this.clearable.set(false);
    }
  }

  clearEmit() {
    this.value.set('');
    this.mleave();
    if (this.onChange) this.onChange(this.value());
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active.set(false);
      return true;
    }
    return false;
  }

  showPortal() {
    if (this.disabledComputed() || this.animating()) return;
    this.active.set(true);
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XCascadePortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.closeSubject.next();
      });
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this.unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XCorner;
      if (place !== this.realPlacement()) {
        this.realPlacement.set(place);
        this.portalOverlayRef()?.updatePosition();
      }
    });
  }

  setInstance() {
    let { componentRef, overlayRef } = this.portal;
    if (!componentRef || !overlayRef) return;
    this.portalComponent.set(componentRef);
    this.portalOverlayRef.set(overlayRef);
    this.realPlacement.set(this.placement());

    const { nodeClick, animating } = componentRef.instance;
    nodeClick.subscribe((node: { node: XCascadeNode; nodes: XCascadeNode[]; label: string }) => this.onNodeClick(node));
    animating.subscribe((ing: boolean) => this.animating.set(ing));
  }

  onNodeClick(selected: { node: XCascadeNode; nodes: XCascadeNode[]; label: string }) {
    this.value.set(selected.node.id);
    this.closeSubject.next();
    this.inputCom().inputFocus();
    if (this.onChange) this.onChange(this.value());
    this.formControlValidator();
    this.nodeEmit.emit(selected);
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom().inputRef(),
      placement: [this.placement() as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-cascade-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portalOverlayRef()?.updatePositionStrategy(this.setPlacement());
  }
}
