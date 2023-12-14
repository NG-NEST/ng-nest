import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  HostBinding,
  inject,
  OnDestroy
} from '@angular/core';
import { XDrawerPrefix, XDrawerProperty, X_DRAWER_CONTAINER } from './drawer.property';
import { XIsChange, XIsEmpty, XSlideAnimation, XConfigService, XClearClass } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subscription } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { XDrawerContainerComponent } from './drawer-container.component';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XButtonComponent } from '@ng-nest/ui/button';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: `${XDrawerPrefix}`,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, XOutletDirective, XButtonComponent],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XSlideAnimation]
})
export class XDrawerComponent extends XDrawerProperty implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.x-drawer-visible') get getVisible() {
    return this.visible;
  }
  @ViewChild('drawerTpl', { static: true }) drawerTpl!: TemplateRef<void>;
  portal!: XPortalOverlayRef<any>;
  back$: Subscription | null = null;
  width = '100%';
  height = '100%';

  private overlay = inject(Overlay);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  container = inject<XDrawerContainerComponent>(X_DRAWER_CONTAINER, { optional: true });
  configService = inject(XConfigService);

  ngOnInit() {
    this.setClassMap();
    this.setSize();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { visible, placement } = simples;
    XIsChange(visible) && this.setVisible();
    if (XIsChange(placement)) {
      this.setClassMap();
      this.setSize();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe() {
    this.back$?.unsubscribe();
  }

  setClassMap() {
    XClearClass(this.classMap);
    this.classMap = {
      [`${XDrawerPrefix}-${this.placement}`]: !XIsEmpty(this.placement),
      [`${XDrawerPrefix}-no-title`]: XIsEmpty(this.title)
    };
  }

  setSize() {
    if (this.container) [this.width, this.height] = this.getSize();
  }

  getSize(): string[] {
    return [
      this.placement === 'left' || this.placement === 'right' ? this.size! : '100%',
      this.placement === 'top' || this.placement === 'bottom' ? this.size! : '100%'
    ];
  }

  setVisible() {
    if (this.visible) {
      this.createPortal();
    } else {
      this.closePortal();
    }
  }

  createPortal() {
    if (this.container) return;
    const [width, height] = this.getSize();
    this.portal = this.portalService.attach({
      content: this.drawerTpl,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        hasBackdrop: true,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy: this.portalService.setPosition(this.placement, width, height)
      }
    });
    if (this.portal.overlayRef) this.back$ = this.portal.overlayRef.backdropClick().subscribe(() => this.closePortal());
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.container) {
      this.visibleChange.emit(this.visible as boolean);
      this.close.emit();
    } else {
      if (this.portalAttached()) {
        this.portal?.overlayRef?.detach();
        this.unsubscribe();
        this.visibleChange.emit(this.visible as boolean);
        this.close.emit();
      }
    }
  }
}
