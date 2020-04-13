import { XProperty, XInputNumber } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Pagination
 * @selector x-pagination
 * @decorator component
 */
export const XPaginationPrefix = 'x-pagination';

/**
 * Pagination Property
 */
@Component({ template: '' })
export class XPaginationProperty extends XProperty {
  /**
   * 当前页码
   */
  @Input() @XInputNumber() index: number = 1;
  /**
   * 每页显示条数
   */
  @Input() @XInputNumber() size: number = 10;
  /**
   * 总数
   */
  @Input() @XInputNumber() total: number = 0;
  /**
   * 页码变化的事件
   */
  @Output() indexChange = new EventEmitter<number>();
}
