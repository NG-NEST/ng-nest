import {
  Injectable,
  TemplateRef,
  Injector,
  ElementRef,
  ViewContainerRef,
  StaticProvider,
  RendererFactory2,
  inject
} from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy, ConnectedPosition, ComponentType } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { XPortalProperty, XPortalOverlayRef, XPortalPlacement } from './portal.property';
import { XPlacement, XPosition, XPlace, XComputed } from '@ng-nest/ui/core';

/**
 * 动态创建视图服务
 */
@Injectable({ providedIn: 'root' })
export class XPortalService {
  overlay = inject(Overlay);
  injector = inject(Injector);
  private rendererFactory = inject(RendererFactory2);
  renderer = this.rendererFactory.createRenderer(null, null);

  attach<T>(option: XPortalProperty<T>): XPortalOverlayRef<T> {
    let portal: XPortalOverlayRef<T> = {};
    if (typeof option.content === 'undefined') return portal;
    portal.overlayRef = this.createOverlayRef(option);
    if (option.content instanceof TemplateRef && option.viewContainerRef) {
      portal.templatePortal = new TemplatePortal(option.content, option.viewContainerRef, option.context);
      portal.embeddedViewRef = portal.overlayRef.attach(portal.templatePortal);
    } else {
      portal.componentPortal = new ComponentPortal(
        option.content as ComponentType<T>,
        option.viewContainerRef,
        option.injector
      );
      portal.componentRef = portal.overlayRef.attach(portal.componentPortal);
    }

    return portal;
  }

  createInjector(providers: StaticProvider[], viewContainerRef?: ViewContainerRef) {
    const injector = viewContainerRef && viewContainerRef.injector;
    return Injector.create({ parent: injector || this.injector, providers });
  }

  setPlacement(param?: {
    elementRef?: ElementRef;
    placement?: XPlace[] | XPlacement[];
    transformOriginOn?: string;
  }): PositionStrategy {
    if (!param) {
      return this.overlay.position().global().centerHorizontally().centerVertically();
    } else {
      return (
        this.overlay
          .position()
          .flexibleConnectedTo(param.elementRef!)
          // .withLockedPosition(true)
          .withFlexibleDimensions(false)
          .withPush(false)
          .withPositions(this.setConnectedPosition(...param.placement!))
          .withTransformOriginOn(param.transformOriginOn!)
      );
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

  setPlace(place?: XPlace, ...offset: string[]): PositionStrategy {
    let result = this.overlay.position().global();
    let [top, right, bottom, left] = this.getOffset(offset);
    switch (place) {
      case 'top-start':
        return result.top(top).left(left);
      case 'top':
        return result.centerHorizontally().top(top);
      case 'top-end':
        return result.top(top).right(right);
      case 'left':
        return result.centerVertically().left(left);
      case 'center':
        return result.centerVertically().centerHorizontally();
      case 'right':
        return result.centerVertically().right(right);
      case 'bottom-start':
        return result.bottom(bottom).left(left);
      case 'bottom':
        return result.centerHorizontally().bottom(bottom);
      case 'bottom-end':
        return result.bottom(bottom).right(right);
      default:
        return result.centerVertically().centerHorizontally();
    }
  }

  setResizable(ele: HTMLElement, place?: XPlace) {
    const { clientWidth, clientHeight } = ele;
    const computedStyle = XComputed(ele);
    const marginRight = parseFloat(computedStyle.marginRight);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    let marginLeft = null;
    let marginTop = null;
    switch (place) {
      case 'top-start':
        break;
      case 'top':
        marginLeft = `calc(50vw - ${clientWidth / 2}px)`;
        break;
      case 'top-end':
        marginLeft = `calc(100vw - ${clientWidth + marginRight}px)`;
        break;
      case 'left':
        marginTop = `calc(50vh - ${clientHeight / 2}px)`;
        break;
      case 'center':
        marginLeft = `calc(50vw - ${clientWidth / 2}px)`;
        marginTop = `calc(50vh - ${clientHeight / 2}px)`;
        break;
      case 'right':
        marginLeft = `calc(100vw - ${clientWidth + marginRight}px)`;
        marginTop = `calc(50vh - ${clientHeight / 2}px)`;
        break;
      case 'bottom-start':
        marginTop = `calc(100vh - ${clientHeight + marginBottom}px)`;
        break;
      case 'bottom':
        marginLeft = `calc(50vw - ${clientWidth / 2}px)`;
        marginTop = `calc(100vh - ${clientHeight + marginBottom}px)`;
        break;
      case 'bottom-end':
        marginLeft = `calc(100vw - ${clientWidth + marginRight}px)`;
        marginTop = `calc(100vh - ${clientHeight + marginBottom}px)`;
        break;
      default:
        marginLeft = `calc(50vw - ${clientWidth / 2}px)`;
        marginTop = `calc(100vh - ${clientHeight / 2}px)`;
        break;
    }
    marginLeft && this.renderer.setStyle(ele, 'margin-left', marginLeft);
    marginTop && this.renderer.setStyle(ele, 'margin-top', marginTop);

    return {
      marginLeft: marginLeft || computedStyle.marginLeft,
      marginTop: marginTop || computedStyle.marginTop,
      marginBottom: computedStyle.marginBottom,
      marginRight: computedStyle.marginRight
    };
  }

  setContainerStyle(place?: XPlace, ...offset: string[]) {
    let [top, right, bottom, left] = this.getOffset(offset);
    switch (place) {
      case 'top-start':
        return { top, left };
      case 'top':
        return { top };
      case 'top-end':
        return { top, right };
      case 'left':
        return { left };
      case 'center':
        return {};
      case 'right':
        return { right };
      case 'bottom-start':
        return { bottom, left };
      case 'bottom':
        return { bottom };
      case 'bottom-end':
        return { bottom, right };
    }
    return {};
  }

  getOffset(offset: string[]) {
    if (offset.length === 0) offset = Array.from({ length: 4 }).map(() => `0`);
    else if (offset.length < 4) {
      Array.from({ length: 4 - offset.length }).map(() => (offset = [...offset, offset[offset.length - 1]]));
    }
    return offset;
  }

  createOverlayRef<T>(option: XPortalProperty<T>): OverlayRef {
    return this.overlay.create(option.overlayConfig);
  }

  setConnectedPosition(...placement: XPlace[] | XPlacement[]): ConnectedPosition[] {
    let result: ConnectedPosition[] = [];
    placement.forEach((place: XPlace | XPlacement) => result.push(XPortalPlacement[place]));
    return result;
  }
}
