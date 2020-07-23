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
@Component({ template: '' })
export class XTextRetractProperty {
  /**
   * 文本
   */
  @Input() content: string;
  /**
   * 默认最大显示字符数
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 256) @XInputNumber() max: XNumber;
}
