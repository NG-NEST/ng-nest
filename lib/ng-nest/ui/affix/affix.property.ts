import { XProperty } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Affix
 * @selector x-affix
 * @decorator component
 */
export const XAffixPrefix = 'x-affix';

/**
 * Affix Property
 */
@Component({ template: '' })
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
