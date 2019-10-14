/**
 * Table 组件名
 * @selector nm-table
 * @decorator component
 */
export const TablePrefix = "nm-table";

/**
 * Table 参数对象
 */
export interface NmTableOption {
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
export interface NmTableColumn {}

/**
 * 操作参数
 */
export interface NmTableAction {
  /**
   * 类型
   */
  nmType?: NmTableActionType;
}

/**
 * 操作方式
 * @value "top" 顶部操作
 * @value "row" 行操作
 */
export type NmTableActionType = "top" | "row";
