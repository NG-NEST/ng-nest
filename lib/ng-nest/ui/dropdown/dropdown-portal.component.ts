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
  viewChild
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
import { RIGHT_ARROW } from '@angular/cdk/keycodes';

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
  closed = output();
  animating = output<boolean>();
  nodeClick = output<XDropdownNode>();
  portalHover = output<boolean>();
  portal!: XPortalOverlayRef<XDropdownPortalComponent>;
  node = signal<XDropdownNode | null>(null);
  openNode = signal<XDropdownNode | null>(null);
  timeoutHide: any;

  list = viewChild.required<XListComponent>('list');
  portalPlacement = signal<XPositionTopBottom | null>(null);
  childAnimating = signal(false);
  activatedId = model<any>();
  destroy = signal(false);
  closeSubject!: Subject<void>;
  keydownSubject!: Subject<KeyboardEvent>;
  active = signal(0);
  isRightArrow = signal(false);
  private unSubject = new Subject<void>();
  private destroyRef = inject(DestroyRef);

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
    effect(() => this.portalComponent()?.setInput('minWidth', this.minWidth()));
    effect(() => this.portalComponent()?.setInput('maxWidth', this.maxWidth()));
    effect(() => this.portalComponent()?.setInput('minHeight', this.minHeight()));
    effect(() => this.portalComponent()?.setInput('maxHeight', this.maxHeight()));
    effect(() => this.portalComponent()?.setInput('size', this.size()));
    effect(() => this.portalComponent()?.setInput('placement', this.portalPlacement()));
    effect(() => this.portalComponent()?.setInput('activatedId', this.activatedId()));
  }

  ngOnInit() {
    this.closeSubject.subscribe(() => {
      this.data() && this.data()!.length > 0 && this.list().setUnActive(this.active());
    });
    this.keydownSubject.pipe(takeUntil(this.unSubject)).subscribe((x) => {
      const keyCode = x.keyCode;
      this.isRightArrow.set([RIGHT_ARROW].includes(keyCode));
      this.data() && this.data()!.length > 0 && this.list().keydown(x);
    });
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
      this.unSubject.next();
      this.unSubject.complete();
    });
  }

  onNodeClick(node: XDropdownNode) {
    this.nodeClick.emit(node);
    if (!node.leaf) {
      this.activatedId.set(node.id);
      this.closed.emit();
    } else {
      this.onEnter(node);
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
      keydownSubject: this.keydownSubject
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
      elementRef: new ElementRef(this.node()?.event?.target),
      placement: ['right-start', 'right-end', 'left-start', 'left-end'],
      transformOriginOn: 'x-dropdown-portal'
    });
  }

  showPortal(node: XDropdownNode) {
    if (this.portalAttached() && this.node()?.id !== node.id) {
      this.changeOpenNode(false);
      this.portalOverlayRef()?.dispose();
    }
    this.node.set(node);
    if (!this.portalAttached()) {
      this.openNode.set(node);
      this.changeOpenNode(true);
      this.createPortal();
    }
  }

  onEnter(node: XDropdownNode) {
    if (!node.leaf || node.disabled || this.childAnimating()) return;
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    this.showPortal(node);
  }

  onLeave() {
    if (this.portalAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.changeOpenNode(false);
        this.portal?.overlayRef?.dispose();
      });
    } else {
      this.changeOpenNode(false);
    }
  }

  changeOpenNode(open: boolean) {
    if (this.openNode()) {
      this.openNode.update((x) => {
        x!.openPortal = open;
        x!.change && x!.change();
        return x;
      });
    }
  }

  onActive(num: number) {
    this.active.set(num);
  }

  onTabOut() {
    this.closeSubject.next();
  }
}
