import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { fillDefault, XConfigService, XDrawerConfig } from '@ng-nest/ui/core';
import { XPortalService } from '@ng-nest/ui/portal';
import { XDrawerContainerComponent } from './drawer-container.component';
import { XDrawerRef } from './drawer-ref';
import { XDrawerOption, X_DRAWER_CONFIG_NAME, X_DRAWER_DATA } from './drawer.property';

@Injectable()
export class XDrawerService {
  default: XDrawerOption = {
    placement: 'right',
    size: '30%',
    hasBackdrop: true,
    backdropClose: true
  };
  configDefault?: XDrawerConfig;

  constructor(public portalService: XPortalService, public configService: XConfigService, public overlay: Overlay) {
    this.configDefault = this.configService.getConfigForComponent(X_DRAWER_CONFIG_NAME);
    Object.assign(this.default, this.configDefault);
  }

  create<T>(content: TemplateRef<any> | ComponentType<T>, option: XDrawerOption = {}): XDrawerRef<T> {
    fillDefault(option, this.default);
    const width = ['left', 'right'].includes(option.placement as string) ? option.size : '100%';
    const height = ['top', 'bottom'].includes(option.placement as string) ? option.size : '100%';
    const portal = this.portalService.attach<XDrawerContainerComponent>({
      content: XDrawerContainerComponent,
      viewContainerRef: option.viewContainerRef,
      overlayConfig: {
        hasBackdrop: option.hasBackdrop,
        panelClass: option.className,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        positionStrategy: this.portalService.setPosition(option.placement, width, height)
      }
    });
    const { overlayRef, componentRef } = portal || {};
    const { instance } = componentRef! || {};
    instance.placement = option.placement;
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
