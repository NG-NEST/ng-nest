import { XControlValueAccessor, XInputNumber } from '@ng-nest/ui/core';
import { Input, Renderer2 } from '@angular/core';

/**
 * InputNumber
 * @selector x-input-number
 * @decorator component
 */
export const XInputNumberPrefix = 'x-input-number';

/**
 * InputNumber Property
 */
export class XInputNumberProperty extends XControlValueAccessor<any> {
  /**
   * 最小值
   */
  @Input() @XInputNumber() min: number = Number.MIN_SAFE_INTEGER;
  /**
   * 最大值
   */
  @Input() @XInputNumber() max: number = Number.MAX_SAFE_INTEGER;
  /**
   * 步数
   */
  @Input() @XInputNumber() step: number = 1;
  /**
   * 按住后步进速度
   */
  @Input() @XInputNumber() debounce: number = 40;
  /**
   * 精度
   */
  @Input() @XInputNumber() precision: number = 0;

  constructor(public renderer: Renderer2) {
    super(renderer);
  }
}
