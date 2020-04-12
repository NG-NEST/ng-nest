import { XProperty } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Affix
 * @selector x-affix
 * @decorator component
 */
export const XAffixPrefix = 'x-affix';

/**
 * Affix Property
 */
export class XAffixProperty extends XProperty {
  /**
   * 距离顶部距离
   */
  @Input() top?: string;
  /**
   * 距离左边距离
   */
  @Input() left?: string;
}
