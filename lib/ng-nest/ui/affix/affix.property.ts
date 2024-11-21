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
@Component({
    selector: `${XAffixPrefix}-property`, template: ''
})
export class XAffixProperty extends XPropertyFunction(X_AFFIX_CONFIG_NAME) {
  /**
   * @zh_CN 顶部距离
   * @en_US Distance from top
   * @example
   * 
   * ```html
   * <x-affix top="5rem">
   *   <div>有垂直滚动条，我与顶部距离5rem</div>
   * </x-affix>
   * ```
   * 
   */
  readonly top = input<string, XNumber>(this.config?.top!, { transform: XToCssPixelValue });
  /**
   * @zh_CN 左边距离
   * @en_US Distance from left
   * @example
   * 
   * ```html
   * <x-affix left="5rem">
   *   <div>有横向滚动条，我与左边距离5rem</div>
   * </x-affix>
   * ```
   * 
   */
  readonly left = input<string, XNumber>(this.config?.left!, { transform: XToCssPixelValue });
}
