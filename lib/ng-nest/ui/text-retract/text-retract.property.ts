import { Input, Component } from '@angular/core';
import { XInputNumber, XNumber, XWithConfig } from '@ng-nest/ui/core';

/**
 * TextRetract
 * @selector x-text-retract
 * @decorator component
 */
export const XTextRetractPrefix = 'x-text-retract';
const X_CONFIG_NAME = 'textRetract';

/**
 * TextRetract Property
 */
@Component({ selector: `${XTextRetractPrefix}-property`, template: '' })
export class XTextRetractProperty {
  /**
   * @zh_CN 文本
   * @en_US text
   */
  @Input() content?: string;
  /**
   * @zh_CN 默认最大显示字符数
   * @en_US Default maximum number of characters displayed
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 256) @XInputNumber() max?: XNumber;
}
