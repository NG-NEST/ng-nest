import { Injectable, TemplateRef, Injector, InjectionToken, ElementRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import {
  Overlay,
  OverlayRef,
  PositionStrategy,
  OriginConnectionPosition,
  OverlayConnectionPosition
} from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { XPortalServiceModule } from './portal.service.module';
import { XPortalInput, XPortalOverlayRef } from './portal.type';
import { XPlacement, XPosition, XPlace } from '@ng-nest/ui/core';

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
    let componentRef: ComponentRef<any>;
    let embeddedViewRef: EmbeddedViewRef<any>;
    if (option.content instanceof TemplateRef) {
      templatePortal = new TemplatePortal(option.content, option.viewContainerRef, option.context);
      embeddedViewRef = overlayRef.attach(templatePortal);
    } else {
      componentPortal = new ComponentPortal(
        option.content,
        option.viewContainerRef,
        option.injector,
        option.componentFactoryResolver
      );
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

  createInjector(data, token: InjectionToken<any>): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(token, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  setPlacement(elementRef?: ElementRef, placement?: XPlacement): PositionStrategy {
    if (!elementRef) {
      return this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
    } else {
      let originPos: OriginConnectionPosition;
      let overlayPos: OverlayConnectionPosition;
      switch (placement) {
        case 'bottom':
          originPos = { originX: 'center', originY: 'bottom' };
          overlayPos = { overlayX: 'center', overlayY: 'top' };
          break;
        case 'bottom-end':
          originPos = { originX: 'end', originY: 'bottom' };
          overlayPos = { overlayX: 'end', overlayY: 'top' };
          break;
        case 'bottom-start':
          originPos = { originX: 'start', originY: 'bottom' };
          overlayPos = { overlayX: 'start', overlayY: 'top' };
          break;
        case 'left':
          originPos = { originX: 'start', originY: 'center' };
          overlayPos = { overlayX: 'end', overlayY: 'center' };
          break;
        case 'left-end':
          originPos = { originX: 'start', originY: 'bottom' };
          overlayPos = { overlayX: 'end', overlayY: 'bottom' };
          break;
        case 'left-start':
          originPos = { originX: 'start', originY: 'top' };
          overlayPos = { overlayX: 'end', overlayY: 'top' };
          break;
        case 'right':
          originPos = { originX: 'end', originY: 'center' };
          overlayPos = { overlayX: 'start', overlayY: 'center' };
          break;
        case 'right-end':
          originPos = { originX: 'end', originY: 'bottom' };
          overlayPos = { overlayX: 'start', overlayY: 'bottom' };
          break;
        case 'right-start':
          originPos = { originX: 'end', originY: 'top' };
          overlayPos = { overlayX: 'start', overlayY: 'top' };
          break;
        case 'top':
          originPos = { originX: 'center', originY: 'top' };
          overlayPos = { overlayX: 'center', overlayY: 'bottom' };
          break;
        case 'top-end':
          originPos = { originX: 'end', originY: 'top' };
          overlayPos = { overlayX: 'end', overlayY: 'bottom' };
          break;
        case 'top-start':
          originPos = { originX: 'start', originY: 'top' };
          overlayPos = { overlayX: 'start', overlayY: 'bottom' };
          break;
      }
      return this.overlay.position().connectedTo(elementRef, originPos, overlayPos);
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
}
