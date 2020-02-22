import { XIdentityInput } from "@ng-nest/ui/core";

/**
 * Calendar 组件名
 * @selector x-calendar
 * @decorator component
 */
export const XCalendarPrefix = "x-calendar";

/**
 * Calendar @Input
 */
export interface XCalendarInput {
  /**
   * 事务数据对象
   */
  data?: XCalendarData;
  /**
   * 显示模式
   * @default "month"
   */
  model?: XCalendarModel;
}

/**
 * Calendar 数据对象
 */
export interface XCalendarData {
  /**
   * key-value
   * 2020-2-22: [{label:"1",value:"1"}]
   */
  [prop: string]: XCalendarNode[];
}

/**
 * Calendar 数据对象
 */
export interface XCalendarNode extends XIdentityInput {}

/**
 * 显示模式
 * @value "month"
 * @value "year"
 */
export type XCalendarModel = "month" | "year";
