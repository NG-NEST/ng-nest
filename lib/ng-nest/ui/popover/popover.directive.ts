import {
  ElementRef,
  ViewContainerRef,
  Directive,
  HostListener,
  HostBinding,
  inject,
  OnDestroy,
  effect,
  ComponentRef,
  signal
} from '@angular/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XPopoverPortalComponent } from './popover-portal.component';
import { XPopoverPrefix, XPopoverProperty } from './popover.property';
import { Subject } from 'rxjs';
import {
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  Overlay
} from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import type { XPlacement } from '@ng-nest/ui/core';

@Directive({ selector: `[${XPopoverPrefix}], ${XPopoverPrefix}`, standalone: true })
export class XPopoverDirective extends XPopoverProperty implements OnDestroy {
  portal!: XPortalOverlayRef<XPopoverPortalComponent>;
  timeoutHide: any;
  timeoutShow: any;
  private unSubject = new Subject<void>();
  private realPlacement = signal<XPlacement | null>(null);
  private elementRef = inject(ElementRef);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);

  @HostBinding('class.x-popover-show') get _show() {
    return this.visible();
  }

  @HostListener('click') click() {
    if (this.condition()) return;
    if (this.trigger() === 'click') {
      this.visible.update((x) => !x);
      if (this.visible()) this.show();
      else this.hide();
    }
  }

  @HostListener('mouseenter') mouseenter() {
    if (this.condition()) return;
    if (this.trigger() === 'hover') this.show();
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.condition()) return;
    if (this.trigger() === 'hover') this.hide();
  }

  @HostListener('focus') focus() {
    if (this.condition()) return;
    if (this.trigger() === 'focus') this.show();
  }

  @HostListener('blur') blur() {
    if (this.condition()) return;
    if (this.trigger() === 'focus') this.hide();
  }

  portalComponent = signal<ComponentRef<XPopoverPortalComponent> | null>(null);

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('title', this.title()));
    effect(() => this.portalComponent()?.setInput('content', this.content()));
    effect(() => this.portalComponent()?.setInput('footer', this.footer()));
    effect(() => this.portalComponent()?.setInput('width', this.width()));
    effect(() => this.portalComponent()?.setInput('minWidth', this.minWidth()));
    effect(() => this.portalComponent()?.setInput('maxWidth', this.maxWidth()));
    effect(() => this.portalComponent()?.setInput('trigger', this.trigger()));
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.unsubscribe();
  }

  show() {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (this.timeoutShow) clearTimeout(this.timeoutShow);
    if (!this.portal || (this.portal && !this.portal.overlayRef?.hasAttached())) {
      this.timeoutShow = setTimeout(() => {
        this.createPortal();
        this.visible.set(true);
      }, this.mouseEnterDelay());
    }
  }

  hide() {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (this.timeoutShow) clearTimeout(this.timeoutShow);
    if (this.portal?.overlayRef?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.portal.overlayRef?.dispose();
        this.visible.set(false);
      }, this.mouseLeaveDelay());
    }
  }

  createPortal() {
    const connectTo = this.connectTo();
    const config: OverlayConfig = {
      panelClass: this.panelClass(),
      backdropClass: '',
      positionStrategy: this.portalService.setPlacement({
        elementRef: connectTo
          ? connectTo instanceof ElementRef
            ? connectTo
            : new ElementRef(connectTo)
          : this.elementRef,
        placement: [this.placement(), 'top', 'bottom', 'left', 'right']
      }),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XPopoverPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    if (this.trigger() === 'click') {
      this.portal.overlayRef
        ?.outsidePointerEvents()
        .pipe(takeUntil(this.unSubject))
        .subscribe(() => {
          this.hide();
        });
    }
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this.unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPlacement;
      if (place !== this.realPlacement()) {
        this.realPlacement.set(place);
        this.portal.overlayRef?.updatePosition();
      }
    });
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    this.portalComponent.set(componentRef);
    this.realPlacement.set(this.placement());

    const { portalHover } = componentRef.instance;
    portalHover.subscribe((hover: boolean) => {
      if (this.timeoutHide && hover) {
        clearTimeout(this.timeoutHide);
      } else {
        this.hide();
      }
    });
  }
}
