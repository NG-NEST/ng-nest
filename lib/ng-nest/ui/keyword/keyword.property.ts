import { XPropertyFunction, XToBoolean } from '@ng-nest/ui/core';
import { Directive, input } from '@angular/core';
import type { XBoolean, XType } from '@ng-nest/ui/core';

/**
 * Keyword
 * @selector x-keyword
 * @decorator directive
 */
export const XKeywordPrefix = 'x-keyword';
const X_KEYWORD_CONFIG_NAME = 'keyword';

/**
 * Keyword Property
 */
@Directive({ selector: '[x-keyword]' })
export class XKeywordProperty extends XPropertyFunction(X_KEYWORD_CONFIG_NAME) {
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  readonly type = input<XKeywordType>(this.config?.type ?? 'primary');
  /**
   * @zh_CN 匹配关键字区分大小写
   * @en_US Case-sensitive
   */
  readonly caseSensitive = input<boolean, XBoolean>(this.config?.caseSensitive ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 颜色
   * @en_US color
   */
  readonly color = input<string>(this.config?.color ?? '');
  /**
   * @zh_CN 文字
   * @en_US text
   */
  readonly text = input<string | string[]>();
}

/**
 * @zh_CN 类型
 * @en_US Keyword type
 */
export type XKeywordType = XType;
