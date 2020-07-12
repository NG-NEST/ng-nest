import { XStatus, XTemplate, XEffect, XProperty, XInputBoolean, XInputNumber, XBoolean, XNumber, XWithConfig } from '@ng-nest/ui/core';
import { Input, EventEmitter, Output, Component } from '@angular/core';

/**
 * Alert
 * @selector x-alert
 * @decorator component
 */
export const XAlertPrefix = 'x-alert';

/**
 * Alert Property
 */
@Component({ template: '' })
export class XAlertProperty extends XProperty {
  /**
   * 隐藏
   */
  @Input() @XInputBoolean() hide: XBoolean;
  /**
   * 标题
   */
  @Input() title: XTemplate;
  /**
   * 内容
   */
  @Input() content: XTemplate;
  /**
   * 类型
   */
  @Input() type: XAlertType = 'info';
  /**
   * 主题
   */
  @Input() @XWithConfig<XEffect>('light') effect: XEffect;
  /**
   * 隐藏关闭按钮
   */
  @Input() @XWithConfig<XBoolean>() @XInputBoolean() hideClose: XBoolean;
  /**
   * 关闭按钮文字替换
   */
  @Input() closeText: string;
  /**
   * 显示图标
   */
  @Input() @XWithConfig<XBoolean>() @XInputBoolean() showIcon: XBoolean;
  /**
   * 禁用动画
   */
  @Input() @XWithConfig<XBoolean>() @XInputBoolean() disabledAnimation: XBoolean;
  /**
   * 延迟关闭，默认 0 表示不关闭
   */
  @Input() @XWithConfig<XNumber>(0) @XInputNumber() duration: XNumber;
  /**
   * 手动处理关闭事件
   */
  @Input() @XInputBoolean() manual: XBoolean;
  /**
   * 关闭的事件
   */
  @Output() close = new EventEmitter();
}

/**
 * Alert Option
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
 * 类型
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "error"
 */
export type XAlertType = XStatus;
