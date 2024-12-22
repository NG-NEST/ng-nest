import { XToBoolean, XToCssPixelValue, XToDataConvert } from '@ng-nest/ui/core';
import { Component, TemplateRef, input } from '@angular/core';
import { XButtonType } from '@ng-nest/ui/button';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XData,
  XTemplate,
  XIdentityProperty,
  XBoolean,
  XDirection,
  XAlign,
  XJustify,
  XNumber
} from '@ng-nest/ui/core';

/**
 * Checkbox
 * @selector x-checkbox
 * @decorator component
 */
export const XCheckboxPrefix = 'x-checkbox';
const X_CHECKBOX_CONFIG_NAME = 'checkbox';

/**
 * Checkbox Property
 */
@Component({ selector: `${XCheckboxPrefix}-property`, template: '' })
export class XCheckboxProperty extends XFormControlFunction(X_CHECKBOX_CONFIG_NAME) {
  /**
   * @zh_CN 多选框数据
   * @en_US Checkbox data
   */
  readonly data = input<XData<XCheckboxNode>, XData<XCheckboxNode>>([], { transform: XToDataConvert });
  /**
   * @zh_CN 按钮样式
   * @en_US Button style
   */
  readonly button = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 图标样式
   * @en_US Icon style
   */
  readonly icon = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN tag 标签样式
   * @en_US Tag style
   */
  readonly tag = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 不确定状态的样式
   * @en_US Uncertain state style
   */
  readonly indeterminate = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 按钮/图标/ tag 标签样式时生效
   * @en_US Take effect when button style
   */
  readonly type = input<XButtonType>('initial');
  /**
   * @zh_CN tag 标签边框
   * @en_US Tag bordered
   */
  readonly tagBordered = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN tag 标签深色主题
   * @en_US Tag dark theme
   */
  readonly tagDark = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 只有一个选项，启动此参数时，value 的值为 true / false
   * @en_US There is only one option, when this parameter is activated, the value is true or false
   */
  readonly single = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 垂直布局，不支持 button 和 icon 样式
   * @en_US Vertical layout, does not support button and icon styles
   */
  readonly vertical = input<boolean, XBoolean>(false, { transform: XToBoolean });
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
}

/**
 * Checkbox Option
 */
export interface XCheckboxOption extends XFormOption {
  /**
   * @zh_CN 多选框数据
   * @en_US Checkbox data
   */
  data?: XData<XCheckboxNode>;
  /**
   * @zh_CN 按钮样式
   * @en_US Button style
   */
  button?: boolean;
  /**
   * @zh_CN 图标样式
   * @en_US Icon style
   */
  icon?: boolean;
  /**
   * @zh_CN tag 标签样式
   * @en_US Tag style
   */
  tag?: boolean;
  /**
   * @zh_CN 不确定状态的样式
   * @en_US Uncertain state style
   */
  indeterminate?: boolean;
  /**
   * @zh_CN 按钮/图标/ tag 标签样式时生效
   * @en_US Take effect when button style
   */
  type?: XButtonType;
  /**
   * @zh_CN tag 标签边框
   * @en_US Tag bordered
   */
  tagBordered?: boolean;
  /**
   * @zh_CN tag 标签深色主题
   * @en_US Tag dark theme
   */
  tagDark?: boolean;
  /**
   * @zh_CN 只有一个选项，启动此参数时，value 的值为 true / false
   * @en_US There is only one option, when this parameter is activated, the value is true or false
   */
  single?: boolean;
  /**
   * @zh_CN 垂直布局，不支持 button 和 icon 样式
   * @en_US Vertical layout, does not support button and icon styles
   */
  vertical?: boolean;
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
   * @zh_CN 选中
   * @en_US Disable
   */
  checked?: boolean;
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
  /**
   * @zh_CN label 为模板参数的时候
   * @en_US Label when setting template parameters
   */
  node?: XCheckboxNode;
}
