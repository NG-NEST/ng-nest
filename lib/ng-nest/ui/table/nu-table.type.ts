import { NuIdentityOption, NuData, NuQuery } from "@ng-nest/ui/core";
import { NuButtonOption } from "@ng-nest/ui/button";
import { NuPaginationOption } from "@ng-nest/ui/pagination";

/**
 * Table 组件名
 * @selector nu-table
 * @decorator component
 */
export const TablePrefix = "nu-table";

/**
 * Table 参数对象
 */
export interface NuTableOption extends NuPaginationOption {
  /**
   * 数据
   */
  nuData?: NuData<any[]>;
  /**
   * 列集合
   */
  nuColumns?: NuTableColumn[];
  /**
   * 操作集合
   */
  nuActions?: NuTableAction[];
  /**
   * 查询条件
   */
  nuQuery?: NuQuery;
  /**
   * 隐藏表格列头
   */
  nuTableHeaderHidden?: boolean;
  /**
   * 隐藏表格分页
   */
  nuTableFooterHidden?: boolean;
  /**
   * 允许行点击选中
   */
  nuAllowSelectRow?: boolean;
  /**
   * 行主键
   */
  nuRowPrimary?: string;
}

/**
 * 列参数
 */
export interface NuTableColumn extends NuIdentityOption {
  /**
   * 宽度
   */
  nuWidth?: number;
  /**
   * flex 布局宽度
   */
  nuFlex?: number;
}

/**
 * 操作参数
 */
export interface NuTableAction extends NuButtonOption {
  /**
   * 操作按钮位置
   */
  nuActionLayoutType?: NuTableActionLayoutType;
  /**
   * 事件
   * 触发的时候自动赋值返回
   */
  nuEvent?: Event;
  /**
   * 触发分组的功能
   */
  nuGroup?: string;
  /**
   * 激活的
   */
  nuActivated?: boolean;
}

/**
 * 操作按钮位置
 * @value "top-left" 顶部靠左（默认）
 * @value "top-right" 顶部靠右
 * @value "row" 行操作
 */
export type NuTableActionLayoutType =
  | "top-left"
  | "top-right"
  | "top-right-icon"
  | "row-icon";
