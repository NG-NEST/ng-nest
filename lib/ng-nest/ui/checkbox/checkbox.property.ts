import {
  XData,
  XTemplate,
  XIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XSize,
  XBoolean,
  XWithConfig,
  XDirection,
  XAlign,
  XJustify
} from '@ng-nest/ui/core';
import { Input, Component, Output, EventEmitter, TemplateRef } from '@angular/core';
import { XButtonType } from '@ng-nest/ui/button';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Checkbox
 * @selector x-checkbox
 * @decorator component
 */
export const XCheckboxPrefix = 'x-checkbox';
const X_CONFIG_NAME = 'checkbox';

/**
 * Checkbox Property
 */
@Component({ selector: `${XCheckboxPrefix}-property`, template: '' })
export class XCheckboxProperty extends XControlValueAccessor<boolean | Array<any>> implements XCheckboxOption {
  /**
   * @zh_CN 多选框数据
   * @en_US Checkbox data
   */
  @Input() @XDataConvert() data: XData<XCheckboxNode> = [];
  /**
   * @zh_CN 按钮样式
   * @en_US Button style
   */
  @Input() @XInputBoolean() button?: XBoolean;
  /**
   * @zh_CN 图标样式
   * @en_US Icon style
   */
  @Input() @XInputBoolean() icon?: XBoolean;
  /**
   * @zh_CN tag 标签样式
   * @en_US Tag style
   */
  @Input() @XInputBoolean() tag?: XBoolean;
  /**
   * @zh_CN 不确定状态的样式
   * @en_US Uncertain state style
   */
  @Input() @XInputBoolean() indeterminate?: XBoolean;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size?: XSize;
  /**
   * @zh_CN 按钮/图标/ tag 标签样式时生效
   * @en_US Take effect when button style
   */
  @Input() type: XButtonType = 'initial';
  /**
   * @zh_CN tag 标签边框
   * @en_US Tag bordered
   */
  @Input() @XInputBoolean() tagBordered: XBoolean = true;
  /**
   * @zh_CN tag 标签深色主题
   * @en_US Tag dark theme
   */
  @Input() @XInputBoolean() tagDark: XBoolean = false;
  /**
   * @zh_CN 只有一个选项，启动此参数时，value 的值为 true / false
   * @en_US There is only one option, when this parameter is activated, the value is true or false
   */
  @Input() @XInputBoolean() single: XBoolean = false;
  /**
   * @zh_CN 垂直布局，不支持 button 和 icon 样式
   * @en_US Vertical layout, does not support button and icon styles
   */
  @Input() @XInputBoolean() vertical: XBoolean = false;
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
 * Checkbox Option
 * @undocument true
 */
export interface XCheckboxOption extends XFormOption {
  /**
   * @zh_CN 单选框数据
   * @en_US Radio data
   */
  data?: XData<XCheckboxNode>;
  /**
   * @zh_CN 按钮样式
   * @en_US Button style
   */
  button?: XBoolean;
  /**
   * @zh_CN 图标样式
   * @en_US Icon style
   */
  icon?: XBoolean;
  /**
   * @zh_CN tag 标签样式
   * @en_US Tag style
   */
  tag?: XBoolean;
  /**
   * @zh_CN 不确定状态的样式
   * @en_US Uncertain state style
   */
  indeterminate?: XBoolean;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 按钮/图标/ tag 标签样式时生效
   * @en_US Take effect when button style
   */
  type?: XButtonType;
  /**
   * @zh_CN tag 标签边框
   * @en_US Tag bordered
   */
  tagBordered?: XBoolean;
  /**
   * @zh_CN tag 标签深色主题
   * @en_US Tag dark theme
   */
  tagDark?: XBoolean;
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
}

/**
 * @zh_CN Checkbox 数据对象
 * @en_US Checkbox data object
 */
export interface XCheckboxNode extends XIdentityProperty {
  /**
   * @zh_CN 禁用
   * @en_US Disable
   */
  disabled?: boolean;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 图标的提示信息
   * @en_US Icon message
   */
  title?: string;
  /**
   * @zh_CN 标签文字
   * @en_US Label text
   */
  label?: XTemplate;
}
