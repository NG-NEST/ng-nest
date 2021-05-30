import {
  XData,
  XTemplate,
  XIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XSize,
  XBoolean,
  XWithConfig
} from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
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
@Component({ template: '' })
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
  @Input() @XInputBoolean() button!: XBoolean;
  /**
   * @zh_CN 图标样式
   * @en_US Icon style
   */
  @Input() @XInputBoolean() icon!: XBoolean;
  /**
   * @zh_CN 不确定状态的样式
   * @en_US Uncertain state style
   */
  @Input() @XInputBoolean() indeterminate!: XBoolean;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size!: XSize;
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
   * @zh_CN 不确定状态的样式
   * @en_US Uncertain state style
   */
  indeterminate?: XBoolean;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
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
