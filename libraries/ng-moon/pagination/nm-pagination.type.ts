import { NmIdentityOption, NmData } from "ng-moon/core";
import { TemplateRef } from "@angular/core";

/**
 * Pagination 组件名
 * @selector nm-pagination
 * @decorator component
 */
export const PaginationPrefix = "nm-pagination";

/**
 * Pagination 参数对象
 */
export interface NmPaginationOption {
  /**
   * 当前页码
   * @default 1
   */
  nmIndex?: number;
  /**
   * 每页显示条数
   * @default 10
   */
  nmSize?: number;
  /**
   * 总数
   * @default 0
   */
  nmTotal?: number;
}

/**
 * Pagination 数据对象
 */
export interface NmPaginationNode extends NmIdentityOption {}
