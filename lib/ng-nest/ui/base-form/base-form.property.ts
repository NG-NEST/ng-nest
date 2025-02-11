import { Component, TemplateRef, input, model } from '@angular/core';
import {
  XAlign,
  XBoolean,
  XDirection,
  XJustify,
  XNumber,
  XProperty,
  XSize,
  XTemplate,
  XToBoolean,
  XToCssPixelValue
} from '@ng-nest/ui/core';

/**
 * 表单对象共有的参数
 */
export interface XFormOption {
  /**
   * 标签
   */
  label?: any;
  /**
   * 标签宽度
   */
  labelWidth?: string;
  /**
   * 标签文字对齐方式
   */
  labelAlign?: XAlign;
  /**
   * flex 布局下的子元素水平排列方式
   */
  justify?: XJustify;
  /**
   * flex 布局下的子元素垂直排列方式
   */
  align?: XAlign;
  /**
   * flex 布局下的子元素排列方向
   */
  direction?: XDirection;
  /**
   * 尺寸
   */
  size?: XSize;
  /**
   * 输入提示信息
   */
  placeholder?: string | string[];
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 必填
   */
  required?: boolean;
  /**
   * 正则验证规则
   */
  pattern?: RegExp | RegExp[];
  /**
   * 验证不通过提示文字
   */
  message?: string | string[];
  /**
   * 激活状态
   */
  active?: boolean;
  /**
   * 输入框点击样式
   */
  pointer?: boolean;
  /**
   * 输入验证函数
   */
  inputValidator?: (value: any) => boolean;
}

/**
 * 表单对象共有的参数
 */
@Component({ selector: 'x-formcontrol-prop', template: '' })
export class XFormControlProp extends XProperty {
  /**
   * @zh_CN 初始启用验证，在输入值都自动开启
   * @en_US Initial enable validation, which is automatically enabled when the input value is
   */
  readonly validator = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>('medium');
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  readonly placeholder = input<string | string[]>('');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  readonly readonly = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  readonly valueTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  readonly valueTplContext = input();
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  readonly before = input<XTemplate>();
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  readonly after = input<XTemplate>();
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  readonly pattern = input<RegExp | RegExp[]>([]);
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  readonly message = input<string | string[]>([]);
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  readonly active = model<boolean>(false);
  /**
   * @zh_CN 输入框点击样式
   * @en_US Enter box click style
   */
  readonly pointer = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  readonly inputValidator = input<(value: any) => boolean>();
}
