import { XIdentityOption, XData } from "@ng-nest/ui/core";
import { TemplateRef } from "@angular/core";

/**
 * Pagination 组件名
 * @selector x-pagination
 * @decorator component
 */
export const PaginationPrefix = "x-pagination";

/**
 * Pagination 参数对象
 */
export interface XPaginationOption {
  /**
   * 当前页码
   * @default 1
   */
  index?: number;
  /**
   * 每页显示条数
   * @default 10
   */
  size?: number;
  /**
   * 总数
   * @default 0
   */
  total?: number;
}

/**
 * Pagination 数据对象
 */
export interface XPaginationNode extends XIdentityOption {}
