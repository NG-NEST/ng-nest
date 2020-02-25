import { InjectionToken } from "@angular/core";

/**
 * Popover 组件名
 * @selector x-popover
 * @decorator component
 */
export const XPopoverPrefix = "x-popover";

export const XPopoverPortal = new InjectionToken<{}>("x-popover-portal");

/**
 * 激活方式
 * @value "hover"
 * @value "click"
 */
export type XPopoverTrigger = "hover" | "click";

/**
 * Popover Portal 组件名
 * @selector x-popover-portal
 * @decorator component
 */
export const XPopoverPortalPrefix = "x-popover-portal";
