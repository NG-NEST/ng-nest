import { XData, XTemplate, XIdentityProperty, XDataConvert, XInputBoolean, XSize, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
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
  @Input() tagBordered: XBoolean = true;
  /**
   * @zh_CN tag 标签深色主题
   * @en_US Tag dark theme
   */
  @Input() tagDark: XBoolean = false;
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
