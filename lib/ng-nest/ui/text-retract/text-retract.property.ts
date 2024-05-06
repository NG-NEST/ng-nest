import { Component, input } from '@angular/core';
import { XPropertyFunction, XToNumber } from '@ng-nest/ui/core';
import type { XNumber } from '@ng-nest/ui/core';

/**
 * TextRetract
 * @selector x-text-retract
 * @decorator component
 */
export const XTextRetractPrefix = 'x-text-retract';
const X_TEXT_RETRACT_CONFIG_NAME = 'textRetract';

/**
 * TextRetract Property
 */
@Component({ selector: `${XTextRetractPrefix}-property`, template: '' })
export class XTextRetractProperty extends XPropertyFunction(X_TEXT_RETRACT_CONFIG_NAME) {
  /**
   * @zh_CN 文本
   * @en_US text
   */
  readonly content = input<string>();
  /**
   * @zh_CN 默认最大显示字符数
   * @en_US Default maximum number of characters displayed
   */
  readonly max = input<number, XNumber>(this.config?.max ?? 256, { transform: XToNumber });
}
