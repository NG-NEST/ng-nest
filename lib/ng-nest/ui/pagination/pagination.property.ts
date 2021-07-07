import { XProperty, XInputNumber, XNumber, XQuery, XWithConfig, XBoolean, XInputBoolean } from '@ng-nest/ui/core';
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
   * @zh_CN 当前页码
   * @en_US Current page number
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 1) @XInputNumber() index!: XNumber;
  /**
   * @zh_CN 每页显示条数
   * @en_US Number of items displayed per page
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 10) @XInputNumber() size!: XNumber;
  /**
   * @zh_CN 总数
   * @en_US Total
   */
  @Input() @XInputNumber() total: XNumber = 0;
  /**
   * @zh_CN 查询条件
   * @en_US Query conditions
   */
  @Input() query: XQuery = {};
  /**
   * @zh_CN 最多显示的分页数量
   * @en_US The largest number of pages display
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 5) @XInputNumber() pageLinkSize!: XNumber;
  /**
   * @zh_CN 显示首尾页跳转
   * @en_US Display the first and last page
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() showEllipsis!: XBoolean;
  /**
   * @zh_CN 显示总条数
   * @en_US Display the total
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() showTotal!: XBoolean;
  /**
   * @zh_CN 按钮间距，单位 rem （按 1rem = 16px 比例来计算）
   * @en_US Button spacing, unit rem (calculated according to the ratio of 1rem = 16px)
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 0) @XInputNumber() space!: XNumber;
  /**
   * @zh_CN 隐藏边框
   * @en_US Hide border
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() hiddenBorder?: XBoolean;
  /**
   * @zh_CN 页码变化的事件
   * @en_US Page number change event
   */
  @Output() queryChange = new EventEmitter<XQuery>();
  /**
   * @zh_CN 页码变化的事件
   * @en_US Page number change event
   */
  @Output() indexChange = new EventEmitter<number>();
  /**
   * @zh_CN 每页显示条数变化的事件
   * @en_US Show the number of events on each page
   */
  @Output() sizeChange = new EventEmitter<number>();
}

/**
 * PaginationOption
 */
export interface XPaginationOption {
  /**
   * @zh_CN 当前页码
   * @en_US Current page number
   */
  index?: XNumber;
  /**
   * @zh_CN 每页显示条数
   * @en_US Number of items displayed per page
   */
  size?: XNumber;
  /**
   * @zh_CN 总数
   * @en_US total
   */
  total?: XNumber;
}
