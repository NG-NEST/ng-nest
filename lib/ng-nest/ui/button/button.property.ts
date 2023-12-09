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
  XWithConfig
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
@Component({ selector: `${XButtonPrefix}-property`, template: '' })
export class XButtonProperty extends XProperty implements XButtonOption {
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  @Input() @XWithConfig<XButtonType>(X_CONFIG_NAME, 'initial') type?: XButtonType;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  @Input() icon?: string;
  /**
   * @zh_CN 提示
   * @en_US Title
   */
  @Input() title?: string = '';
  /**
   * @zh_CN 布局方式
   * @en_US Layout
   */
  @Input() direction: XDirection = 'row';
  /**
   * @zh_CN tab 键控制次序
   * @en_US Tab key control order
   */
  @Input() tabindex: number = 0;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize;
  /**
   * @zh_CN 仅显示图标
   * @en_US Icon only
   */
  @Input() @XInputBoolean() onlyIcon?: XBoolean;
  /**
   * @zh_CN 激活的按钮（样式差异）
   * @en_US Active button (style difference)
   */
  @Input() @XInputBoolean() activated?: XBoolean;
  /**
   * @zh_CN 禁用按钮
   * @en_US Disable button
   */
  @Input() @XInputBoolean() disabled?: XBoolean;
  /**
   * @zh_CN 朴素按钮
   * @en_US Plain button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() plain?: XBoolean;
  /**
   * @zh_CN 圆角按钮
   * @en_US Round button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() round?: XBoolean;
  /**
   * @zh_CN 圆型按钮（配合图标来使用）
   * @en_US Round button (use with icon)
   */
  @Input() @XInputBoolean() circle?: XBoolean;
  /**
   * @zh_CN 加载中
   * @en_US Loading
   */
  @Input() @XInputBoolean() loading?: XBoolean;
  /**
   * @zh_CN 关闭按钮
   * @en_US Close button
   */
  @Input() @XInputBoolean() closable?: XBoolean;
  /**
   * @zh_CN 按钮类型属性 submit,button,reset
   * @en_US Button type attribute. submit,button,reset
   */
  @Input() @XWithConfig<XButtonAttrType>(X_CONFIG_NAME, 'button') attrType?: XButtonAttrType;
}

/**
 * Button Option
 * @undocument true
 */
export interface XButtonOption {
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  type?: XButtonType;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 提示
   * @en_US Title
   */
  title?: string;
  /**
   * @zh_CN 布局方式
   * @en_US Layout
   */
  direction?: XDirection;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 仅显示图标
   * @en_US Icon only
   */
  onlyIcon?: XBoolean;
  /**
   * @zh_CN 激活的按钮（样式差异）
   * @en_US Active button (style difference)
   */
  activated?: XBoolean;
  /**
   * @zh_CN 禁用按钮
   * @en_US Disable button
   */
  disabled?: XBoolean;
  /**
   * @zh_CN 朴素按钮
   * @en_US Plain button
   */
  plain?: XBoolean;
  /**
   * @zh_CN 圆角按钮
   * @en_US Round button
   */
  round?: XBoolean;
  /**
   * @zh_CN 圆型按钮（配合图标来使用）
   * @en_US Round button (use with icon)
   */
  circle?: XBoolean;
  /**
   * @zh_CN 加载中
   * @en_US Loading
   */
  loading?: XBoolean;
  /**
   * @zh_CN 关闭按钮
   * @en_US Close button
   */
  closable?: XBoolean;
}

/**
 * @zh_CN 按钮类型
 * @en_US Button type
 */
export type XButtonType = XType;

/**
 * @zh_CN 按钮类型属性
 * @en_US Button attr type
 */
export type XButtonAttrType = 'submit' | 'button' | 'reset';

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
@Component({ selector: `${XButtonsPrefix}-property`, template: '' })
export class XButtonsProperty extends XProperty {
  /**
   * @zh_CN 按钮间距，单位 rem （按 1rem = 16px 比例来计算）
   * @en_US Button spacing, unit rem (calculated according to the ratio of 1rem = 16px)
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME_BUTTONS, 0) @XInputNumber() space?: XNumber;
  /**
   * @zh_CN 隐藏边框
   * @en_US Hide border
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME_BUTTONS) @XInputBoolean() hiddenBorder?: XBoolean;
}
