import { XPropertyFunction, XToBoolean, XToNumber } from '@ng-nest/ui/core';
import { Directive, input } from '@angular/core';
import type { XBoolean, XNumber, XType } from '@ng-nest/ui/core';

/**
 * Ripple
 * @selector x-ripple
 * @decorator directive
 */
export const XRipplePrefix = 'x-ripple';
const X_RIPPLE_CONFIG_NAME = 'ripple';

/**
 * Ripple Property
 */
@Directive({ selector: '[x-ripple]' })
export class XRippleProperty extends XPropertyFunction(X_RIPPLE_CONFIG_NAME) {
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  readonly type = input<XRippleType>(this.config?.type ?? 'initial');
  /**
   * @zh_CN 执行时间
   * @en_US The execution time
   */
  readonly duration = input<number, XNumber>(500, {transform: XToNumber});
  /**
   * @zh_CN 禁用
   * @en_US Disable
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 波纹类型
 * @en_US Ripple type
 */
export type XRippleType = XType;
