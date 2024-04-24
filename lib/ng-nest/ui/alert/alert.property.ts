import { XPropertyFunction, XToBoolean, XToCssPixelValue, XToNumber } from '@ng-nest/ui/core';
import { Component, ElementRef, input, output } from '@angular/core';
import type { CdkDragEnd } from '@angular/cdk/drag-drop';
import type { XResizableEvent } from '@ng-nest/ui/resizable';
import type { XBoolean, XNumber, XEffect, XTemplate, XStatus } from '@ng-nest/ui/core';

/**
 * Alert
 * @selector x-alert
 * @decorator component
 */
export const XAlertPrefix = 'x-alert';
export const X_ALERT_CONFIG_NAME = 'alert';

/**
 * Alert Property
 */
@Component({ selector: `${XAlertPrefix}-property`, template: '' })
export class XAlertProperty extends XPropertyFunction(X_ALERT_CONFIG_NAME) {
  /**
   * @zh_CN 隐藏
   * @en_US Hide
   */
  readonly hide = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  readonly title = input<XTemplate>();
  /**
   * @zh_CN 内容
   * @en_US Content
   */
  readonly content = input<XTemplate>();
  /**
   * @zh_CN 类型
   * @en_US Alert type
   */
  readonly type = input<XAlertType>('info');
  /**
   * @zh_CN 主题
   * @en_US Theme
   */
  readonly effect = input<XEffect>(this.config?.effect ?? 'light');
  /**
   * @zh_CN 隐藏关闭按钮
   * @en_US Hide close button
   */
  readonly hideClose = input<boolean, XBoolean>(this.config?.hideClose ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 使用文本关闭按钮
   * @en_US Use the text to close button
   */
  readonly closeText = input<string>();
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   */
  readonly showIcon = input<boolean, XBoolean>(this.config?.showIcon ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 禁用动画
   * @en_US Disable animation
   */
  readonly disabledAnimation = input<boolean, XBoolean>(this.config?.disabledAnimation ?? false, {
    transform: XToBoolean
  });
  /**
   * @zh_CN 延迟关闭，默认 0 表示不关闭
   * @en_US Delay close, the default value of 0 means do not close
   */
  readonly duration = input<number, XNumber>(this.config?.duration ?? 0, { transform: XToNumber });
  /**
   * @zh_CN 手动处理关闭事件
   * @en_US Manually handle close events
   */
  readonly manual = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 拖动提示框
   * @en_US Drag dialog
   */
  readonly draggable = input<boolean, XBoolean>(this.config?.draggable ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 调整提示框大小
   * @en_US Adjust the size of the box
   */
  readonly resizable = input<boolean, XBoolean>(this.config?.resizable ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 开启 resizable 调整大小，偏移屏幕左边
   * @en_US Open the resizable resize, offset screen left
   */
  readonly offsetLeft = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 开启 resizable 调整大小，偏移屏幕顶部
   * @en_US Open the resizable resize, offset screen top
   */
  readonly offsetTop = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 最小宽度
   * @en_US Min width
   */
  readonly minWidth = input<string, XNumber>(this.config?.minWidth ?? '0', { transform: XToCssPixelValue });
  /**
   * @zh_CN 最小高度
   * @en_US Min height
   */
  readonly minHeight = input<string, XNumber>(this.config?.minHeight ?? '0', { transform: XToCssPixelValue });
  /**
   * @zh_CN 拖动范围限制，父节点选择器或者对象
   * @en_US Drag dialog
   */
  readonly dragBoundary = input<string | ElementRef<HTMLElement> | HTMLElement>();
  /**
   * @zh_CN 设置投放容器外部的 CdkDrag 的位置。可用于为返回的用户恢复元素的位置
   * @en_US Set the location of the CDKDRAG outside the container. Can be used to recover elements for returned users
   */
  readonly dragFreeDragPosition = input<XAlertDragFreeDragPosition>();
  /**
   * @zh_CN 自定义操作
   * @en_US Custom operation
   */
  readonly operationTpl = input<XTemplate>();
  /**
   * @zh_CN 关闭的事件
   * @en_US Closed events
   */
  readonly close = output();
  /**
   * @zh_CN 拖动结束的事件
   * @en_US Drag end event
   */
  readonly dragEnded = output<CdkDragEnd>();
  /**
   * @zh_CN 改变尺寸事件
   * @en_US Change the size event
   */
  readonly resizing = output<XResizableEvent>();
}

/**
 * Alert Option
 * @undocument true
 */
export interface XAlertOption {
  /**
   * 隐藏
   */
  hide?: boolean;
  /**
   * 标题
   */
  title?: XTemplate;
  /**
   * 内容
   */
  content?: XTemplate;
  /**
   * 类型
   */
  type?: XAlertType;
  /**
   * 主题
   */
  effect?: XEffect;
  /**
   * 隐藏关闭按钮
   */
  hideClose?: boolean;
  /**
   * 关闭按钮文字替换
   */
  closeText?: string;
  /**
   * 显示图标
   */
  showIcon?: boolean;
  /**
   * 禁用动画
   */
  disabledAnimation?: boolean;
  /**
   * 延迟关闭，默认 0 表示不关闭
   */
  duration?: number;
  /**
   * 手动处理关闭事件
   */
  manual?: boolean;
  /**
   * 拖动提示框
   */
  draggable?: boolean;
  /**
   * 调整提示框大小
   */
  resizable?: boolean;
  /**
   * 开启 resizable 调整大小，偏移屏幕左边
   */
  offsetLeft?: string;
  /**
   * 开启 resizable 调整大小，偏移屏幕顶部
   */
  offsetTop?: string;
  /**
   * 最小宽度
   */
  minWidth?: string;
  /**
   * 最小高度
   */
  minHeight?: string;
}

/**
 * @zh_CN 类型
 * @en_US Type
 */
export type XAlertType = XStatus;

/**
 * @zh_CN 设置投放容器外部的 CdkDrag 的位置。可用于为返回的用户恢复元素的位置
 * @en_US Set the location of the CDKDRAG outside the container. Can be used to recover elements for returned users
 */
export type XAlertDragFreeDragPosition = { x: number; y: number };
