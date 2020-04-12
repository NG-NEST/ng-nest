import { Input } from '@angular/core';
import { XInputNumber } from '@ng-nest/ui/core';

/**
 * TextRetract
 * @selector x-text-retract
 * @decorator component
 */
export const XTextRetractPrefix = 'x-text-retract';

/**
 * TextRetract Property
 */
export class XTextRetractProperty {
  /**
   * 文本
   */
  @Input() content: string;
  /**
   * 默认最大显示字符数
   */
  @Input() @XInputNumber() max: number = 256;
}
