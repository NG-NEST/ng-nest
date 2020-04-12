import { Input, Output, EventEmitter } from '@angular/core';
import { XStatus, XPlace, XInputBoolean } from '@ng-nest/ui/core';
import { XAlertProperty } from '@ng-nest/ui/alert';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XDialogComponent } from './dialog.component';

/**
 * Dialog
 * @selector x-dialog
 * @decorator component
 */
export const XDialogPrefix = 'x-dialog';

export const XDialogPortal = 'x-dialog-portal';

/**
 * Dialog Property
 */
export class XDialogProperty extends XAlertProperty {
  @Input() @XInputBoolean() visible = false;
  /**
   * 方位，九宫格
   */
  @Input() placement: XPlace = 'center';
  /**
   * 偏移距离
   */
  @Input() offset: string = '1rem';
  /**
   * 类型
   */
  @Input() type: XDialogType = 'info';
  /**
   * 宽度
   */
  @Input() width: string = '40%';
  /**
   * 高度
   */
  @Input() height?: string;
  /**
   * 显示取消按钮
   */
  @Input('show-cancel') showCancel: boolean = true;
  /**
   * 取消按钮文字
   */
  @Input('cancel-text') cancelText: string = '取消';
  /**
   * 显示确认按钮
   */
  @Input('show-confirm') showConfirm: boolean = true;
  /**
   * 确认按钮文字
   */
  @Input('confirm-text') confirmText: string = '确认';
  /**
   * 点击遮罩关闭
   */
  @Input('backdrop-close') backdropClose: boolean = true;
  /**
   * 是否显示背景遮罩
   */
  @Input('has-backdrop') hasBackdrop?: boolean = true;
  /**
   * 自定义样式名
   */
  @Input('class-name') className: string = '';
  /**
   * 关闭前处理函数
   */
  @Input('before-close') beforeClose: Function;
  /**
   * 取消按钮的事件
   */
  @Output() cancel = new EventEmitter();
  /**
   * 确认按钮的事件
   */
  @Output() confirm = new EventEmitter();
}

export interface XDialogCallback {
  (action: XDialogAction, message?: string): void;
}

export type XDialogAction = 'confirm' | 'cancel';

/**
 * 创建的消息对象
 */
export interface XDialogOverlayRef extends XPortalOverlayRef<XDialogComponent> {}

export interface XDialogRef {
  ref?: XDialogOverlayRef;
  input?: XDialogProperty;
}

/**
 * 类型
 */
export type XDialogType = XStatus;
