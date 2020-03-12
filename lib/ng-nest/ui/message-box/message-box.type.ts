import { InjectionToken, ComponentRef } from '@angular/core';
import { XStatus, XPlace } from '@ng-nest/ui/core';
import { XAlertInput } from '@ng-nest/ui/alert';
import { ComponentPortal } from '@angular/cdk/portal';
import { XMessageBoxComponent } from './message-box.component';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';

/**
 * MessageBox 组件名
 * @selector x-message-box
 * @decorator component
 */
export const XMessageBoxPrefix = 'x-message-box';

export const XMessageBoxPortal = 'x-message-box-portal';

/**
 * MessageBox @Input
 */
export interface XMessageBoxInput extends XAlertInput {
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
  type?: XMessageBoxType;
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
   * 显示取消按钮
   */
  showCancel?: boolean;
  /**
   * 关闭回调
   */
  callback?: XMessageBoxCallback;
  /**
   * 点击遮罩关闭
   * @default false
   */
  backdropClose?: boolean;
  /**
   * 确认按钮文字
   * @default '确定'
   */
  confirmText?: string;
  /**
   * 取消按钮文字
   * @default '取消'
   */
  cancelText?: string;
  /**
   * 是否显示输入框
   */
  showInput?: boolean;
  /**
   * 匹配规则
   */
  inputPattern?: RegExp;
  /**
   * 匹配失败的信息提示
   */
  inputErrorMessage?: string;
  /**
   * 输入框的占位符
   */
  inputPlaceholder?: string;
  /**
   * 输入框的类型
   */
  inputType?: string;
  /**
   * 输入框的类型
   */
  inputValue?: string;
  /**
   * 输入框的验证函数
   */
  inputValidator?: Function;
}

export interface XMessageBoxCallback {
  (action: XMessageBoxAction, message?: string): void;
}

export type XMessageBoxAction = 'confirm' | 'cancel';

/**
 * 创建的消息对象
 */
export interface XMessageBoxOverlayRef extends XPortalOverlayRef {
  componentPortal: ComponentPortal<XMessageBoxComponent>;
  componentRef: ComponentRef<XMessageBoxComponent>;
}

export interface XMessageBoxRef {
  ref?: XMessageBoxOverlayRef;
  input?: XMessageBoxInput;
}

/**
 * 类型
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "error"
 */
export type XMessageBoxType = XStatus;
