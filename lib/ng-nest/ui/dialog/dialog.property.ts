import { Component, ViewContainerRef, InjectionToken, input, model, output } from '@angular/core';
import { XProperty, XPropertyFunction, XToCssPixelValue, XToBoolean, XToNumber } from '@ng-nest/ui/core';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XDialogComponent } from './dialog.component';
import { XDialogPortalComponent } from './dialog-portal.component';
import type { XStatus, XPlace, XTemplate, XEffect, XBoolean, XNumber } from '@ng-nest/ui/core';

/**
 * Dialog
 * @selector x-dialog
 * @decorator component
 */
export const XDialogPrefix = 'x-dialog';
export const X_DIALOG_CONFIG_NAME = 'dialog';
export const XDialogContainer = 'x-dialog-overlay';
export const X_DIALOG_DATA = new InjectionToken<any>('XDialogData');

/**
 * Dialog Property
 */
@Component({ selector: `${XDialogPrefix}-property`, template: '' })
export class XDialogProperty extends XPropertyFunction(X_DIALOG_CONFIG_NAME) {
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  readonly title = input<XTemplate>();
  /**
   * @zh_CN 显示/隐藏
   * @en_US Show/hide
   */
  readonly visible = model<boolean>(false);
  /**
   * @zh_CN 方位，九宫格
   * @en_US Direction, nine grid
   */
  readonly placement = input<XPlace>(this.config?.placement ?? 'center');
  /**
   * @zh_CN 偏移距离
   * @en_US Offset distance
   */
  readonly offset = input<string, XNumber>(this.config?.offset ?? '1rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  readonly type = input<XDialogType>('info');
  /**
   * @zh_CN 隐藏关闭按钮
   * @en_US Hide close button
   */
  readonly hideClose = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 使用文本关闭按钮
   * @en_US Use the text to close button
   */
  readonly closeText = input<string>();
  /**
   * @zh_CN 调整弹框的大小(弃用)
   * @en_US Adjust the size of the box, Abandoned
   * @deprecated abandoned
   */
  readonly resizable = input<boolean, XBoolean>(this.config?.resizable ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 开启 resizable 调整大小，偏移屏幕左边(弃用)
   * @en_US Open the resizable resize, offset screen left, Abandoned
   * @deprecated abandoned
   */
  readonly offsetLeft = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 开启 resizable 调整大小，偏移屏幕顶部(弃用)
   * @en_US Open the resizable resize, offset screen top, Abandoned
   * @deprecated abandoned
   */
  readonly offsetTop = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  readonly width = input<string, XNumber>(this.config?.width ?? '32rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  readonly height = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 最小宽度
   * @en_US Min width
   */
  readonly minWidth = input<string, XNumber>(this.config?.minWidth ?? '18rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 最小高度
   * @en_US Min height
   */
  readonly minHeight = input<string, XNumber>(this.config?.minHeight ?? '8rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 样式主题
   * @en_US Style theme
   */
  readonly effect = input<XEffect>(this.config?.effect ?? 'white');
  /**
   * @zh_CN 底部自定义模板
   * @en_US Custom template at the bottom
   */
  readonly footer = input<XTemplate>();
  /**
   * @zh_CN 显示取消按钮
   * @en_US Show cancel button
   */
  readonly showCancel = input<boolean, XBoolean>(this.config?.showCancel ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 取消按钮文字
   * @en_US Cancel button text
   * @default '取消'
   */
  readonly cancelText = input<string>(this.config?.cancelText ?? '');
  /**
   * @zh_CN 显示确认按钮
   * @en_US Show confirmation button
   */
  readonly showConfirm = input<boolean, XBoolean>(this.config?.showConfirm ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 确认按钮文字
   * @en_US Confirm button text
   * @default '确认'
   */
  readonly confirmText = input<string>(this.config?.confirmText ?? '');
  /**
   * @zh_CN 点击遮罩关闭
   * @en_US Click the mask to close
   */
  readonly backdropClose = input<boolean, XBoolean>(this.config?.backdropClose ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 是否显示背景遮罩
   * @en_US Whether to display the background mask
   */
  readonly hasBackdrop = input<boolean, XBoolean>(this.config?.hasBackdrop ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 是否支持键盘 esc 关闭
   * @en_US Whether to support keyboard esc to close
   */
  readonly keyboard = input<boolean, XBoolean>(this.config?.keyboard ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 自定义样式名
   * @en_US Custom style name
   */
  readonly className = input<string>(this.config?.className ?? '');
  /**
   * @zh_CN 按钮居中
   * @en_US Button center
   */
  readonly buttonsCenter = input<boolean, XBoolean>(this.config?.buttonsCenter ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 拖动对话框
   * @en_US Drag dialog
   */
  readonly draggable = input<boolean, XBoolean>(this.config?.draggable ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 最大化弹出框按钮，当启用 resizable 时也会显示
   * @en_US Maximize the bullet box button, Will also display when resizable is enabled
   */
  readonly maximize = input<boolean, XBoolean>(this.config?.maximize ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 关闭前处理函数
   * @en_US Processing function before closing
   */
  readonly beforeClose = input<(action: XDialogAction) => void>();
  /**
   * @zh_CN 取消按钮的事件
   * @en_US Cancel button event
   */
  readonly cancel = output();
  /**
   * @zh_CN 确认按钮的事件
   * @en_US Confirm button event
   */
  readonly confirm = output();
  /**
   * @zh_CN 确认按钮的事件
   * @en_US Confirm button event
   */
  readonly close = output();
  /**
   * @zh_CN 弹出完成动画加载
   * @en_US Pop up complete animation loading
   */
  readonly showDone = output<any>();
  /**
   * @zh_CN 关闭完成动画
   * @en_US Close complete animation
   */
  readonly closeDone = output<any>();
}

/**
 * Dialog Container
 * @selector x-dialog-container
 * @decorator component
 */
export const XDialogContainerPrefix = 'x-dialog-container';
export const X_DIALOG_CONTAINER = new InjectionToken('X_DIALOG_CONTAINER');

/**
 * Dialog Container Property
 */
@Component({ selector: `${XDialogContainerPrefix}-property`, template: '' })
export class XDialogContainerProperty extends XProperty {}

/**
 * Dialog option by service
 */
export interface XDialogRefOption {
  /**
   * @zh_CN 展示方向
   * @en_US Display direction
   * @default 'center'
   * @withConfig true
   */
  placement?: XPlace;
  /**
   * @zh_CN 偏移距离
   * @en_US Offset distance
   * @default '1rem'
   * @withConfig true
   */
  offset?: string;
  /**
   * @zh_CN 宽度
   * @en_US Width
   * @default '32rem'
   * @withConfig true
   */
  width?: string;
  /**
   * @zh_CN 高度
   * @en_US Height
   */
  height?: string;
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
   * @zh_CN 拖动对话框
   * @en_US Drag dialog
   * @default false
   * @withConfig true
   */
  draggable?: boolean;
  /**
   * @zh_CN 调整弹框的大小(弃用)
   * @en_US Adjust the size of the box, Abandoned
   * @default false
   * @withConfig true
   * @deprecated abandoned
   */
  resizable?: boolean;
  /**
   * @zh_CN 最小宽度
   * @en_US Min width
   * @default '18rem'
   * @withConfig true
   */
  minWidth?: string;
  /**
   * @zh_CN 最小高度
   * @en_US Min height
   * @default '8rem'
   * @withConfig true
   */
  minHeight?: string;
  /**
   * @zh_CN 是否支持键盘 esc 关闭
   * @en_US Whether to support keyboard esc to close
   * @default true
   * @withConfig true
   */
  keyboard?: boolean;
  /**
   * @zh_CN 数据，通过 "@Inject(X_DIALOG_DATA)" 来接收数据
   * @en_US Data. Receive data by "@Inject(X_DIALOG_DATA)"
   */
  data?: any;
  /**
   * @zh_CN 视图容器实例可以包含其他视图容器。
   * @en_US A view container instance can contain other view containers.
   */
  viewContainerRef?: ViewContainerRef;
}

/**
 * @zh_CN 弹框动画状态
 * @en_US Dialog animation status
 */
export type XDialogAnimationState = XPlace | 'void';

/**
 * @zh_CN 弹框动画事件
 * @en_US Dialog animation Event
 */
export interface XDialogAnimationEvent {
  animationName: string;
  action: 'start' | 'end';
}

/**
 * @zh_CN 关闭的回调函数类型
 * @en_US Closed callback function type
 */
export interface XDialogCallback {
  (action: XDialogAction, message?: string): void;
}

/**
 * @zh_CN 触发关闭的类型
 * @en_US Type of trigger closure
 */
export type XDialogAction = 'confirm' | 'cancel' | 'close';

/**
 * @zh_CN 创建的弹框对象
 * @en_US Dialog object created
 */
export interface XDialogOverlayRef extends XPortalOverlayRef<XDialogComponent> {}

/**
 * @zh_CN 创建的弹框对象，通过服务
 * @en_US Dialog object created by service
 */
export interface XDialogPortalOverlayRef extends XPortalOverlayRef<XDialogPortalComponent> {}

/**
 * @zh_CN 类型
 * @en_US Types of
 */
export type XDialogType = XStatus;
