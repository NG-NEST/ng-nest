import { XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import { XButtonType } from '@ng-nest/ui/button';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XData,
  XIdentityProperty,
  XBoolean,
  XTemplate,
  XDirection,
  XAlign,
  XJustify,
  XNumber
} from '@ng-nest/ui/core';

/**
 * Radio
 * @selector x-radio
 * @decorator component
 */
export const XRadioPrefix = 'x-radio';
const X_RADIO_CONFIG_NAME = 'radio';

/**
 * Radio Property
 */
@Component({ selector: `${XRadioPrefix}-property`, template: '' })
export class XRadioProperty extends XFormControlFunction(X_RADIO_CONFIG_NAME) {
  /**
   * @zh_CN 单选框数据
   * @en_US Radio data
   */
  readonly data = input<XData<XRadioNode>>([]);
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
   * @zh_CN 允许取消选中
   * @en_US Allow cancel checked
   */
  readonly allowCancel = input<boolean, XBoolean>(false, { transform: XToBoolean });
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
 * Radio Option
 */
export interface XRadioOption extends XFormOption {
  /**
   * @zh_CN 单选框数据
   * @en_US Radio data
   */
  data?: XData<XRadioNode>;
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
   * @zh_CN 允许取消选中
   * @en_US Allow cancel checked
   */
  allowCancel?: boolean;
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
 * @zh_CN Radio 数据对象
 * @en_US Radio data object
 */
export interface XRadioNode extends XIdentityProperty {
  /**
   * @zh_CN 禁用
   * @en_US Disabled
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
}
