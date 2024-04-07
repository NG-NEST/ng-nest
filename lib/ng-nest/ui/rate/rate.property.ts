import {
  XInputNumber,
  XNumber,
  XInputBoolean,
  XBoolean,
  XTemplate,
  XWithConfig,
  XDirection,
  XAlign,
  XJustify
} from '@ng-nest/ui/core';
import { Input, Component, TemplateRef, Output, EventEmitter } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Rate
 * @selector x-rate
 * @decorator component
 */
export const XRatePrefix = 'x-rate';
const X_CONFIG_NAME = 'rate';

/**
 * Rate Property
 */
@Component({ selector: `${XRatePrefix}-property`, template: '' })
export class XRateProperty extends XControlValueAccessor<any> implements XRateOption {
  /**
   * @zh_CN 评分个数
   * @en_US Number of ratings
   */
  @Input() @XInputNumber() count: XNumber = 5;
  /**
   * @zh_CN 半星模式
   * @en_US Number of ratings
   */
  @Input() @XInputBoolean() half?: XBoolean;
  /**
   * @zh_CN 颜色
   * @en_US Color
   */
  @Input() @XWithConfig<XRateColor>(X_CONFIG_NAME) color?: XRateColor;
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  @Input() customTemp!: TemplateRef<any>;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  @Input() override label?: string = '';
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  @Input() override labelWidth?: string = '';
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  @Input() override labelAlign?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  @Input() override justify?: XJustify = 'start';
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  @Input() override align?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  @Input() override direction?: XDirection = 'column';
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  @Input() override placeholder?: string | string[] = '';
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() override disabled: XBoolean = false;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  @Input() @XInputBoolean() override required: XBoolean = false;
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  @Input() @XInputBoolean() override readonly: XBoolean = false;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  @Input() override valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  @Input() override valueTplContext: any;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  @Input() override before!: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  @Input() override after!: XTemplate;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  @Input() override pattern?: any;
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  @Input() override message?: string | string[];
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  @Input() @XInputBoolean() override active: XBoolean = false;
  /**
   * @zh_CN 输入框点击样式
   * @en_US Enter box click style
   */
  @Input() @XInputBoolean() override pointer: XBoolean = false;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  @Input() override inputValidator!: (value: any) => boolean;
  /**
   * @zh_CN 激活状态事件
   * @en_US Activation state event
   */
  @Output() override activeChange = new EventEmitter<XBoolean>();
}

/**
 * @zh_CN 颜色类型
 * @en_US Color type
 */
export type XRateColor = string | { [color: string]: (rate: number) => boolean };

/**
 * Rate Option
 * @undocument true
 */
export interface XRateOption extends XFormOption {
  /**
   * @zh_CN 评分个数
   * @en_US Number of ratings
   */
  count?: XNumber;
  /**
   * @zh_CN 半星模式
   * @en_US Number of ratings
   */
  half?: XBoolean;
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  customTemp?: XTemplate;
}
