import { ComponentRef } from '@angular/core';
import { XStatus, XCorner } from '@ng-nest/ui/core';
import { XAlertOption } from '@ng-nest/ui/alert';
import { ComponentPortal } from '@angular/cdk/portal';
import { XNotificationComponent } from './notification.component';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';

/**
 * Notification
 * @selector x-notification
 * @decorator component
 */
export const XNotificationPrefix = 'x-notification';

export const XNotificationPortal = 'x-notification-portal';

/**
 * Notification Option
 */
export interface XNotificationOption extends XAlertOption {
  /**
   * @zh_CN 方位
   * @en_US Placement
   * @default 'top-end'
   */
  placement?: XCorner;
  /**
   * @zh_CN 偏移距离
   * @en_US Offset distance
   * @default '0.5rem'
   */
  offset?: string | string[];
  /**
   * @zh_CN 类型
   * @en_US Types of
   * @default 'info'
   */
  type?: XNotificationType;
  /**
   * @zh_CN 宽度
   * @en_US Width
   * @default '20rem'
   */
  width?: string;
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  height?: string;
  /**
   * @zh_CN 延迟关闭时间
   * @en_US Delay off time
   * @default 4500
   */
  duration?: number;
  /**
   * @zh_CN 隐藏关闭按钮
   * @en_US Hide close button
   * @default true
   */
  hideClose?: boolean;
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * @zh_CN 延迟关闭订阅后的对象，用来释放或取消
   * @en_US Delayed closing the subscribed object, used to release or cancel
   */
  duration$?: Subscription | null;
  /**
   * @zh_CN 延迟关闭订阅对象
   * @en_US Delay in closing the subscription object
   */
  durationSub?: Subject<any>;
}

/**
 * @zh_CN 创建的消息对象
 * @en_US Message object created
 */
export interface XNotificationOverlayRef extends XPortalOverlayRef<XNotificationComponent> {}

/**
 * @zh_CN 九宫格中的消息对象
 * @en_US Message object in nine grid
 */
export interface XNotificationPlacement {
  [prototype: string]: XNotificationRef;
}

export interface XNotificationRef {
  ref?: XNotificationOverlayRef;
  list?: XNotificationOption[];
}

/**
 * @zh_CN 类型
 * @en_US Types of
 */
export type XNotificationType = XStatus;
