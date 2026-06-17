import { XToBoolean, XToNumber, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, output } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XNumber,
  XBoolean,
  XPositionLeftRight,
  XDirection,
  XAlign,
  XJustify,
  XTemplate,
  XVariant,
  XFloatLabel
} from '@ng-nest/ui/core';

/**
 * Textarea
 * @selector x-textarea
 * @decorator component
 */
export const XTextareaPrefix = 'x-textarea';
const X_TEXTAREA_CONFIG_NAME = 'textarea';

/**
 * Textarea Property
 */
@Component({ selector: `${XTextareaPrefix}-property`, template: '' })
export class XTextareaProperty extends XFormControlFunction(X_TEXTAREA_CONFIG_NAME) {
  /**
   * @zh_CN 形态变体
   * @en_US Input variant
   */
  readonly variant = input<XTextareaVariant>(this.config?.variant ?? 'outlined');
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  readonly clearable = input<boolean, XBoolean>(this.config?.clearable ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  readonly icon = input<string>();
  /**
   * @zh_CN 图标布局方式
   * @en_US Icon layout
   */
  readonly iconLayout = input<XTextareaIconLayoutType>('right');
  /**
   * @zh_CN 图标动画
   * @en_US Icon animation
   */
  readonly iconSpin = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 输入最大长度
   * @en_US Enter the maximum length
   */
  readonly maxlength = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 高度
   * @en_US height
   */
  readonly height = input<string, XNumber>('6rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 浮动标签
   * @en_US Float label
   */
  readonly floatLabel = input<XTextareaFloatLabel | null>(this.config?.floatLabel ?? null);
  /**
   * @zh_CN 固定浮动标签
   * @en_US Fixed float label
   */
  readonly floatFixed = input<boolean, XBoolean>(this.config?.floatFixed ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  override readonly placeholder = input<string | string[]>('');
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<XTemplate>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  override readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  override readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  override readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  override readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  override readonly readonly = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  override readonly pattern = input<RegExp | null>(null);
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  override readonly message = input<string>('');
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
  /**
   * @zh_CN 清除按钮的事件
   * @en_US Clear button event
   */
  readonly clearEmit = output<any>();
}

/**
 * Textarea Option
 */
export interface XTextareaOption extends XFormOption {
  /**
   * @zh_CN 浮动标签
   * @en_US Float label
   */
  floatLabel?: XTextareaFloatLabel;
  /**
   * @zh_CN 固定浮动标签
   * @en_US Fixed float label
   */
  floatFixed?: boolean;
  /**
   * @zh_CN 形态变体
   * @en_US Input variant
   */
  variant?: XTextareaVariant;
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  clearable?: boolean;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 图标布局方式
   * @en_US Icon layout
   */
  iconLayout?: XTextareaIconLayoutType;
  /**
   * @zh_CN 图标动画
   * @en_US Icon animation
   */
  iconSpin?: boolean;
  /**
   * @zh_CN 输入最大长度
   * @en_US Enter the maximum length
   */
  maxlength?: number;
  /**
   * @zh_CN 高度
   * @en_US height
   */
  height?: string;
  /**
   * @zh_CN 清除按钮的事件
   * @en_US Clear button event
   */
  clearEmit?: (value: any) => void;
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  pointer?: boolean;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  label?: string;
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  labelWidth?: string;
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  labelAlign?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  justify?: XJustify;
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  align?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  direction?: XDirection;
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  placeholder?: string;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  required?: boolean;
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  readonly?: boolean;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  valueTplContext?: any;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  before?: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  after?: XTemplate;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  pattern?: RegExp;
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  message?: string;
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  active?: boolean;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  inputValidator?: (value: any) => boolean;
}

/**
 * @zh_CN 图标布局方式，指在输入框中的位置
 * @en_US Icon layout, refers to the position in the input box
 * @value "left" 靠左
 * @value "right" 靠右
 */
export type XTextareaIconLayoutType = XPositionLeftRight;

/**
 * @zh_CN 输入框形态变体
 * @en_US Input box variant
 */
export type XTextareaVariant = XVariant;

/**
 * @zh_CN 浮动标签类型
 * @en_US Float label type
 */
export type XTextareaFloatLabel = XFloatLabel;
