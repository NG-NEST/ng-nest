import { XControlValueAccessor, XInputNumber, XNumber, XFormOption } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Rate
 * @selector x-rate
 * @decorator component
 */
export const XRatePrefix = 'x-rate';

/**
 * Rate Property
 */
@Component({ template: '' })
export class XRateProperty extends XControlValueAccessor<any> implements XRateOption {
  /**
   * @zh_CN 评分个数
   * @en_US Number of ratings
   */
  @Input() @XInputNumber() count: XNumber = 5;
}

/**
 * Rate Option
 * @undocument true
 */
export interface XRateOption extends XFormOption {
  /**
   * @zh_CN 评分个数
   * @en_US Number of ratings
   */
  count?: XNumber;
}
