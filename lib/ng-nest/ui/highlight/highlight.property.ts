import { XProperty } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Highlight
 * @selector x-highlight
 * @decorator component
 */
export const XHighlightPrefix = 'x-highlight';

/**
 * Highlight 对象
 */
export class XHighlightProperty extends XProperty {
  /**
   * 代码类型
   */
  @Input() type: string;
  /**
   * 数据
   */
  @Input() data: string;
}
