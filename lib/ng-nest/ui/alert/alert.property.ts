import { XStatus, XTemplate, XEffect, XProperty, XInputBoolean, XInputNumber, XBoolean, XNumber, XWithConfig } from '@ng-nest/ui/core';
import { Input, EventEmitter, Output, Component, ElementRef } from '@angular/core';

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
@Component({ template: '' })
export class XAlertProperty extends XProperty {
  /**
   * @zh_CN 隐藏
   * @en_US Hide
   */
  @Input() @XInputBoolean() hide: XBoolean;
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  @Input() title: XTemplate;
  /**
   * @zh_CN 内容
   * @en_US Content
   */
  @Input() content: XTemplate;
  /**
   * @zh_CN 类型
   * @en_US Alert type
   */
  @Input() type: XAlertType = 'info';
  /**
   * @zh_CN 主题
   * @en_US Theme
   */
  @Input() @XWithConfig<XEffect>(X_CONFIG_NAME, 'light') effect: XEffect;
  /**
   * @zh_CN 隐藏关闭按钮
   * @en_US Hide close button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() hideClose: XBoolean;
  /**
   * @zh_CN 使用文本关闭按钮
   * @en_US Use the text to close button
   */
  @Input() closeText: string;
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() showIcon: XBoolean;
  /**
   * @zh_CN 禁用动画
   * @en_US Disable animation
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() disabledAnimation: XBoolean;
  /**
   * @zh_CN 延迟关闭，默认 0 表示不关闭
   * @en_US Delay close, the default value of 0 means do not close
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 0) @XInputNumber() duration: XNumber;
  /**
   * @zh_CN 手动处理关闭事件
   * @en_US Manually handle close events
   */
  @Input() @XInputBoolean() manual: XBoolean;
  /**
   * @zh_CN 拖动提示框
   * @en_US Drag dialog
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() draggable?: XBoolean;
  /**
   * @zh_CN 拖动范围限制，父节点选择器或者对象
   * @en_US Drag dialog
   */
  @Input() dragBoundary!: string | ElementRef<HTMLElement> | HTMLElement;
  /**
   * @zh_CN 关闭的事件
   * @en_US Closed events
   */
  @Output() close = new EventEmitter();
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
