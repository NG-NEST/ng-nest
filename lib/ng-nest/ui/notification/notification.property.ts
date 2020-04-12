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
   * 方位
   * @default 'top-end'
   */
  placement?: XCorner;
  /**
   * 偏移距离
   * @default '0.5rem'
   */
  offset?: string;
  /**
   * 类型
   * @default 'info'
   */
  type?: XNotificationType;
  /**
   * 宽度
   * @default '20rem'
   */
  width?: string;
  /**
   * 高度
   */
  height?: string;
  /**
   * 延迟关闭时间
   * @default 4500
   */
  duration?: number;
  /**
   * 隐藏关闭按钮
   * @default true
   */
  hideClose?: boolean;
  /**
   * 显示图标
   * @default true
   */
  showIcon?: boolean;
  /**
   * 延迟关闭订阅后的对象，用来释放或取消
   */
  duration$?: Subscription | null;
  /**
   * 延迟关闭订阅对象
   */
  durationSub?: Subject<any>;
}

/**
 * 创建的消息对象
 */
export interface XNotificationOverlayRef extends XPortalOverlayRef<XNotificationComponent> {}

/**
 * 九宫格中的消息对象
 */
export interface XNotificationPlacement {
  [prototype: string]: XNotificationRef;
}

export interface XNotificationRef {
  ref?: XNotificationOverlayRef;
  list?: XNotificationOption[];
}

/**
 * 类型
 */
export type XNotificationType = XStatus;
