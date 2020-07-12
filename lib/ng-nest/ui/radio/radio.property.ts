import {
  XData,
  XControlValueAccessor,
  XIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XSize,
  XBoolean,
  XFormOption,
  XWithConfig
} from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
import { XButtonType } from '@ng-nest/ui/button';

/**
 * Radio
 * @selector x-radio
 * @decorator component
 */
export const XRadioPrefix = 'x-radio';

/**
 * Radio Property
 */
@Component({ template: '' })
export class XRadioProperty extends XControlValueAccessor<any> implements XRadioOption {
  /**
   * 单选框数据
   */
  @Input() @XDataConvert() data: XData<XRadioNode> = [];
  /**
   * 按钮样式
   */
  @Input() @XInputBoolean() button: XBoolean;
  /**
   * 图标样式
   */
  @Input() @XInputBoolean() icon: XBoolean;
  /**
   * 尺寸
   */
  @Input() @XWithConfig<XSize>('medium') size: XSize;
  /**
   * 按钮样式时生效
   */
  @Input() type: XButtonType = 'initial';
}

/**
 * Radio Option
 * @undocument true
 */
export interface XRadioOption extends XFormOption {
  /**
   * 单选框数据
   */
  data?: XData<XRadioNode>;
  /**
   * 按钮样式
   */
  button?: XBoolean;
  /**
   * 图标样式
   */
  icon?: XBoolean;
  /**
   * 尺寸
   */
  size?: XSize;
  /**
   * 按钮样式时生效
   */
  type?: XButtonType;
}

/**
 * Radio 数据对象
 */
export interface XRadioNode extends XIdentityProperty {
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 图标的提示信息
   */
  title?: string;
}
