import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { XDrawerPrefix, XDrawerProperty } from './drawer.property';
import { XIsChange, XIsEmpty, XSlideAnimation, XConfigService } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subscription } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: `${XDrawerPrefix}`,
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XSlideAnimation]
})
export class XDrawerComponent extends XDrawerProperty implements OnInit, OnChanges {
  @ViewChild('drawerTpl', { static: true }) drawerTpl: TemplateRef<void>;
  portal: XPortalOverlayRef<any>;
  back$: Subscription | null = null;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public overlay: Overlay,
    public portalService: XPortalService,
    public viewContainerRef: ViewContainerRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.visible) && this.setVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe() {
    this.back$ && this.back$.unsubscribe();
  }

  setClassMap() {
    this.classMap = {
      [`${XDrawerPrefix}-${this.placement}`]: !XIsEmpty(this.placement),
      [`${XDrawerPrefix}-no-title`]: XIsEmpty(this.title)
    };
  }

  setVisible() {
    if (this.visible) {
      this.createPortal();
    } else {
      this.closePortal();
    }
  }

  createPortal() {
    const width = this.placement === 'left' || this.placement === 'right' ? this.size : '100%';
    const height = this.placement === 'top' || this.placement === 'bottom' ? this.size : '100%';
    this.portal = this.portalService.attach({
      content: this.drawerTpl,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        hasBackdrop: true,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        positionStrategy: this.portalService.setPosition(this.placement, width, height)
      }
    });
    if (this.portal.overlayRef) this.back$ = this.portal.overlayRef.backdropClick().subscribe(() => this.closePortal());
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.unsubscribe();
      this.close.emit();
      return true;
    }
    return false;
  }
}
