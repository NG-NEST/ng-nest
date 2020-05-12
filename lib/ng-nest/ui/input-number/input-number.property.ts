import { XControlValueAccessor, XInputNumber, XNumber, XFormOption } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * InputNumber
 * @selector x-input-number
 * @decorator component
 */
export const XInputNumberPrefix = 'x-input-number';

/**
 * InputNumber Property
 */
@Component({ template: '' })
export class XInputNumberProperty extends XControlValueAccessor<any> implements XInputNumberOption {
  /**
   * 最小值
   */
  @Input() @XInputNumber() min: XNumber = Number.MIN_SAFE_INTEGER;
  /**
   * 最大值
   */
  @Input() @XInputNumber() max: XNumber = Number.MAX_SAFE_INTEGER;
  /**
   * 步数
   */
  @Input() @XInputNumber() step: XNumber = 1;
  /**
   * 按住后步进速度
   */
  @Input() @XInputNumber() debounce: XNumber = 40;
  /**
   * 精度
   */
  @Input() @XInputNumber() precision: XNumber = 0;
}

/**
 * InputNumber Option
 * @undocument true
 */
export interface XInputNumberOption extends XFormOption {
  /**
   * 最小值
   */
  min?: XNumber;
  /**
   * 最大值
   */
  max?: XNumber;
  /**
   * 步数
   */
  step?: XNumber;
  /**
   * 按住后步进速度
   */
  debounce?: XNumber;
  /**
   * 精度
   */
  precision?: XNumber;
}
