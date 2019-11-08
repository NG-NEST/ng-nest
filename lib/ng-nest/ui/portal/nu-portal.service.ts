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
import { NuPortalServiceModule } from "./nu-portal.service.module";
import { NuPortalOption, NuPortalOverlayRef } from "./nu-portal.type";

/**
 * 动态创建视图服务
 */
@Injectable({
  providedIn: NuPortalServiceModule
})
export class NuPortalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  create(option?: NuPortalOption): NuPortalOverlayRef {
    let overlayRef = this.createOverlayRef(option);
    let templatePortal: TemplatePortal<any>;
    let componentPortal: ComponentPortal<any>;
    if (option.nuContent instanceof TemplateRef) {
      templatePortal = new TemplatePortal(
        option.nuContent,
        option.nuViewContainerRef,
        option.nuContext
      );
      overlayRef.attach(templatePortal);
    } else {
      componentPortal = new ComponentPortal(
        option.nuContent,
        option.nuViewContainerRef,
        option.nuInjector,
        option.nuComponentFactoryResolver
      );
      overlayRef.attach(componentPortal);
    }

    return {
      nuOverlayRef: overlayRef,
      nuTemplatePortal: templatePortal,
      nuComponentPortal: componentPortal
    };
  }

  createInjector(data, token: InjectionToken<any>): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(token, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  private createOverlayRef(option?: NuPortalOption): OverlayRef {
    return this.overlay.create(option.nuOverlayConfig);
  }
}
