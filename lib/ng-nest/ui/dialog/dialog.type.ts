import { InjectionToken, ComponentRef } from '@angular/core';
import { XStatus, XPlace } from '@ng-nest/ui/core';
import { XAlertInput } from '@ng-nest/ui/alert';
import { ComponentPortal } from '@angular/cdk/portal';
import { XDialogComponent } from './dialog.component';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';

/**
 * Dialog 组件名
 * @selector x-dialog
 * @decorator component
 */
export const XDialogPrefix = 'x-dialog';

export const XDialogPortal = 'x-dialog-portal';

/**
 * Dialog @Input
 */
export interface XDialogInput extends XAlertInput {
  /**
   * 方位，九宫格
   * @default 'top'
   */
  placement?: XPlace;
  /**
   * 偏移距离
   * @default '1rem'
   */
  offset?: string;
  /**
   * 类型
   * @default 'info'
   */
  type?: XDialogType;
  /**
   * 宽度
   * @default '40%'
   */
  width?: string;
  /**
   * 高度
   */
  height?: string;
  /**
   * 显示取消按钮
   * @default true
   */
  showCancel?: boolean;
  /**
   * 取消按钮文字
   * @default '取消'
   */
  cancelText?: string;
  /**
   * 显示确认按钮
   * @default true
   */
  showConfirm?: boolean;
  /**
   * 确认按钮文字
   * @default '确认'
   */
  confirmText?: string;
  /**
   * 点击遮罩关闭
   * @default true
   */
  backdropClose?: boolean;
  /**
   * 是否显示背景遮罩
   * @default true
   */
  hasBackdrop?: boolean;
  /**
   * 自定义样式名
   */
  className?: string;
}

export interface XDialogCallback {
  (action: XDialogAction, message?: string): void;
}

export type XDialogAction = 'confirm' | 'cancel';

/**
 * 创建的消息对象
 */
export interface XDialogOverlayRef extends XPortalOverlayRef {}

export interface XDialogRef {
  ref?: XDialogOverlayRef;
  input?: XDialogInput;
}

/**
 * 类型
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "error"
 */
export type XDialogType = XStatus;
