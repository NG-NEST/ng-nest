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
  effect
} from '@angular/core';
import { XDropdownPrefix, XDropdownNode, XDropdownProperty } from './dropdown.property';
import { XIsEmpty, XGetChildren, XPositionTopBottom, XPlacement } from '@ng-nest/ui/core';
import { of, Subject } from 'rxjs';
import { XPortalConnectedPosition, XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XDropdownPortalComponent } from './dropdown-portal.component';
import { debounceTime, delay, takeUntil } from 'rxjs/operators';
import {
  ConnectedOverlayPositionChange,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XDropdownPrefix}`,
  standalone: true,
  imports: [NgClass],
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
    return data;
  });
  portal!: XPortalOverlayRef<XDropdownPortalComponent>;
  timeoutHide: any;
  visible = signal(false);
  animating = signal(false);
  outsideClick = signal(false);
  minWidth = signal<string>('0px');
  hoverDelayUnsub = new Subject<void>();
  closeSubject: Subject<void> = new Subject();

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
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.hoverDelayUnsub.next();
    this.hoverDelayUnsub.complete();
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
    });
  }

  onEnter() {
    of(true)
      .pipe(delay(this.hoverDelay()), takeUntil(this.hoverDelayUnsub))
      .subscribe(() => {
        if (this.disabled() || this.trigger() === 'click') return;
        if (this.timeoutHide) {
          clearTimeout(this.timeoutHide);
          this.timeoutHide = null;
        }
        if (!this.portal || (this.portal && !this.portalOverlayRef()?.hasAttached())) {
          this.visible.set(true);
          this.createPortal();
        }
      });
  }

  onLeave() {
    this.hoverDelayUnsub.next();
    if (this.disabled() || this.trigger() === 'click') return;
    if (this.portalOverlayRef()?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.portalOverlayRef()?.dispose();
        this.visible.set(false);
      });
    }
  }

  showPortal() {
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
      this.visible.set(false);
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portalOverlayRef()?.dispose();
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
          this.closeSubject.next();
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
    const { closed, animating, nodeClick, portalHover, activatedId } = componentRef.instance;
    closed.subscribe(() => this.closeSubject.next());
    animating.subscribe((ing) => this.animating.set(ing));
    nodeClick.subscribe((node) => this.nodeClick.emit(node));
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

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.dropdown(),
      placement: [this.placement(), 'bottom-start', 'top-start', 'bottom-end', 'top-end'],
      transformOriginOn: 'x-dropdown-portal'
    });
  }
}
