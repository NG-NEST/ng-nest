import { XProperty, XInputNumber, XNumber, XQuery, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Pagination
 * @selector x-pagination
 * @decorator component
 */
export const XPaginationPrefix = 'x-pagination';
const X_CONFIG_NAME = 'pagination';

/**
 * Pagination Property
 */
@Component({ template: '' })
export class XPaginationProperty extends XProperty {
  /**
   * 当前页码
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 1) @XInputNumber() index: XNumber;
  /**
   * 每页显示条数
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 10) @XInputNumber() size: XNumber;
  /**
   * 总数
   */
  @Input() @XInputNumber() total: XNumber = 0;
  /**
   * 查询条件
   */
  @Input() query: XQuery = {};
  /**
   * 页码变化的事件
   */
  @Output() queryChange = new EventEmitter<XQuery>();
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
