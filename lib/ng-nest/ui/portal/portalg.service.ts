import { Injectable, TemplateRef, Injector, InjectionToken, ElementRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { XPortalInput, XPortalOverlayRef, XPortalPlacement } from './portal.type';
import { XPlacement, XPosition, XPlace } from '@ng-nest/ui/core';

/**
 * 动态创建视图服务
 */
@Injectable({ providedIn: 'root' })
export class XPortalgService {
  constructor(public overlay: Overlay, public injector: Injector) {}

  createPortal(option?: XPortalInput): XPortalOverlayRef {
    let overlayRef = this.createOverlayRef(option);
    let templatePortal: TemplatePortal<any>;
    let componentPortal: ComponentPortal<any>;
    let componentRef: ComponentRef<any>;
    let embeddedViewRef: EmbeddedViewRef<any>;
    if (option.content instanceof TemplateRef) {
      templatePortal = new TemplatePortal(option.content, option.viewContainerRef, option.context);
      embeddedViewRef = overlayRef.attach(templatePortal);
    } else {
      componentPortal = new ComponentPortal(option.content, option.viewContainerRef, option.injector, option.componentFactoryResolver);
      componentRef = overlayRef.attach(componentPortal);
    }

    return {
      overlayRef: overlayRef,
      templatePortal: templatePortal,
      componentPortal: componentPortal,
      componentRef: componentRef,
      embeddedViewRef: embeddedViewRef
    };
  }

  createPortalInjector(data, token: InjectionToken<any>): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(token, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  setPlacement(elementRef?: ElementRef, ...placement: XPlace[] | XPlacement[]): PositionStrategy {
    if (!elementRef) {
      return this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
    } else {
      return this.overlay
        .position()
        .flexibleConnectedTo(elementRef)
        .withPositions(this.setConnectedPosition(...placement))
        .withLockedPosition(true);
    }
  }

  setPosition(position?: XPosition, width?: string, height?: string): PositionStrategy {
    let result = this.overlay
      .position()
      .global()
      .width(width)
      .height(height);
    if (position === 'left') {
      return result.left();
    } else if (position === 'right') {
      return result.right();
    } else if (position === 'top') {
      return result.top();
    } else if (position === 'bottom') {
      return result.bottom();
    }
  }

  setPlace(place: XPlace, offset?: string, width?: string, height?: string): PositionStrategy {
    let result = this.overlay
      .position()
      .global()
      .width(width)
      .height(height);
    switch (place) {
      case 'top-start':
        return result.top(offset).left(offset);
      case 'top':
        return result.centerHorizontally().top(offset);
      case 'top-end':
        return result.top(offset).right(offset);
      case 'left':
        return result.centerVertically().left(offset);
      case 'center':
        return result.centerVertically().centerHorizontally();
      case 'right':
        return result.centerVertically().right(offset);
      case 'bottom-start':
        return result.bottom(offset).left(offset);
      case 'bottom':
        return result.centerHorizontally().bottom(offset);
      case 'bottom-end':
        return result.bottom(offset).right(offset);
      default:
        return result.centerVertically().centerHorizontally();
    }
  }

  private createOverlayRef(option?: XPortalInput): OverlayRef {
    return this.overlay.create(option.overlayConfig);
  }

  setConnectedPosition(...placement: XPlace[] | XPlacement[]): ConnectedPosition[] {
    let result: ConnectedPosition[] = [];
    placement.forEach(place => result.push(XPortalPlacement[place]));
    return result;
  }
}
