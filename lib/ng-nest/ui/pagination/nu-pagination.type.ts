import { NuIdentityOption, NuData } from "@ng-nest/ui/core";
import { TemplateRef } from "@angular/core";

/**
 * Pagination 组件名
 * @selector nu-pagination
 * @decorator component
 */
export const PaginationPrefix = "nu-pagination";

/**
 * Pagination 参数对象
 */
export interface NuPaginationOption {
  /**
   * 当前页码
   * @default 1
   */
  nuIndex?: number;
  /**
   * 每页显示条数
   * @default 10
   */
  nuSize?: number;
  /**
   * 总数
   * @default 0
   */
  nuTotal?: number;
}

/**
 * Pagination 数据对象
 */
export interface NuPaginationNode extends NuIdentityOption {}
