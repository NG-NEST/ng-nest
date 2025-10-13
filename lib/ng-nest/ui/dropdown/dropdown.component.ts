import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  ViewContainerRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  computed,
  viewChild,
  ComponentRef,
  effect,
  SimpleChanges
} from '@angular/core';
import { XDropdownPrefix, XDropdownNode, XDropdownProperty } from './dropdown.property';
import {
  XIsEmpty,
  XHasChildren,
  XGetChildren,
  XPositionTopBottom,
  XPlacement,
  XIsChange,
  XIsNull
} from '@ng-nest/ui/core';
import { of, Subject } from 'rxjs';
import { XPortalConnectedPosition, XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XDropdownPortalComponent } from './dropdown-portal.component';
import { debounceTime, delay, takeUntil, throttleTime } from 'rxjs/operators';
import {
  ConnectedOverlayPositionChange,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { DOWN_ARROW, ESCAPE } from '@angular/cdk/keycodes';

@Component({
  selector: `${XDropdownPrefix}`,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDropdownComponent extends XDropdownProperty implements OnInit, OnDestroy {
  private unSubject = new Subject<void>();
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  dropdown = viewChild.required<ElementRef<HTMLElement>>('dropdown');
  nodes = computed(() => {
    const data = this.data();
    if (!this.children()) {
      return data.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XDropdownNode>(data, y, 0));
    }
    return XHasChildren(data, 0);
  });
  portal!: XPortalOverlayRef<XDropdownPortalComponent>;
  timeoutHide: any;
  animating = signal(false);
  visibleClass = signal(false);
  outsideClick = signal(false);
  isClickNodeLeaf = signal(false);
  minWidth = signal<string>('0px');
  hoverDelayUnsub = new Subject<void>();
  closeSubject: Subject<void> = new Subject();
  keydownSubject: Subject<KeyboardEvent> = new Subject();
  isNullVisible = signal(false);

  private realPlacement = signal<XPlacement | null>(null);
  portalComponent = signal<ComponentRef<XDropdownPortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('data', this.nodes()));
    effect(() => this.portalComponent()?.setInput('trigger', this.trigger()));
    effect(() => this.portalComponent()?.setInput('minWidth', this.minWidth()));
    effect(() => this.portalComponent()?.setInput('maxWidth', this.portalMaxWidth()));
    effect(() => this.portalComponent()?.setInput('minHeight', this.portalMinHeight()));
    effect(() => this.portalComponent()?.setInput('maxHeight', this.portalMaxHeight()));
    effect(() => this.portalComponent()?.setInput('activatedId', this.activatedId()));
    effect(() => this.portalComponent()?.setInput('size', this.size()));
  }

  ngOnInit() {
    this.setSubject();
    this.isNullVisible.set(XIsNull(this.visible()));
  }

  ngOnChanges(changes: SimpleChanges) {
    const { visible } = changes;
    XIsChange(visible) && this.setVisible();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.hoverDelayUnsub.next();
    this.hoverDelayUnsub.complete();
  }

  setVisible() {
    if (this.disabled() || this.animating()) return;
    if (this.visible()) {
      if (this.portalAttached()) {
        this.closeSubject.next();
        return;
      }
      this.createPortal();
    } else {
      this.closePortal();
    }
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.keydownSubject.pipe(throttleTime(10), takeUntil(this.unSubject)).subscribe((x) => {
      const keyCode = x.keyCode;
      if (this.portalAttached() && [ESCAPE].includes(keyCode)) {
        this.closeSubject.next();
      }
      if (!this.portalAttached() && [DOWN_ARROW].includes(keyCode)) {
        if (this.disabled()) return;
        this.visibleClass.set(true);
        this.createPortal();
      }
    });
  }

  onEnter() {
    if (!this.isNullVisible()) return;
    of(true)
      .pipe(delay(this.hoverDelay()), takeUntil(this.hoverDelayUnsub))
      .subscribe(() => {
        if (this.disabled() || this.trigger() === 'click') return;
        if (this.timeoutHide) {
          clearTimeout(this.timeoutHide);
          this.timeoutHide = null;
        }
        if (!this.portal || (this.portal && !this.portalOverlayRef()?.hasAttached())) {
          this.visibleClass.set(true);
          this.createPortal();
        }
      });
  }

  onLeave() {
    if (!this.isNullVisible()) return;
    this.hoverDelayUnsub.next();
    if (this.disabled() || this.trigger() === 'click') return;
    if (this.portalOverlayRef()?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.portalOverlayRef()?.dispose();
        this.visibleClass.set(false);
      });
    }
  }

  onClickShow() {
    if (this.disabled() || this.trigger() === 'hover' || this.animating()) return;
    if (this.trigger() === 'click' && this.portalAttached()) {
      this.closeSubject.next();
      return;
    }
    this.createPortal();
  }

  portalAttached() {
    return this.portalOverlayRef()?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portalOverlayRef()?.dispose();
      this.visibleClass.set(false);
      return true;
    }
    return false;
  }

  createPortal() {
    let box = this.dropdown().nativeElement.getBoundingClientRect();
    this.minWidth.set(this.portalMinWidth() ? this.portalMinWidth() : `${box.width}px`);
    const config: OverlayConfig = {
      backdropClass: '',
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

    if (this.trigger() === 'click') {
      this.portal.overlayRef
        ?.outsidePointerEvents()
        .pipe(debounceTime(30), takeUntil(this.unSubject))
        .subscribe(() => {
          if (!this.isClickNodeLeaf()) {
            this.closeSubject.next();
          }
        });
    }

    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this.unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPositionTopBottom;
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
    Object.assign(componentRef.instance, {
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject
    });
    const { closed, animating, nodeClick, portalHover, activatedId } = componentRef.instance;
    closed.subscribe(() => this.closeSubject.next());
    animating.subscribe((ing) => this.animating.set(ing));
    nodeClick.subscribe((node) => {
      this.isClickNodeLeaf.set(node.leaf!);
      this.nodeClick.emit(node);
    });
    activatedId.subscribe((id) => this.activatedId.set(id));
    portalHover.subscribe((hover) => this.portalHover(hover));
  }

  portalHover(hover: boolean) {
    if (this.timeoutHide && hover) {
      clearTimeout(this.timeoutHide);
    } else {
      this.onLeave();
    }
  }

  onKeydown($event: KeyboardEvent) {
    this.keydownSubject.next($event);
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.dropdown(),
      placement: [this.placement(), 'bottom-start', 'top-start', 'bottom-end', 'top-end'],
      transformOriginOn: 'x-dropdown-portal'
    });
  }
}
