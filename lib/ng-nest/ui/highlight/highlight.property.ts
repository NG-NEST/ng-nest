import { XProperty } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Highlight
 * @selector x-highlight
 * @decorator component
 */
export const XHighlightPrefix = 'x-highlight';

/**
 * Highlight Property
 */
@Component({ template: '' })
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
