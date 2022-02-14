import { ElementRef, ViewContainerRef, Directive, HostListener, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XTooltipPortalComponent } from './tooltip-portal.component';
import { XTooltipPrefix, XTooltipProperty } from './tooltip.property';
import { BehaviorSubject, Subject } from 'rxjs';
import { XIsChange, XPlacement } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange, Overlay } from '@angular/cdk/overlay';

@Directive({ selector: `[${XTooltipPrefix}], ${XTooltipPrefix}` })
export class XTooltipDirective extends XTooltipProperty implements OnChanges, OnDestroy {
  portal!: XPortalOverlayRef<XTooltipPortalComponent>;
  box!: DOMRect;
  contentChange: BehaviorSubject<any> = new BehaviorSubject(null);
  positionChange: Subject<any> = new Subject();
  timeoutHide: any;
  timeoutShow: any;
  private _unSubject = new Subject();

  constructor(
    private elementRef: ElementRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) {
    super();
  }

  @HostListener('mouseenter') mouseenter() {
    !this.manual && this.show();
  }

  @HostListener('mouseleave') mouseleave() {
    !this.manual && this.hide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { content, visible } = changes;
    XIsChange(content) && this.contentChange.next(this.content);
    if (XIsChange(visible)) {
      if (this.visible) this.show();
      else this.hide();
    }
  }

  ngOnDestroy(): void {
    this.contentChange.unsubscribe();
  }

  show() {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (this.timeoutShow) clearTimeout(this.timeoutShow);
    if (!this.portal || (this.portal && !this.portal.overlayRef?.hasAttached())) {
      this.timeoutShow = setTimeout(() => {
        this.visible = true;
        this.createPortal();
      }, this.mouseEnterDelay);
    }
  }

  hide() {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (this.timeoutShow) clearTimeout(this.timeoutShow);
    if (this.portal?.overlayRef?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal.overlayRef?.dispose();
      }, this.mouseLeaveDelay);
    }
  }

  createPortal() {
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.portalService.setPlacement({
        elementRef: this.elementRef,
        placement: [this.placement as XPlacement, 'bottom', 'top', 'left', 'right']
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
    position.positionChanges.pipe(takeUntil(this._unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPlacement;
      place !== this.placement && this.positionChange.next(place);
    });
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    this.box = this.elementRef.nativeElement.getBoundingClientRect();
    Object.assign(componentRef.instance, {
      box: this.box,
      content: this.content,
      contentChange: this.contentChange,
      color: this.color,
      backgroundColor: this.backgroundColor,
      placement: this.placement,
      positionChange: this.positionChange,
      portalHover: (hover: boolean) => {
        if (this.timeoutHide && hover) {
          clearTimeout(this.timeoutHide);
        } else {
          this.hide();
        }
      },
      viewInit: () => this.updatePortal()
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  updatePortal() {
    this.portal.overlayRef?.updatePosition();
  }
}
