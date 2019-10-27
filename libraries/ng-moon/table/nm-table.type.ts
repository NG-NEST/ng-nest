import { NmIdentityOption, NmData } from "ng-moon/core";
import { NmButtonOption } from "ng-moon/button";
import { NmPaginationOption } from "ng-moon/pagination";

/**
 * Table 组件名
 * @selector nm-table
 * @decorator component
 */
export const TablePrefix = "nm-table";

/**
 * Table 参数对象
 */
export interface NmTableOption extends NmPaginationOption {
  /**
   * 数据
   */
  nmData?: NmData<any[]>;
  /**
   * 列集合
   */
  nmColumns?: NmTableColumn[];
  /**
   * 操作集合
   */
  nmActions?: NmTableAction[];
}

/**
 * 列参数
 */
export interface NmTableColumn extends NmIdentityOption {
  /**
   * 宽度
   */
  nmWidth?: number;
  /**
   * flex 布局宽度
   */
  nmFlex?: number;
}

/**
 * 操作参数
 */
export interface NmTableAction extends NmButtonOption {
  /**
   * 操作按钮位置
   */
  nmActionLayoutType?: NmTableActionLayoutType;
  /**
   * 事件
   * 触发的时候自动赋值返回
   */
  nmEvent?: Event;
}

/**
 * 操作按钮位置
 * @value "top-left" 顶部靠左（默认）
 * @value "top-right" 顶部靠右
 * @value "row" 行操作
 */
export type NmTableActionLayoutType =
  | "top-left"
  | "top-right"
  | "top-right-icon"
  | "row-icon";
