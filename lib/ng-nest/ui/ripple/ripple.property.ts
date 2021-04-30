import {
  XBoolean,
  XInputBoolean,
  XIsBoolean,
  XProperty,
  XType,
  XWithConfig
} from '@ng-nest/ui/core';
import { Input, Directive } from '@angular/core';

/**
 * Ripple
 * @selector x-ripple
 * @decorator directive
 */
export const XRipplePrefix = 'x-ripple';
const X_CONFIG_NAME = 'ripple';

/**
 * Ripple Property
 */
@Directive({ selector: '[x-ripple]' })
export class XRippleProperty extends XProperty {
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  @Input() @XWithConfig<XRippleType>(X_CONFIG_NAME, 'initial') type: XRippleType;
  /**
   * @zh_CN 禁用
   * @en_US Disable
   */
  @Input() @XInputBoolean() disabled: XBoolean;
}

/**
 * @zh_CN 波纹类型
 * @en_US Ripple type
 */
export type XRippleType = XType;
