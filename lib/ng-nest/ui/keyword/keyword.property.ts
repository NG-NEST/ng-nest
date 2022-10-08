import { XBoolean, XInputBoolean, XProperty, XType, XWithConfig } from '@ng-nest/ui/core';
import { Input, Directive } from '@angular/core';

/**
 * Keyword
 * @selector x-keyword
 * @decorator directive
 */
export const XKeywordPrefix = 'x-keyword';
const X_CONFIG_NAME = 'keyword';

/**
 * Keyword Property
 */
@Directive({ selector: '[x-keyword]' })
export class XKeywordProperty extends XProperty {
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  @Input() @XWithConfig<XKeywordType>(X_CONFIG_NAME, 'primary') type?: XKeywordType;
  /**
   * @zh_CN 匹配关键字区分大小写
   * @en_US Case-sensitive
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) caseSensitive!: XBoolean;
  /**
   * @zh_CN 颜色
   * @en_US color
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) color?: string;
  /**
   * @zh_CN 文字
   * @en_US text
   */
  @Input() text!: string | string[];
}

/**
 * @zh_CN 类型
 * @en_US Keyword type
 */
export type XKeywordType = XType;
