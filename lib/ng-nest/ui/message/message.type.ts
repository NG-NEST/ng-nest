import { InjectionToken, ComponentRef } from '@angular/core';
import { XStatus, XPlace } from '@ng-nest/ui/core';
import { XAlertInput } from '@ng-nest/ui/alert';
import { ComponentPortal } from '@angular/cdk/portal';
import { XMessageComponent } from './message.component';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';

/**
 * Message 组件名
 * @selector x-message
 * @decorator component
 */
export const XMessagePrefix = 'x-message';

export const XMessagePortal = 'x-message-portal';

/**
 * Message @Input
 */
export interface XMessageInput extends XAlertInput {
  /**
   * 方位，九宫格
   * @default 'top'
   */
  placement?: XPlace;
  /**
   * 偏移距离
   * @default '2rem'
   */
  offset?: string;
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
export interface XMessageOverlayRef extends XPortalOverlayRef {
  componentPortal: ComponentPortal<XMessageComponent>;
  componentRef: ComponentRef<XMessageComponent>;
}

/**
 * 九宫格中的消息对象
 */
export interface XMessagePlacement {
  [prototype: string]: XMessageRef;
}

export interface XMessageRef {
  ref?: XMessageOverlayRef;
  list?: XMessageInput[];
}

/**
 * 类型
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "error"
 */
export type XMessageType = XStatus;
