import { XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type { XAlign, XBoolean, XCorner, XDirection, XJustify, XNumber, XSize, XTemplate } from '@ng-nest/ui/core';

/**
 * ColorPicker
 * @selector x-color-picker
 * @decorator component
 */
export const XColorPickerPrefix = 'x-color-picker';
const X_COLOR_CONFIG_NAME = 'colorPicker';

/**
 * ColorPicker Property
 */
@Component({ selector: `${XColorPickerPrefix}-property`, template: '' })
export class XColorPickerProperty extends XFormControlFunction(X_COLOR_CONFIG_NAME) {
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  readonly placement = input<XCorner>(this.config?.placement ?? 'bottom-start');
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  override readonly pointer = input<boolean, XBoolean>(false, { transform: XToBoolean });
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
   * @zh_CN 前置标签
   * @en_US Before label
   */
  override readonly before = input<XTemplate>();
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  override readonly after = input<XTemplate>();
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
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  override readonly active = model<boolean>(false);
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
}

/**
 * ColorPicker Option
 */
export interface XColorPickerOption extends XFormOption {
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XCorner;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: boolean;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
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
  pattern?: RegExp | RegExp[];
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  message?: string | string[];
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
 * @zh_CN 颜色种类
 * @en_US Color type
 */
export type XColorType = 'hex' | 'rgba' | 'hsla';

/**
 * ColorPicker-Portal
 * @selector x-color-picker-portal
 * @decorator component
 */
export const XColorPickerPortalPrefix = 'x-color-picker-portal';
