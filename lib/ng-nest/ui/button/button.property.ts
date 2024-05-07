import { Component, input } from '@angular/core';
import { XPropertyFunction, XToNumber, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import type { XDirection, XSize, XNumber, XBoolean, XType } from '@ng-nest/ui/core';

/**
 * Button
 * @selector x-button
 * @decorator component
 */
export const XButtonPrefix = 'x-button';
const X_BUTTON_CONFIG_NAME = 'button';

/**
 * Button Property
 */
@Component({ selector: `${XButtonPrefix}-property`, template: '' })
export class XButtonProperty extends XPropertyFunction(X_BUTTON_CONFIG_NAME) {
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  readonly type = input<XButtonType>(this.config?.type ?? 'initial');
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  readonly icon = input<string>('');
  /**
   * @zh_CN 提示
   * @en_US Title
   */
  readonly title = input<string>('');
  /**
   * @zh_CN 布局方式
   * @en_US Layout
   */
  readonly direction = input<XDirection>('row');
  /**
   * @zh_CN tab 键控制次序
   * @en_US Tab key control order
   */
  readonly tabindex = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 仅显示图标
   * @en_US Icon only
   */
  readonly onlyIcon = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 激活的按钮（样式差异）
   * @en_US Active button (style difference)
   */
  readonly activated = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 禁用按钮
   * @en_US Disable button
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 朴素按钮
   * @en_US Plain button
   */
  readonly plain = input<boolean, XBoolean>(this.config?.plain ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 平铺按钮
   * @en_US Flat button
   */
  readonly flat = input<boolean, XBoolean>(this.config?.flat ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 文字按钮
   * @en_US Text button
   */
  readonly text = input<boolean, XBoolean>(this.config?.text ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 圆角按钮
   * @en_US Round button
   */
  readonly round = input<boolean, XBoolean>(this.config?.round ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 圆型按钮（配合图标来使用）
   * @en_US Round button (use with icon)
   */
  readonly circle = input<boolean, XBoolean>(this.config?.circle ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 加载中
   * @en_US Loading
   */
  readonly loading = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 关闭按钮
   * @en_US Close button
   */
  readonly closable = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 按钮类型属性 submit, button, reset
   * @en_US Button type attribute. submit, button, reset
   */
  readonly attrType = input<XButtonAttrType>(this.config?.attrType ?? 'button');
}

/**
 * @zh_CN 按钮类型
 * @en_US Button type
 */
export type XButtonType = XType;

/**
 * @zh_CN 按钮类型属性
 * - `'submit'` : 此类型用于提交表单数据
 * - `'reset'` : 此类型用于重置表单中的数据
 * - `'button'` : 此类型用于自定义按钮行为
 * @en_US Button attr type
 * - `'submit'` : This type is used to submit the form data
 * - `'reset'` : This type is used to reset the form data
 * - `'button'` : This type is used to the custom button
 */
export type XButtonAttrType = 'submit' | 'button' | 'reset';

/**
 * Buttons
 * @selector x-buttons
 * @decorator component
 */
export const XButtonsPrefix = 'x-buttons';
const X_BUTTONS_CONFIG_NAME = 'buttons';

/**
 * Buttons Property
 */
@Component({ selector: `${XButtonsPrefix}-property`, template: '' })
export class XButtonsProperty extends XPropertyFunction(X_BUTTONS_CONFIG_NAME) {
  /**
   * @zh_CN 按钮间距
   * @en_US Button spacing
   * @example
   * ex: 10,'10px','1rem'
   */
  readonly space = input<string, XNumber>(this.config?.space ?? '', { transform: XToCssPixelValue });
  /**
   * @zh_CN 隐藏边框
   * @en_US Hide border
   */
  readonly hiddenBorder = input<boolean, XBoolean>(this.config?.hiddenBorder ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 显示阴影
   * @en_US show box shadow
   */
  readonly boxShadow = input<boolean, XBoolean>(this.config?.boxShadow ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 圆角按钮
   * @en_US Round button
   */
  readonly round = input<boolean, XBoolean>(this.config?.round ?? false, { transform: XToBoolean });
}
