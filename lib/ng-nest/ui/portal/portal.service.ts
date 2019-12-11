import { Injectable, TemplateRef, Injector, InjectionToken, ElementRef } from "@angular/core";
import { Overlay, OverlayRef, PositionStrategy } from "@angular/cdk/overlay";
import { TemplatePortal, ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { XPortalServiceModule } from "./portal.service.module";
import { XPortalInput, XPortalOverlayRef } from "./portal.type";

/**
 * 动态创建视图服务
 */
@Injectable({
  providedIn: XPortalServiceModule
})
export class XPortalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  create(option?: XPortalInput): XPortalOverlayRef {
    let overlayRef = this.createOverlayRef(option);
    let templatePortal: TemplatePortal<any>;
    let componentPortal: ComponentPortal<any>;
    if (option.content instanceof TemplateRef) {
      templatePortal = new TemplatePortal(option.content, option.viewContainerRef, option.context);
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

  setPositionStrategy(elementRef?: ElementRef, toBottom: boolean = true): PositionStrategy {
    if (!elementRef) {
      return this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
    } else {
      if (toBottom) {
        return this.overlay
          .position()
          .connectedTo(elementRef, { originX: "start", originY: "bottom" }, { overlayX: "start", overlayY: "top" });
      } else {
        return this.overlay
          .position()
          .connectedTo(elementRef, { originX: "start", originY: "top" }, { overlayX: "start", overlayY: "bottom" });
      }
    }
  }

  private createOverlayRef(option?: XPortalInput): OverlayRef {
    return this.overlay.create(option.overlayConfig);
  }
}
