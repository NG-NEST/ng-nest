import { XNumber, XPropertyFunction, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';

/**
 * Affix
 * @selector x-affix
 * @decorator component
 */
export const XAffixPrefix = 'x-affix';
export const X_AFFIX_CONFIG_NAME = 'affix';

/**
 * Affix Property
 */
@Component({ selector: `${XAffixPrefix}-property`, template: '' })
export class XAffixProperty extends XPropertyFunction(X_AFFIX_CONFIG_NAME) {
  /**
   * @zh_CN 顶部距离
   * @en_US Distance from top
   */
  readonly top = input<string, XNumber>(this.config?.top!, { transform: XToCssPixelValue });
  /**
   * @zh_CN 左边距离
   * @en_US Distance from left
   */
  readonly left = input<string, XNumber>(this.config?.left!, { transform: XToCssPixelValue });
}
