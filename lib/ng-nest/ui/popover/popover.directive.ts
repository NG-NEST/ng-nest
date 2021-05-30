import { OnInit, ElementRef, ViewContainerRef, Directive, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XPopoverPortalComponent } from './popover-portal.component';
import { XPopoverPrefix, XPopoverProperty } from './popover.property';
import { BehaviorSubject, Subject } from 'rxjs';
import { OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange, Overlay } from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import { XPlacement, XIsChange, XConfigService } from '@ng-nest/ui/core';

@Directive({ selector: `[${XPopoverPrefix}], ${XPopoverPrefix}` })
export class XPopoverDirective extends XPopoverProperty implements OnInit, OnChanges {
  portal!: XPortalOverlayRef<XPopoverPortalComponent>;
  box!: DOMRect;
  contentChange: BehaviorSubject<any> = new BehaviorSubject(null);
  positionChange: Subject<any> = new Subject();
  timeoutHide: any;
  private _unSubject = new Subject();
  private realPlacement!: XPlacement;

  constructor(
    private elementRef: ElementRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    public configService: XConfigService
  ) {
    super();
  }

  @HostListener('click') click() {
    if (this.trigger === 'click') {
      this.visible = !this.visible;
      if (this.visible) this.show();
      else this.hide();
      this.visibleChange.emit(this.visible);
    }
  }

  @HostListener('mouseenter') mouseenter() {
    if (this.trigger === 'hover') this.show();
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.trigger === 'hover') this.hide();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.content) && this.contentChange.next(this.content);
    if (XIsChange(changes.visible)) {
      if (this.visible) this.show();
      else this.hide();
    }
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this.contentChange.unsubscribe();
  }

  ngAfterViewInit() {}

  show() {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (!this.portal || (this.portal && !this.portal.overlayRef?.hasAttached())) {
      this.visible = true;
      this.createPortal();
      this.visibleChange.emit(this.visible);
    }
  }

  hide() {
    if (this.portal.overlayRef?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal.overlayRef?.dispose();
        this.visibleChange.emit(this.visible);
      });
    }
  }

  createPortal() {
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.portalService.setPlacement({
        elementRef: this.elementRef,
        placement: [this.placement, 'bottom', 'top', 'left', 'right']
      }),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XPopoverPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    if (this.trigger === 'click') {
      this.portal.overlayRef
        ?.outsidePointerEvents()
        .pipe(takeUntil(this._unSubject))
        .subscribe(() => {
          this.hide();
        });
    }
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPlacement;
      if (place !== this.realPlacement) {
        this.realPlacement = place;
        this.positionChange.next(place);
        this.portal.overlayRef?.updatePosition();
      }
    });
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    this.box = this.elementRef.nativeElement.getBoundingClientRect();
    this.realPlacement = `${this.placement}` as XPlacement;
    Object.assign(componentRef.instance, {
      box: this.box,
      title: this.title,
      content: this.content,
      footer: this.footer,
      contentChange: this.contentChange,
      positionChange: this.positionChange,
      trigger: this.trigger,
      placement: this.placement,
      width: this.width,
      portalHover: (hover: boolean) => {
        if (this.timeoutHide && hover) {
          clearTimeout(this.timeoutHide);
        } else {
          this.hide();
        }
      },
      closePortal: () => this.hide(),
      viewInit: () => this.portal.overlayRef?.updatePosition()
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  update() {
    if (this.portal) this.portal.overlayRef?.updatePosition();
  }
}
