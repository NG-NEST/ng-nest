import { XProperty, XInputNumber, XNumber } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Interface } from 'readline';

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
  @Input() @XInputNumber() index: XNumber = 1;
  /**
   * 每页显示条数
   */
  @Input() @XInputNumber() size: XNumber = 10;
  /**
   * 总数
   */
  @Input() @XInputNumber() total: XNumber = 0;
  /**
   * 页码变化的事件
   */
  @Output() indexChange = new EventEmitter<number>();
  /**
   * 每页显示条数变化的事件
   */
  @Output() sizeChange = new EventEmitter<number>();
}

export interface XPaginationOption {
  /**
   * 当前页码
   */
  index?: XNumber;
  /**
   * 每页显示条数
   */
  size?: XNumber;
  /**
   * 总数
   */
  total?: XNumber;
}
