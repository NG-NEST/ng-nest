import {
  XAlign,
  XBoolean,
  XDirection,
  XJustify,
  XNumber,
  XSize,
  XToBoolean,
  XToCssPixelValue,
  XToNumber
} from '@ng-nest/ui/core';
import { Component, TemplateRef, input } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';

/**
 * InputNumber
 * @selector x-input-number
 * @decorator component
 */
export const XInputNumberPrefix = 'x-input-number';
const X_INPUT_NUMBER_CONFIG_NAME = 'inputNumber';

/**
 * InputNumber Property
 */
@Component({ selector: `${XInputNumberPrefix}-property`, template: '' })
export class XInputNumberProperty extends XFormControlFunction(X_INPUT_NUMBER_CONFIG_NAME) {
  /**
   * @zh_CN 最小值
   * @en_US Minimum
   */
  readonly min = input<number, XNumber>(Number.MIN_SAFE_INTEGER, { transform: XToNumber });
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  readonly max = input<number, XNumber>(Number.MAX_SAFE_INTEGER, { transform: XToNumber });
  /**
   * @zh_CN 步数
   * @en_US Step count
   */
  readonly step = input<number, XNumber>(1, { transform: XToNumber });
  /**
   * @zh_CN 按住后步进速度
   * @en_US Stepping speed after pressing
   */
  readonly debounce = input<number, XNumber>(40, { transform: XToNumber });
  /**
   * @zh_CN 精度
   * @en_US Precision
   */
  readonly precision = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 数字格式化
   * @en_US Display Formatter
   */
  readonly formatter = input<(value: number) => XNumber>();
  /**
   * @zh_CN 隐藏步进按钮
   * @en_US Hide step button
   */
  readonly hiddenButton = input<boolean, XBoolean>(this.config?.hiddenButton ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<string>('');
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
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  override readonly placeholder = input<string | string[]>('');
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
   * @zh_CN 值模板
   * @en_US Node template
   */
  override readonly valueTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  override readonly valueTplContext = input();
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  override readonly pattern = input<RegExp | RegExp[] | any>(null);
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  override readonly message = input<string | string[]>([]);
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
}

/**
 * InputNumber Option
 */
export interface XInputNumberOption extends XFormOption {
  /**
   * @zh_CN 最小值
   * @en_US Minimum
   */
  min?: number;
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  max?: number;
  /**
   * @zh_CN 步数
   * @en_US Step count
   */
  step?: number;
  /**
   * @zh_CN 按住后步进速度
   * @en_US Stepping speed after pressing
   */
  debounce?: number;
  /**
   * @zh_CN 精度
   * @en_US Precision
   */
  precision?: number;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: boolean;
  /**
   * @zh_CN 数字格式化
   * @en_US Display Formatter
   */
  formatter?: (value: number) => XNumber;
  /**
   * @zh_CN 隐藏步进按钮
   * @en_US Hide step button
   */
  hiddenButton?: boolean;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
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
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  pattern?: RegExp | RegExp[];
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  message?: string | string[];
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  inputValidator?: (value: any) => boolean;
}
