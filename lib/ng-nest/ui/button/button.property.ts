import { Input } from '@angular/core';
import { XProperty, XDirection, XSize, XInputBoolean, XInputNumber } from '@ng-nest/ui/core';

/**
 * Button
 * @selector x-button
 * @decorator component
 */
export const XButtonPrefix = 'x-button';

/**
 * Button Property
 */
export class XButtonProperty extends XProperty {
  /**
   * 类型
   */
  @Input() type: XButtonType = 'initial';
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
  @Input() size: XSize = 'medium';
  /**
   * 仅显示图标
   */
  @Input('only-icon') @XInputBoolean() onlyIcon: boolean = false;
  /**
   * 激活的按钮（样式差异）
   */
  @Input() @XInputBoolean() activated: boolean = false;
  /**
   * 禁用按钮
   */
  @Input() @XInputBoolean() disabled: boolean = false;
  /**
   * 朴素按钮
   */
  @Input() @XInputBoolean() plain: boolean = false;
  /**
   * 圆角按钮
   */
  @Input() @XInputBoolean() round: boolean = false;
  /**
   * 圆型按钮（配合图标来使用）
   */
  @Input() @XInputBoolean() circle: boolean = false;
  /**
   * 加载中
   */
  @Input() @XInputBoolean() loading: boolean = false;
  /**
   * 关闭按钮
   */
  @Input() @XInputBoolean() closable: boolean = false;
}

/**
 * Button Option
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
  onlyIcon?: boolean;
  /**n
   * 激活的按钮（样式差异）
   */
  activated?: boolean;
  /**
   * 禁用按钮
   */
  disabled?: boolean;
  /**
   * 朴素按钮
   */
  plain?: boolean;
  /**
   * 圆角按钮
   */
  round?: boolean;
  /**
   * 圆型按钮（配合图标来使用）
   */
  circle?: boolean;
  /**
   * 加载中
   */
  loading?: boolean;
  /**
   * 关闭按钮
   */
  closable?: boolean;
}

/**
 * 按钮类型
 */
export type XButtonType = 'initial' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';

/**
 * Buttons
 * @selector x-buttons
 * @decorator component
 */
export const XButtonsPrefix = 'x-buttons';

/**
 * Buttons Property
 */
export class XButtonsProperty extends XProperty {
  /**
   * 按钮间距，单位 rem （按 1rem = 16px 比例来计算）
   */
  @Input() @XInputNumber() space: number = 0;
  /**
   * 隐藏边框
   */
  @Input('hidden-border') @XInputBoolean() hiddenBorder?: boolean;
}
