import { XPropertyFunction, XProperty, XToCssPixelValue, XToBoolean } from '@ng-nest/ui/core';
import { Component, InjectionToken, ViewContainerRef, input, model, output } from '@angular/core';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XDrawerPortalComponent } from './drawer-portal.component';
import type { XDrawerRef } from './drawer-ref';
import type { XTemplate, XPosition, XBoolean, XNumber } from '@ng-nest/ui/core';

/**
 * Drawer
 * @selector x-drawer
 * @decorator component
 */
export const XDrawerPrefix = 'x-drawer';
export const X_DRAWER_CONFIG_NAME = 'drawer';
export const X_DRAWER_DATA = new InjectionToken<any>('XDrawerData');

/**
 * Drawer Property
 */
@Component({ selector: `${XDrawerPrefix}-property`, template: '' })
export class XDrawerProperty extends XPropertyFunction(X_DRAWER_CONFIG_NAME) {
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  readonly title = input<XTemplate>();
  /**
   * @zh_CN 显示/隐藏
   * @en_US Show/hide
   */
  readonly visible = model<boolean>(false);
  /**
   * @zh_CN 展示方向
   * @en_US Display direction
   */
  readonly placement = input<XPosition>(this.config?.placement ?? 'right');
  /**
   * @zh_CN 尺寸，支持固定值
   * @en_US Size, supports fixed value
   */
  readonly size = input<string, XNumber>(this.config?.size ?? '30%', { transform: XToCssPixelValue });
  /**
   * @zh_CN 点击遮罩关闭
   * @en_US Click the mask to close
   */
  readonly backdropClose = input<boolean, XBoolean>(this.config?.backdropClose ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 是否显示背景遮罩
   * @en_US Whether to display the background mask
   */
  readonly hasBackdrop = input<boolean, XBoolean>(this.config?.hasBackdrop ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 自定义样式名
   * @en_US Custom style name
   */
  readonly className = input<string>(this.config?.className ?? '');
  /**
   * @zh_CN 关闭的事件
   * @en_US Closed event
   */
  readonly close = output();
}

/**
 * Drawer Option
 */
export interface XDrawerOption {
  /**
   * @zh_CN 展示方向
   * @en_US Display direction
   * @default 'right'
   * @withConfig true
   */
  placement?: XPosition;
  /**
   * @zh_CN 尺寸，支持固定值
   * @en_US Size, supports fixed value
   * @default '30%'
   * @withConfig true
   */
  size?: string;
  /**
   * @zh_CN 自定义样式名
   * @en_US Custom style name
   */
  className?: string;
  /**
   * @zh_CN 点击遮罩关闭
   * @en_US Click the mask to close
   * @default true
   * @withConfig true
   */
  backdropClose?: boolean;
  /**
   * @zh_CN 是否显示背景遮罩
   * @en_US Whether to display the background mask
   * @default true
   * @withConfig true
   */
  hasBackdrop?: boolean;
  /**
   * @zh_CN 数据，通过 "@Inject(X_DRAWER_DATA)" 来接收数据
   * @en_US Data. Receive data by "@Inject(X_DRAWER_DATA)"
   */
  data?: any;
  /**
   * @zh_CN 视图容器实例可以包含其他视图容器。
   * @en_US A view container instance can contain other view containers.
   */
  viewContainerRef?: ViewContainerRef;
}

/**
 * Drawer Container
 * @selector x-drawer-container
 * @decorator component
 */
export const XDrawerContainerPrefix = 'x-drawer-container';
export const X_DRAWER_CONTAINER = new InjectionToken('X_DRAWER_CONTAINER');

/**
 * Drawer Container Property
 */
@Component({ selector: `${XDrawerContainerPrefix}-property`, template: '' })
export class XDrawerContainerProperty extends XProperty {}

/**
 * @zh_CN 创建的抽屉对象
 * @en_US Drawer object created
 */
export interface XDrawerPortalOverlayRef extends XPortalOverlayRef<XDrawerPortalComponent> {
  drawerRef?: XDrawerRef<any>;
}

/**
 * @zh_CN 抽屉动画状态
 * @en_US Drawer animation status
 */
export type XDrawerAnimationState = XPosition | 'void';

/**
 * @zh_CN 抽屉动画事件
 * @en_US Drawer animation event
 */
export interface XDrawerAnimationEvent {
  state: XDrawerAnimationState;
  action: 'start' | 'done';
  totalTime: number;
}
