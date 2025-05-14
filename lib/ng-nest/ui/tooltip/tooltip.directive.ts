import {
  ElementRef,
  ViewContainerRef,
  Directive,
  HostListener,
  OnDestroy,
  HostBinding,
  inject,
  signal,
  ComponentRef,
  effect,
  SimpleChanges
} from '@angular/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XTooltipPortalComponent } from './tooltip-portal.component';
import { XTooltipPrefix, XTooltipProperty } from './tooltip.property';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  Overlay
} from '@angular/cdk/overlay';
import { XIsChange, type XPlacement } from '@ng-nest/ui/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Directive({ selector: `[${XTooltipPrefix}], ${XTooltipPrefix}` })
export class XTooltipDirective extends XTooltipProperty implements OnDestroy {
  portal!: XPortalOverlayRef<XTooltipPortalComponent>;
  box = signal<DOMRect | null>(null);
  timeoutHide: any;
  timeoutShow: any;
  mouseover = signal(false);
  private unSubject = new Subject<void>();
  private realPlacement = signal<XPlacement | null>(null);
  private elementRef = inject(ElementRef);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);

  @HostBinding('class.x-tooltip-show') get _show() {
    return this.visible();
  }

  @HostListener('mouseenter') mouseenter() {
    this.mouseover.set(true);
    !this.disabled() && !this.manual() && this.show();
  }

  @HostListener('mouseleave') mouseleave() {
    this.mouseover.set(false);
    !this.disabled() && !this.manual() && this.hide();
  }

  portalComponent = signal<ComponentRef<XTooltipPortalComponent> | null>(null);
  visibleChanged = toObservable(this.visible);

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('content', this.content()));
    effect(() => this.portalComponent()?.setInput('box', this.box()));
    effect(() => this.portalComponent()?.setInput('color', this.color()));
    effect(() => this.portalComponent()?.setInput('backgroundColor', this.backgroundColor()));
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { visible } = changes;
    XIsChange(visible) && this.setVisible();
  }

  setVisible() {
    if (this.visible()) {
      this.show(false);
    } else {
      this.hide(false);
    }
  }

  show(event = true) {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (this.timeoutShow) clearTimeout(this.timeoutShow);
    if (!this.portal || (this.portal && !this.portal.overlayRef?.hasAttached())) {
      if ((event && this.mouseover()) || !event) {
        this.timeoutShow = setTimeout(() => {
          this.createPortal();
          this.visible.set(true);
        }, this.mouseEnterDelay());
      }
    }
  }

  hide(event = true) {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (this.timeoutShow) clearTimeout(this.timeoutShow);
    if (this.portal?.overlayRef?.hasAttached() && !this.mouseover()) {
      if ((event && !this.mouseover()) || !event) {
        this.timeoutHide = setTimeout(() => {
          this.portal.overlayRef?.dispose();
          this.visible.set(false);
        }, this.mouseLeaveDelay());
      }
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
      content: XTooltipPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
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
    this.box.set(this.elementRef.nativeElement.getBoundingClientRect());
    const { hoverChanged } = componentRef.instance;
    hoverChanged.subscribe((hover: boolean) => {
      if (this.timeoutHide && hover) {
        clearTimeout(this.timeoutHide);
      } else {
        this.hide();
      }
    });
  }

  updatePortal() {
    this.portal.overlayRef?.updatePosition();
  }
}
