import { XStatus, XPlace } from '@ng-nest/ui/core';
import { XAlertOption } from '@ng-nest/ui/alert';
import { XMessageBoxComponent } from './message-box.component';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';

/**
 * MessageBox
 * @selector x-message-box
 * @decorator component
 */
export const XMessageBoxPrefix = 'x-message-box';

export const XMessageBoxPortal = 'x-message-box-portal';

/**
 * MessageBox Option
 */
export interface XMessageBoxOption extends XAlertOption {
  /**
   * @zh_CN 方位，九宫格
   * @en_US Direction, nine grid
   * @default 'top'
   */
  placement?: XPlace;
  /**
   * @zh_CN 偏移距离
   * @en_US Offset distance
   * @default '2rem'
   */
  offset?: string | string[];
  /**
   * @zh_CN 类型
   * @en_US Types of
   * @default 'info'
   */
  type?: XMessageBoxType;
  /**
   * @zh_CN 宽度
   * @en_US Width
   * @default '16rem'
   */
  width?: string;
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  height?: string;
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
   * @zh_CN 显示取消按钮
   * @en_US Show cancel button
   */
  showCancel?: boolean;
  /**
   * @zh_CN 关闭事件
   * @en_US Close event
   */
  callback?: XMessageBoxCallback;
  /**
   * @zh_CN 点击遮罩关闭
   * @en_US Click the mask to close
   * @default false
   */
  backdropClose?: boolean;
  /**
   * @zh_CN 确认按钮文字
   * @en_US Confirm button text
   * @default '确定'
   */
  confirmText?: string;
  /**
   * @zh_CN 取消按钮文字
   * @en_US Cancel button text
   * @default '取消'
   */
  cancelText?: string;
  /**
   * @zh_CN 是否显示输入框
   * @en_US Whether to show the input box
   */
  showInput?: boolean;
  /**
   * @zh_CN 匹配规则
   * @en_US Matching rules
   */
  inputPattern?: RegExp;
  /**
   * @zh_CN 匹配失败的信息提示
   * @en_US Information prompt for matching failure
   */
  inputInvalidMessage?: string;
  /**
   * @zh_CN 输入框的占位符
   * @en_US Placeholder for input box
   */
  inputPlaceholder?: string;
  /**
   * @zh_CN 输入框的类型
   * @en_US Type of input box
   */
  inputType?: string;
  /**
   * @zh_CN 输入框的值
   * @en_US Value of input box
   */
  inputValue?: string;
  /**
   * @zh_CN 输入框的验证函数
   * @en_US Validation function of input box
   */
  inputValidator?: Function;
}

export interface XMessageBoxCallback {
  (action: XMessageBoxAction, message?: string): void;
}

export type XMessageBoxAction = 'confirm' | 'cancel' | 'close';

/**
 * @zh_CN 创建的消息对象
 * @en_US Message object created
 */
export interface XMessageBoxOverlayRef extends XPortalOverlayRef<XMessageBoxComponent> {}

export interface XMessageBoxRef {
  ref?: XMessageBoxOverlayRef;
  input?: XMessageBoxOption;
}

/**
 * @zh_CN 类型
 * @en_US Types of
 */
export type XMessageBoxType = XStatus;
