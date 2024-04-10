import {
  ElementRef,
  ViewContainerRef,
  Directive,
  HostListener,
  OnChanges,
  SimpleChanges,
  HostBinding,
  inject
} from '@angular/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XPopoverPortalComponent } from './popover-portal.component';
import { XPopoverPrefix, XPopoverProperty } from './popover.property';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  Overlay
} from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import { XPlacement, XIsChange, XConfigService } from '@ng-nest/ui/core';

@Directive({ selector: `[${XPopoverPrefix}], ${XPopoverPrefix}`, standalone: true })
export class XPopoverDirective extends XPopoverProperty implements OnChanges {
  portal!: XPortalOverlayRef<XPopoverPortalComponent>;
  box!: DOMRect;
  contentChange: BehaviorSubject<any> = new BehaviorSubject(null);
  positionChange: Subject<any> = new Subject();
  timeoutHide: any;
  timeoutShow: any;
  private _unSubject = new Subject<void>();
  private realPlacement!: XPlacement;
  private elementRef = inject(ElementRef);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  configService = inject(XConfigService);

  @HostBinding('class.x-popover-show') get _show() {
    return this.visible;
  }

  @HostListener('click') click() {
    if (this.condition) return;
    if (this.trigger === 'click') {
      this.visible = !this.visible;
      if (this.visible) this.show();
      else this.hide();
      this.visibleChange.emit(this.visible);
    }
  }

  @HostListener('mouseenter') mouseenter() {
    if (this.condition) return;
    if (this.trigger === 'hover') this.show();
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.condition) return;
    if (this.trigger === 'hover') this.hide();
  }

  @HostListener('focus') focus() {
    if (this.condition) return;
    if (this.trigger === 'focus') this.show();
  }

  @HostListener('blur') blur() {
    if (this.condition) return;
    if (this.trigger === 'focus') this.hide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { content, visible } = changes;
    XIsChange(content) && this.contentChange.next(this.content);
    if (XIsChange(visible) && !this.condition) {
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
    if (this.timeoutShow) clearTimeout(this.timeoutShow);
    if (!this.portal || (this.portal && !this.portal.overlayRef?.hasAttached())) {
      this.timeoutShow = setTimeout(() => {
        this.visible = true;
        this.createPortal();
        this.visibleChange.emit(this.visible);
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
        this.visibleChange.emit(this.visible);
      }, this.mouseLeaveDelay);
    }
  }

  createPortal() {
    const config: OverlayConfig = {
      panelClass: this.panelClass,
      backdropClass: '',
      positionStrategy: this.portalService.setPlacement({
        elementRef: this.connectTo
          ? this.connectTo instanceof ElementRef
            ? this.connectTo
            : new ElementRef(this.connectTo)
          : this.elementRef,
        placement: [this.placement as XPlacement, 'bottom', 'top', 'left', 'right']
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
      maxWidth: this.maxWidth,
      minWidth: this.minWidth,
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
