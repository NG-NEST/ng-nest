import { XIdentityInput, XData, XQuery } from "@ng-nest/ui/core";
import { XButtonInput } from "@ng-nest/ui/button";
import { XPaginationInput } from "@ng-nest/ui/pagination";

/**
 * Table 组件名
 * @selector x-table
 * @decorator component
 */
export const TablePrefix = "x-table";

/**
 * Table @Input
 */
export interface XTableOption extends XPaginationInput {
  /**
   * 数据
   */
  data?: XData<any[]>;
  /**
   * 列集合
   */
  columns?: XTableColumn[];
  /**
   * 操作集合
   */
  actions?: XTableAction[];
  /**
   * 查询条件
   */
  query?: XQuery;
  /**
   * 隐藏表格列头
   */
  tableHeaderHidden?: boolean;
  /**
   * 隐藏表格分页
   */
  tableFooterHidden?: boolean;
  /**
   * 允许行点击选中
   */
  allowSelectRow?: boolean;
  /**
   * 行主键
   */
  rowPrimary?: string;
}

/**
 * 列参数
 */
export interface XTableColumn extends XIdentityInput {
  /**
   * 宽度
   */
  width?: number;
  /**
   * flex 布局宽度
   */
  flex?: number;
}

/**
 * 操作参数
 */
export interface XTableAction extends XButtonInput {
  /**
   * 操作按钮位置
   */
  actionLayoutType?: XTableActionLayoutType;
  /**
   * 事件
   * 触发的时候自动赋值返回
   */
  event?: Event;
  /**
   * 触发分组的功能
   */
  group?: string;
  /**
   * 激活的
   */
  activated?: boolean;
}

/**
 * 操作按钮位置
 * @value "top-left" 顶部靠左（默认）
 * @value "top-right" 顶部靠右
 * @value "row" 行操作
 */
export type XTableActionLayoutType =
  | "top-left"
  | "top-right"
  | "top-right-icon"
  | "row-icon";
