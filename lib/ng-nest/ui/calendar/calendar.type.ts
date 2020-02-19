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
export interface XCalendarInput {}

/**
 * Calendar 数据对象
 */
export interface XCalendarData {
  [prop: string]: XCalendarNode[];
}

/**
 * Calendar 数据对象
 */
export interface XCalendarNode extends XIdentityInput {}
