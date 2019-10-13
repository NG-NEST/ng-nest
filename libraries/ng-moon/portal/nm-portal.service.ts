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
import { NmPortalServiceModule } from "./nm-portal.service.module";
import { NmPortalOption, NmPortalOverlayRef } from "./nm-portal.type";

/**
 * 动态创建视图服务
 */
@Injectable({
  providedIn: NmPortalServiceModule
})
export class NmPortalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  create(option?: NmPortalOption): NmPortalOverlayRef {
    let overlayRef = this.createOverlayRef(option);
    let templatePortal: TemplatePortal<any>;
    let componentPortal: ComponentPortal<any>;
    if (option.nmContent instanceof TemplateRef) {
      templatePortal = new TemplatePortal(
        option.nmContent,
        option.nmViewContainerRef,
        option.nmContext
      );
      overlayRef.attach(templatePortal);
    } else {
      componentPortal = new ComponentPortal(
        option.nmContent,
        option.nmViewContainerRef,
        option.nmInjector,
        option.nmComponentFactoryResolver
      );
      overlayRef.attach(componentPortal);
    }

    return {
      nmOverlayRef: overlayRef,
      nmTemplatePortal: templatePortal,
      nmComponentPortal: componentPortal
    };
  }

  createInjector(data, token: InjectionToken<any>): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(token, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  private createOverlayRef(option?: NmPortalOption): OverlayRef {
    return this.overlay.create(option.nmOverlayConfig);
  }
}
