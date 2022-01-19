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
export const X_MESSAGE_CONFIG_NAME = 'message';

/**
 * Message Option
 */
export interface XMessageOption extends XAlertOption {
  /**
   * @zh_CN 消息框的 id
   * @en_US Message id
   */
  id?: string;
  /**
   * @zh_CN 方位，九宫格
   * @en_US Direction, nine grid
   * @default 'top'
   * @withConfig true
   */
  placement?: XPlace;
  /**
   * @zh_CN 偏移距离
   * @en_US Offset distance
   * @default '2rem'
   * @withConfig true
   */
  offset?: string | string[];
  /**
   * @zh_CN 类型
   * @en_US Types of
   * @default 'info'
   * @withConfig true
   */
  type?: XMessageType;
  /**
   * @zh_CN 多个消息的时候，显示类型
   * @en_US When multiple messages, the display type
   * @default 'list'
   * @withConfig true
   */
  displayType?: XMessageDisplayType;
  /**
   * @zh_CN 宽度
   * @en_US Width
   * @default '16rem'
   * @withConfig true
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
   * @default 3000
   * @withConfig true
   */
  duration?: number;
  /**
   * @zh_CN 隐藏关闭按钮
   * @en_US Hide close button
   * @default true
   * @withConfig true
   */
  hideClose?: boolean;
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   * @default true
   * @withConfig true
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
export interface XMessageOverlayRef extends XPortalOverlayRef<XMessageComponent> {}

/**
 * @zh_CN 九宫格中的消息对象
 * @en_US Message object in Jiugongge
 */
export interface XMessagePlacement {
  [property: string]: XMessagePlacementRef;
}

/**
 * @zh_CN 九宫格中的消息对象
 * @en_US Message object in Jiugongge
 */
export interface XMessagePlacementRef {
  /**
   * @zh_CN 方位对应的 overlayRef
   * @en_US Placement overlayRef
   */
  ref: XMessageOverlayRef;
  /**
   * @zh_CN 对应的消息 list 数据
   * @en_US Corresponding message list data
   */
  list: XMessageOption[];
  /**
   * @zh_CN 关闭所有数据
   * @en_US Close all data
   */
  closeAll: () => void;
}

/**
 * @zh_CN 类型
 * @en_US Types of
 */
export type XMessageType = XStatus;

/**
 * @zh_CN 多个消息的时候，显示类型
 * @en_US When multiple messages, the display type
 */
export type XMessageDisplayType = 'list' | 'single';
