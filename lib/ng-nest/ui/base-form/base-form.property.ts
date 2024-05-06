import { Component, EventEmitter, Input, Output, TemplateRef, input, model, output } from '@angular/core';
import {
  XAlign,
  XBoolean,
  XDirection,
  XInputBoolean,
  XJustify,
  XProperty,
  XSize,
  XTemplate,
  XToBoolean
} from '@ng-nest/ui/core';

/**
 * 表单对象共有的参数
 */
@Component({ selector: 'x-form-prop', template: '' })
export class XFormProp extends XProperty {
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  @Input() label?: string = '';
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  @Input() labelWidth?: string = '';
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  @Input() labelAlign?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  @Input() justify?: XJustify = 'start';
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  @Input() align?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  @Input() direction?: XDirection = 'column';
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() size?: XSize = 'medium';
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  @Input() placeholder?: string | string[] = '';
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() disabled: XBoolean = false;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  @Input() @XInputBoolean() required: XBoolean = false;
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  @Input() @XInputBoolean() readonly: XBoolean = false;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  @Input() valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  @Input() valueTplContext: any;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  @Input() before!: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  @Input() after!: XTemplate;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  @Input() pattern?: any;
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  @Input() message?: string | string[];
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  @Input() @XInputBoolean() active: XBoolean = false;
  /**
   * @zh_CN 输入框点击样式
   * @en_US Enter box click style
   */
  @Input() @XInputBoolean() pointer: XBoolean = false;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  @Input() inputValidator!: (value: any) => boolean;
  /**
   * @zh_CN 激活状态事件
   * @en_US Activation state event
   */
  @Output() activeChange = new EventEmitter<XBoolean>();
}

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
  disabled?: XBoolean;
  /**
   * 必填
   */
  required?: XBoolean;
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
  active?: XBoolean;
  /**
   * 输入框点击样式
   */
  pointer?: XBoolean;
  /**
   * 输入验证函数
   */
  inputValidator?: (value: any) => boolean;
}

/**
 * 表单对象共有的参数
 */
@Component({ selector: 'x-form-prop', template: '' })
export class XFormControlProp extends XProperty {
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  readonly labelWidth = input<string>('');
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
  readonly pattern = input<any>();
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  readonly message = input<string | string[]>('');
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
