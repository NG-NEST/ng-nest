import { XControlValueAccessor, XInputNumber, XNumber } from '@ng-nest/ui/core';
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
export class XInputNumberProperty extends XControlValueAccessor<any> {
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
