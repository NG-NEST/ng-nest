import { Injectable, TemplateRef, Injector, InjectionToken, ElementRef } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy, ConnectedPosition, ComponentType } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { XPortalProperty, XPortalOverlayRef, XPortalPlacement } from './portal.property';
import { XPlacement, XPosition, XPlace } from '@ng-nest/ui/core';

/**
 * 动态创建视图服务
 */
@Injectable()
export class XPortalService {
  constructor(public overlay: Overlay, public injector: Injector) {}

  attach<T>(option: XPortalProperty): XPortalOverlayRef<T> {
    let portal: XPortalOverlayRef<T> = {};
    if (typeof option.content === 'undefined') return portal;
    portal.overlayRef = this.createOverlayRef(option);
    if (option.content instanceof TemplateRef && option.viewContainerRef) {
      portal.templatePortal = new TemplatePortal(option.content, option.viewContainerRef, option.context);
      portal.embeddedViewRef = portal.overlayRef.attach(portal.templatePortal);
    } else {
      portal.componentPortal = new ComponentPortal(
        option.content as ComponentType<any>,
        option.viewContainerRef,
        option.injector,
        option.componentFactoryResolver
      );
      portal.componentRef = portal.overlayRef.attach(portal.componentPortal);
    }

    return portal;
  }

  createInjector(data: any, token: InjectionToken<any>): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(token, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  setPlacement(elementRef?: ElementRef, ...placement: XPlace[] | XPlacement[]): PositionStrategy {
    if (!elementRef) {
      return this.overlay.position().global().centerHorizontally().centerVertically();
    } else {
      return this.overlay
        .position()
        .flexibleConnectedTo(elementRef)
        .withPositions(this.setConnectedPosition(...placement))
        .withLockedPosition(true);
    }
  }

  setPosition(position?: XPosition, width?: string, height?: string): PositionStrategy {
    let result = this.overlay.position().global().width(width).height(height);
    switch (position) {
      case 'left':
        return result.left();
      case 'right':
        return result.right();
      case 'top':
        return result.top();
      case 'bottom':
      default:
        return result.bottom();
    }
  }

  setPlace(place?: XPlace, offset?: string, width?: string, height?: string): PositionStrategy {
    let result = this.overlay.position().global().width(width).height(height);
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

  private createOverlayRef(option: XPortalProperty): OverlayRef {
    return this.overlay.create(option.overlayConfig);
  }

  setConnectedPosition(...placement: XPlace[] | XPlacement[]): ConnectedPosition[] {
    let result: ConnectedPosition[] = [];
    placement.forEach((place: XPlace | XPlacement) => result.push(XPortalPlacement[place]));
    return result;
  }
}
