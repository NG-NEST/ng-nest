import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  HostListener,
  ViewContainerRef,
  HostBinding,
  input,
  output,
  model,
  signal,
  inject,
  ComponentRef,
  effect,
  DestroyRef,
  viewChild,
  computed
} from '@angular/core';
import { XDropdownPortalPrefix, XDropdownNode, XDropdownTrigger } from './dropdown.property';
import { XPortalConnectedPosition, XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XConnectBaseAnimation, XPositionTopBottom, XSize } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ConnectedOverlayPositionChange,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { XListComponent } from '@ng-nest/ui/list';
import { FormsModule } from '@angular/forms';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

@Component({
  selector: `${XDropdownPortalPrefix}`,
  imports: [FormsModule, XListComponent],
  templateUrl: './dropdown-portal.component.html',
  styleUrls: ['./dropdown-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XDropdownPortalComponent {
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

  data = input<XDropdownNode[]>([]);
  trigger = input<XDropdownTrigger>('hover');
  placement = input<XPositionTopBottom>();
  size = input<XSize>('medium');
  minWidth = input<string>();
  maxWidth = input<string>();
  minHeight = input<string>();
  maxHeight = input<string>();
  level = input(0);
  parentPortalComponent = input<XDropdownPortalComponent>();
  isKeyboardControlled = model(true);
  closed = output();
  animating = output<boolean>();
  nodeClick = output<XDropdownNode>();
  portalHover = output<boolean>();
  portal!: XPortalOverlayRef<XDropdownPortalComponent>;
  node = signal<XDropdownNode | null>(null);
  timeoutHide: any;

  list = viewChild.required<XListComponent>('list');
  portalPlacement = signal<XPositionTopBottom | null>(null);
  childAnimating = signal(false);
  activatedId = model<any>();
  destroy = signal(false);
  closeSubject!: Subject<void>;
  keydownSubject!: Subject<KeyboardEvent>;
  active = signal(0);
  private unSubject = new Subject<void>();
  private destroyRef = inject(DestroyRef);

  activatedIdComputed = computed(() => {
    const path = this.findPathById(this.data(), this.activatedId());
    if (path) {
      for (let node of path) {
        const nd = this.data().find((x) => x.id === node.id);
        if (nd) return nd.id;
      }
    }
    return null;
  });

  @HostListener('mouseenter') mouseenter() {
    this.portalHover.emit(true);
  }

  @HostListener('mouseleave') mouseleave() {
    !this.portalAttached() && this.portalHover.emit(false);
  }

  portalService = inject(XPortalService);
  overlay = inject(Overlay);
  viewContainerRef = inject(ViewContainerRef);
  portalComponent = signal<ComponentRef<XDropdownPortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);

  constructor() {
    effect(() => this.portalComponent()?.setInput('data', this.node()?.children));
    effect(() => this.portalComponent()?.setInput('trigger', this.trigger()));
    effect(() => this.portalComponent()?.setInput('level', this.level() + 1));
    effect(() => this.portalComponent()?.setInput('minWidth', this.minWidth()));
    effect(() => this.portalComponent()?.setInput('maxWidth', this.maxWidth()));
    effect(() => this.portalComponent()?.setInput('minHeight', this.minHeight()));
    effect(() => this.portalComponent()?.setInput('maxHeight', this.maxHeight()));
    effect(() => this.portalComponent()?.setInput('size', this.size()));
    effect(() => this.portalComponent()?.setInput('placement', this.portalPlacement()));
    effect(() => this.portalComponent()?.setInput('activatedId', this.activatedId()));
    effect(() => this.portalComponent()?.setInput('parentPortalComponent', this));
  }

  ngOnInit() {
    this.closeSubject.subscribe(() => {
      this.data() && this.data()!.length > 0 && this.list().setUnActive(this.active());
    });
    this.keydownSubject.pipe(takeUntil(this.unSubject)).subscribe((x) => {
      if (!this.isKeyboardControlled()) return;
      const keyCode = x.keyCode;
      const isRightArrow = [RIGHT_ARROW].includes(keyCode);
      const isLeftArrow = [LEFT_ARROW].includes(keyCode);
      if (isRightArrow) {
        const item = this.list().keyManager.activeItem!;
        if (item?.leaf()) {
          const node = item.node()!;
          node.event = x;
          node.component = item;
          this.isKeyboardControlled.set(false);
          this.onNodeClick(node);
        }
      }
      if (isLeftArrow && this.level() > 0) {
        this.parentPortalComponent()?.isKeyboardControlled.set(true);
        this.parentPortalComponent()?.closePortal();
      }
      this.data() && this.data()!.length > 0 && this.list().keydown(x);
    });
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
      this.unSubject.next();
      this.unSubject.complete();
    });
  }

  ngAfterViewInit() {
    this.list().keyManager.setFirstItemActive();
  }

  onNodeClick(node: XDropdownNode) {
    this.nodeClick.emit(node);
    if (!node.leaf) {
      this.activatedId.set(node.id);
      this.closeSubject.next();
    } else {
      if (node.disabled || this.childAnimating()) return;
      this.showPortal(node);
    }
  }

  portalAttached() {
    return this.portalOverlayRef()?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portalOverlayRef()?.dispose();
      return true;
    }
    return false;
  }

  createPortal() {
    const config: OverlayConfig = {
      backdropClass: '',
      panelClass: 'x-dropdown-portal-child',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.minWidth()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XDropdownPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this.unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPositionTopBottom;
      if (place !== this.portalPlacement()) {
        this.portalPlacement.set(place);
        this.portalOverlayRef()?.updatePosition();
      }
    });
  }

  setInstance() {
    let { componentRef, overlayRef } = this.portal;
    if (!componentRef || !overlayRef) return;
    this.portalComponent.set(componentRef);
    this.portalOverlayRef.set(overlayRef);
    Object.assign(componentRef.instance, {
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject,
      parantPortal: this
    });
    const { closed, animating, nodeClick, portalHover, activatedId } = componentRef.instance;
    closed.subscribe(() => this.closePortal());
    animating.subscribe((ing) => this.childAnimating.set(ing));
    nodeClick.subscribe((node) => this.nodeClick.emit(node));
    activatedId.subscribe((id) => this.activatedId.set(id));
    portalHover.subscribe((hover) => this.hover(hover));
  }

  hover(hover: boolean) {
    if (this.timeoutHide && hover) {
      clearTimeout(this.timeoutHide);
    } else {
      this.portalHover.emit(false);
      this.onLeave();
    }
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: new ElementRef(this.node()?.component?.elementRef?.nativeElement),
      placement: ['right-start', 'right-end', 'left-start', 'left-end'],
      transformOriginOn: 'x-dropdown-portal'
    });
  }

  showPortal(node: XDropdownNode) {
    if (this.portalAttached() && this.node()?.id !== node.id) {
      this.portalOverlayRef()?.dispose();
    }
    this.node.set(node);
    if (!this.portalAttached()) {
      this.createPortal();
    }
  }

  onEnter(node: XDropdownNode) {
    if (!node.leaf || node.disabled || this.trigger() === 'click' || this.childAnimating()) return;
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    this.showPortal(node);
  }

  onLeave() {
    if (this.trigger() !== 'hover') return;
    if (this.portalAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.closePortal();
      });
    }
  }

  onActive(num: number) {
    this.active.set(num);
  }

  onTabOut() {
    this.closeSubject.next();
  }

  findPathById(nodes: XDropdownNode[], id: number, currentPath: XDropdownNode[] = []): XDropdownNode[] | null {
    for (const node of nodes) {
      const newPath = [...currentPath, node];
      if (node.id === id) {
        return newPath;
      }
      if (node.children && node.children.length > 0) {
        const result = this.findPathById(node.children, id, newPath);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }
}
