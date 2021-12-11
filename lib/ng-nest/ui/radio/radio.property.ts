import { XData, XIdentityProperty, XDataConvert, XInputBoolean, XSize, XBoolean, XWithConfig } from '@ng-nest/ui/core';
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
@Component({ template: '' })
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
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize;
  /**
   * @zh_CN 按钮样式时生效
   * @en_US Take effect when button style
   */
  @Input() type: XButtonType = 'initial';
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
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 按钮样式时生效
   * @en_US Take effect when button style
   */
  type?: XButtonType;
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
