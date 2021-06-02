import { XProperty, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Affix
 * @selector x-affix
 * @decorator component
 */
export const XAffixPrefix = 'x-affix';
const X_CONFIG_NAME = 'affix';

/**
 * Affix Property
 */
@Component({ template: '' })
export class XAffixProperty extends XProperty {
  /**
   * @zh_CN 距离顶部距离
   * @en_US Distance from top
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) top?: string;
  /**
   * @zh_CN 距离左边距离
   * @en_US Distance from left
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) left?: string;
}
