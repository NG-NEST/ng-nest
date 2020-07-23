import { Input, Component } from '@angular/core';
import {
  XProperty,
  XDirection,
  XSize,
  XInputBoolean,
  XInputNumber,
  XNumber,
  XBoolean,
  XType,
  XWithConfig,
  XConfigService
} from '@ng-nest/ui/core';

/**
 * Button
 * @selector x-button
 * @decorator component
 */
export const XButtonPrefix = 'x-button';
const X_CONFIG_NAME = 'button';

/**
 * Button Property
 */
@Component({ template: '' })
export class XButtonProperty extends XProperty implements XButtonOption {
  /**
   * 类型
   */
  @Input() @XWithConfig<XButtonType>(X_CONFIG_NAME, 'initial') type: XButtonType;
  /**
   * 图标
   */
  @Input() icon: string;
  /**
   * 提示
   */
  @Input() title: string = '';
  /**
   * 布局方式
   */
  @Input() direction: XDirection = 'row';
  /**
   * 尺寸
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size: XSize;
  /**
   * 仅显示图标
   */
  @Input() @XInputBoolean() onlyIcon: XBoolean;
  /**
   * 激活的按钮（样式差异）
   */
  @Input() @XInputBoolean() activated: XBoolean;
  /**
   * 禁用按钮
   */
  @Input() @XInputBoolean() disabled: XBoolean;
  /**
   * 朴素按钮
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() plain: XBoolean;
  /**
   * 圆角按钮
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() round: XBoolean;
  /**
   * 圆型按钮（配合图标来使用）
   */
  @Input() @XInputBoolean() circle: XBoolean;
  /**
   * 加载中
   */
  @Input() @XInputBoolean() loading: XBoolean;
  /**
   * 关闭按钮
   */
  @Input() @XInputBoolean() closable: XBoolean;
}

/**
 * Button Option
 * @undocument true
 */
export interface XButtonOption {
  /**
   * 类型
   */
  type?: XButtonType;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 提示
   */
  title?: string;
  /**
   * 布局方式
   */
  direction?: XDirection;
  /**
   * 尺寸
   */
  size?: XSize;
  /**
   * 仅显示图标
   */
  onlyIcon?: XBoolean;
  /**n
   * 激活的按钮（样式差异）
   */
  activated?: XBoolean;
  /**
   * 禁用按钮
   */
  disabled?: XBoolean;
  /**
   * 朴素按钮
   */
  plain?: XBoolean;
  /**
   * 圆角按钮
   */
  round?: XBoolean;
  /**
   * 圆型按钮（配合图标来使用）
   */
  circle?: XBoolean;
  /**
   * 加载中
   */
  loading?: XBoolean;
  /**
   * 关闭按钮
   */
  closable?: XBoolean;
}

/**
 * 按钮类型
 */
export type XButtonType = XType;

/**
 * Buttons
 * @selector x-buttons
 * @decorator component
 */
export const XButtonsPrefix = 'x-buttons';
const X_CONFIG_NAME_BUTTONS = 'buttons';

/**
 * Buttons Property
 */
@Component({ template: '' })
export class XButtonsProperty extends XProperty {
  /**
   * 按钮间距，单位 rem （按 1rem = 16px 比例来计算）
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME_BUTTONS, 0) @XInputNumber() space: XNumber;
  /**
   * 隐藏边框
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME_BUTTONS) @XInputBoolean() hiddenBorder: XBoolean;
}
