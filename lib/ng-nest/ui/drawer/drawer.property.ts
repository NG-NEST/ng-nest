import { XTemplate, XPosition, XProperty, XInputBoolean, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component, InjectionToken, ViewContainerRef } from '@angular/core';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XDrawerContainerComponent } from './drawer-container.component';
import { XDrawerRef } from './drawer-ref';

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
@Component({ template: '' })
export class XDrawerProperty extends XProperty {
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  @Input() title?: XTemplate;
  /**
   * @zh_CN 显示/隐藏
   * @en_US Show/hide
   */
  @Input() @XInputBoolean() visible?: XBoolean;
  /**
   * @zh_CN 展示方向
   * @en_US Display direction
   */
  @Input() @XWithConfig<XPosition>(X_DRAWER_CONFIG_NAME, 'right') placement?: XPosition;
  /**
   * @zh_CN 尺寸，支持固定值
   * @en_US Size, supports fixed value
   */
  @Input() @XWithConfig<string>(X_DRAWER_CONFIG_NAME, '30%') size?: string;
  /**
   * @zh_CN 点击遮罩关闭
   * @en_US Click the mask to close
   */
  @Input() @XWithConfig<XBoolean>(X_DRAWER_CONFIG_NAME, true) backdropClose!: XBoolean;
  /**
   * @zh_CN 是否显示背景遮罩
   * @en_US Whether to display the background mask
   */
  @Input() @XWithConfig<XBoolean>(X_DRAWER_CONFIG_NAME, true) hasBackdrop!: XBoolean;
  /**
   * @zh_CN 自定义样式名
   * @en_US Custom style name
   */
  @Input() @XWithConfig<string>(X_DRAWER_CONFIG_NAME, '') className!: string;
  /**
   * @zh_CN 关闭的事件
   * @en_US Closed event
   */
  @Output() close = new EventEmitter();
  /**
   * @zh_CN 显示/隐藏的事件
   * @en_US Show/hide event
   */
  @Output() visibleChange = new EventEmitter<boolean>();
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
   * @en_US 视图容器实例可以包含其他视图容器。
   * @en_US A view container instance can contain other view containers.
   */
  viewContainerRef?: ViewContainerRef;
}

/**
 * @zh_CN 创建的抽屉对象
 * @en_US Drawer object created
 */
export interface XDrawerOverlayRef extends XPortalOverlayRef<XDrawerContainerComponent> {
  drawerRef?: XDrawerRef<any>;
}

export type XDrawerAnimationState = XPosition | 'void';

export interface XDrawerAnimationEvent {
  state: XDrawerAnimationState;
  action: 'start' | 'done';
  totalTime: number;
}
