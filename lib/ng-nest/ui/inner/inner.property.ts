import { XNumber, XPropertyFunction, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';

/**
 * Inner
 * @selector x-inner
 * @decorator component
 */
export const XInnerPrefix = 'x-inner';
const X_INNER_CONFIG_NAME = 'inner';

/**
 * Inner Property
 */
@Component({ selector: `${XInnerPrefix}-property`, template: '' })
export class XInnerProperty extends XPropertyFunction(X_INNER_CONFIG_NAME) {
  /**
   * @zh_CN 内边距
   * @en_US Inner padding
   */
  readonly padding = input<string, XNumber>(this.config?.padding ?? '1rem', { transform: XToCssPixelValue });
}
