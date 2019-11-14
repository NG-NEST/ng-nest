import {
  Injectable,
  TemplateRef,
  Injector,
  InjectionToken
} from "@angular/core";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import {
  TemplatePortal,
  ComponentPortal,
  PortalInjector
} from "@angular/cdk/portal";
import { XPortalServiceModule } from "./portal.service.module";
import { XPortalOption, XPortalOverlayRef } from "./portal.type";

/**
 * 动态创建视图服务
 */
@Injectable({
  providedIn: XPortalServiceModule
})
export class XPortalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  create(option?: XPortalOption): XPortalOverlayRef {
    let overlayRef = this.createOverlayRef(option);
    let templatePortal: TemplatePortal<any>;
    let componentPortal: ComponentPortal<any>;
    if (option.content instanceof TemplateRef) {
      templatePortal = new TemplatePortal(
        option.content,
        option.viewContainerRef,
        option.context
      );
      overlayRef.attach(templatePortal);
    } else {
      componentPortal = new ComponentPortal(
        option.content,
        option.viewContainerRef,
        option.injector,
        option.componentFactoryResolver
      );
      overlayRef.attach(componentPortal);
    }

    return {
      overlayRef: overlayRef,
      templatePortal: templatePortal,
      componentPortal: componentPortal
    };
  }

  createInjector(data, token: InjectionToken<any>): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(token, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  private createOverlayRef(option?: XPortalOption): OverlayRef {
    return this.overlay.create(option.overlayConfig);
  }
}
