import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, inject } from '@angular/core';
import { XFillDefault, XConfigService, XDrawerConfig } from '@ng-nest/ui/core';
import { XPortalService } from '@ng-nest/ui/portal';
import { XDrawerPortalComponent } from './drawer-portal.component';
import { XDrawerRef } from './drawer-ref';
import { XDrawerOption, X_DRAWER_CONFIG_NAME, X_DRAWER_DATA } from './drawer.property';

@Injectable({ providedIn: 'root' })
export class XDrawerService {
  default: XDrawerOption = {
    placement: 'right',
    size: '30%',
    hasBackdrop: true,
    backdropClose: true
  };
  configDefault?: XDrawerConfig;
  private portalService = inject(XPortalService);
  private configService = inject(XConfigService);
  private overlay = inject(Overlay);

  constructor() {
    this.configDefault = this.configService.getConfigForComponent(X_DRAWER_CONFIG_NAME);
    Object.assign(this.default, this.configDefault);
  }

  create<T>(content: TemplateRef<any> | ComponentType<T>, option: XDrawerOption = {}): XDrawerRef<T> {
    XFillDefault(option, this.default);
    const width = ['left', 'right'].includes(option.placement as string) ? option.size : '100%';
    const height = ['top', 'bottom'].includes(option.placement as string) ? option.size : '100%';
    const portal = this.portalService.attach<XDrawerPortalComponent>({
      content: XDrawerPortalComponent,
      viewContainerRef: option.viewContainerRef,
      overlayConfig: {
        hasBackdrop: option.hasBackdrop,
        panelClass: option.className,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy: this.portalService.setPosition(option.placement, width, height)
      }
    });
    const { overlayRef, componentRef } = portal || {};
    const { instance } = componentRef! || {};
    componentRef?.setInput('placement', option.placement);
    const drawerRef = new XDrawerRef<T>(overlayRef!, instance);
    if (content instanceof TemplateRef) {
      instance.attachTemplatePortal(
        new TemplatePortal(content, option.viewContainerRef!, { $implicit: option.data, drawerRef: drawerRef })
      );
    } else {
      const injector = this.portalService.createInjector([
        { provide: X_DRAWER_DATA, useValue: option.data },
        { provide: XDrawerRef, useValue: drawerRef }
      ]);

      instance.attachComponentPortal(new ComponentPortal(content, option.viewContainerRef, injector));
    }
    if (option.hasBackdrop && option.backdropClose && overlayRef)
      overlayRef.backdropClick().subscribe(() => {
        drawerRef.close();
      });

    return drawerRef;
  }
}
