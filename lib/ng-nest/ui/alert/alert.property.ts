import {
  XStatus,
  XTemplate,
  XEffect,
  XProperty,
  XInputBoolean,
  XInputNumber,
  XBoolean,
  XNumber,
  XWithConfig
} from '@ng-nest/ui/core';
import { Input, EventEmitter, Output, Component, ElementRef } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { XResizableEvent } from '@ng-nest/ui/resizable';

/**
 * Alert
 * @selector x-alert
 * @decorator component
 */
export const XAlertPrefix = 'x-alert';
const X_CONFIG_NAME = 'alert';

/**
 * Alert Property
 */
@Component({ selector: `${XAlertPrefix}-property`, template: '', standalone: true })
export class XAlertProperty extends XProperty {
  /**
   * @zh_CN 隐藏
   * @en_US Hide
   */
  @Input() @XInputBoolean() hide?: XBoolean;
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  @Input() title?: XTemplate;
  /**
   * @zh_CN 内容
   * @en_US Content
   */
  @Input() content?: XTemplate;
  /**
   * @zh_CN 类型
   * @en_US Alert type
   */
  @Input() type?: XAlertType = 'info';
  /**
   * @zh_CN 主题
   * @en_US Theme
   */
  @Input() @XWithConfig<XEffect>(X_CONFIG_NAME, 'light') effect?: XEffect;
  /**
   * @zh_CN 隐藏关闭按钮
   * @en_US Hide close button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() hideClose?: XBoolean;
  /**
   * @zh_CN 使用文本关闭按钮
   * @en_US Use the text to close button
   */
  @Input() closeText?: string;
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() showIcon?: XBoolean;
  /**
   * @zh_CN 禁用动画
   * @en_US Disable animation
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() disabledAnimation?: XBoolean;
  /**
   * @zh_CN 延迟关闭，默认 0 表示不关闭
   * @en_US Delay close, the default value of 0 means do not close
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 0) @XInputNumber() duration?: XNumber;
  /**
   * @zh_CN 手动处理关闭事件
   * @en_US Manually handle close events
   */
  @Input() @XInputBoolean() manual?: XBoolean;
  /**
   * @zh_CN 拖动提示框
   * @en_US Drag dialog
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() draggable?: XBoolean;
  /**
   * @zh_CN 调整提示框大小
   * @en_US Adjust the size of the box
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() resizable?: XBoolean;
  /**
   * @zh_CN 开启 resizable 调整大小，偏移屏幕左边
   * @en_US Open the resizable resize, offset screen left
   */
  @Input() @XInputNumber() offsetLeft: XNumber = 0;
  /**
   * @zh_CN 开启 resizable 调整大小，偏移屏幕顶部
   * @en_US Open the resizable resize, offset screen top
   */
  @Input() @XInputNumber() offsetTop: XNumber = 0;
  /**
   * @zh_CN 最小宽度
   * @en_US Min width
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '0rem') minWidth?: string;
  /**
   * @zh_CN 最小高度
   * @en_US Min height
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '0rem') minHeight?: string;
  /**
   * @zh_CN 拖动范围限制，父节点选择器或者对象
   * @en_US Drag dialog
   */
  @Input() dragBoundary!: string | ElementRef<HTMLElement> | HTMLElement;
  /**
   * @zh_CN 设置投放容器外部的 CdkDrag 的位置。可用于为返回的用户恢复元素的位置
   * @en_US Set the location of the CDKDRAG outside the container. Can be used to recover elements for returned users
   */
  @Input() dragFreeDragPosition!: XAlertDragFreeDragPosition;
  /**
   * @zh_CN 自定义操作
   * @en_US Custom operation
   */
  @Input() operationTpl!: XTemplate;
  /**
   * @zh_CN 关闭的事件
   * @en_US Closed events
   */
  @Output() close = new EventEmitter();
  /**
   * @zh_CN 拖动结束的事件
   * @en_US Drag end event
   */
  @Output() dragEnded = new EventEmitter<CdkDragEnd>();
  /**
   * @zh_CN 改变尺寸事件
   * @en_US Change the size event
   */
  @Output() resizing = new EventEmitter<XResizableEvent>();
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
  offsetLeft?: number;
  /**
   * 开启 resizable 调整大小，偏移屏幕顶部
   */
  offsetTop?: number;
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
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "error"
 */
export type XAlertType = XStatus;

/**
 * @zh_CN 设置投放容器外部的 CdkDrag 的位置。可用于为返回的用户恢复元素的位置
 * @en_US Set the location of the CDKDRAG outside the container. Can be used to recover elements for returned users
 */
export type XAlertDragFreeDragPosition = { x: number; y: number };
