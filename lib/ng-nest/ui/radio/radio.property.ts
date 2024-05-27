import { XData, XIdentityProperty, XDataConvert, XInputBoolean, XSize, XBoolean, XWithConfig, XTemplate } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
import { XButtonType } from '@ng-nest/ui/button';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Radio
 * @selector x-radio
 * @decorator component
 */
export const XRadioPrefix = 'x-radio';
const X_CONFIG_NAME = 'radio';

/**
 * Radio Property
 */
@Component({ selector: `${XRadioPrefix}-property`, template: '' })
export class XRadioProperty extends XControlValueAccessor<any> implements XRadioOption {
  /**
   * @zh_CN 单选框数据
   * @en_US Radio data
   */
  @Input() @XDataConvert() data: XData<XRadioNode> = [];
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
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize;
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
  @Input() @XInputBoolean() tagDark?: XBoolean;
  /**
   * @zh_CN 允许取消选中
   * @en_US Allow cancel checked
   */
  @Input() @XInputBoolean() allowCancel?: XBoolean;
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
}

/**
 * Radio Option
 * @undocument true
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
