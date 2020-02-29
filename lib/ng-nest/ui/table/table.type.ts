import {
  XIdentityInput,
  XData,
  XQuery,
  XRepositoryAbstract
} from "@ng-nest/ui/core";
import { XButtonInput } from "@ng-nest/ui/button";
import { XPaginationInput } from "@ng-nest/ui/pagination";
import { TemplateRef } from "@angular/core";

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
   * 当前页码
   */
  index?: number;
  /**
   * 每页显示条数
   */
  size?: number;
  /**
   * 总条数
   */
  total?: number;
  /**
   * 数据服务
   */
  service?: XRepositoryAbstract;
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
   * 选中第一行数据，触发选中回调
   */
  firstRowSelected?: boolean;
  /**
   * 行主键
   */
  rowPrimary?: string;
  /**
   * 当前选中行数据
   */
  activatedRow?: any;
  /**
   * 查找框提示信息
   * @default "查找"
   */
  searchPlaceholder?: string;
  /**
   * 隐藏序号列
   */
  serialNumberHidden?: boolean;
  /**
   * 列头自定义模板
   */
  headerColumnTpl?: XTableColumnTemplate;
  /**
   * 列内容自定义模板
   */
  bodyColumnTpl?: XTableColumnTemplate;
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
  /**
   * 查询字段
   */
  search?: boolean;
  /**
   * 排序字段
   */
  sort?: boolean;
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
 * @value "top-right-icon" 顶部靠右图标
 * @value "row-icon" 行中的操作按钮
 */
export type XTableActionLayoutType =
  | "top-left"
  | "top-right"
  | "top-right-icon"
  | "row-icon";

export type XTableColumnTemplate = { [property: string]: TemplateRef<any> };
