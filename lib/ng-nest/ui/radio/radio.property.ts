import { XData, XControlValueAccessor, XIdentityProperty, XDataConvert, XInputBoolean, XSize } from '@ng-nest/ui/core';
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
export class XRadioProperty extends XControlValueAccessor<any> {
  /**
   * 单选框数据
   */
  @Input() @XDataConvert() data: XData<XRadioNode> = [];
  /**
   * 按钮样式
   */
  @Input() @XInputBoolean() button: boolean;
  /**
   * 图标样式
   */
  @Input() @XInputBoolean() icon: boolean;
  /**
   * 尺寸
   */
  @Input() size: XSize = 'medium';
  /**
   * 按钮样式时生效
   */
  @Input() type: XButtonType = 'initial';
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
