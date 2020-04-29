import { XStatus, XPlace } from '@ng-nest/ui/core';
import { XAlertOption } from '@ng-nest/ui/alert';
import { Subscription, Subject } from 'rxjs';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XMessageComponent } from './message.component';

/**
 * Message
 * @selector x-message
 * @decorator component
 */
export const XMessagePrefix = 'x-message';

export const XMessagePortal = 'x-message-portal';

/**
 * Message Option
 */
export interface XMessageOption extends XAlertOption {
  /**
   * 方位，九宫格
   * @default 'top'
   */
  placement?: XPlace;
  /**
   * 偏移距离
   * @default '2rem'
   */
  offset?: string | string[];
  /**
   * 类型
   * @default 'info'
   */
  type?: XMessageType;
  /**
   * 宽度
   * @default '16rem'
   */
  width?: string;
  /**
   * 高度
   */
  height?: string;
  /**
   * 延迟关闭时间
   * @default 3000
   */
  duration?: number;
  /**
   * 隐藏关闭按钮
   * @default true
   */
  hideClose?: boolean;
  /**
   * 显示图标
   * @default true;
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
export interface XMessageOverlayRef extends XPortalOverlayRef<XMessageComponent> {}

/**
 * 九宫格中的消息对象
 */
export interface XMessagePlacement {
  [prop: string]: XMessageRef;
}

export interface XMessageRef {
  ref?: XMessageOverlayRef;
  list?: XMessageOption[];
}

/**
 * 类型
 */
export type XMessageType = XStatus;
