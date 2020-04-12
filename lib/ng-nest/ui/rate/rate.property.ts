import { XControlValueAccessor, XInputNumber } from '@ng-nest/ui/core';
import { Renderer2, Input } from '@angular/core';

/**
 * Rate
 * @selector x-rate
 * @decorator component
 */
export const XRatePrefix = 'x-rate';

/**
 * Rate Property
 */
export class XRateProperty extends XControlValueAccessor<any> {
  /**
   * 评分个数
   */
  @Input() @XInputNumber() count = 5;

  constructor(public renderer: Renderer2) {
    super(renderer);
  }
}
