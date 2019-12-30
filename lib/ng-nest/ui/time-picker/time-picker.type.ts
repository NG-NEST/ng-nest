import { XIdentityInput, XFormProperty, XParentIdentityInput } from "@ng-nest/ui/core";
import { InjectionToken } from "@angular/core";

/**
 * TimePicker 组件名
 * @selector x-time-picker
 * @decorator component
 */
export const XTimePickerPrefix = "x-time-picker";

/**
 * TimePicker @Input
 */
export interface XTimePickerInput extends XIdentityInput, XFormProperty {}

/**
 * TimePicker 数据对象
 */
export interface XTimePickerNode extends XParentIdentityInput {}

/**
 * 时间选择
 * @vlaue "date"
 * @vlaue "month"
 * @vlaue "year"
 */
export type XTimePickerType = "time" | "h" | "m" | "s" | "h-m" | "m-s";

/**
 * TimePicker-Portal 组件名
 * @selector x-time-picker-portal
 * @decorator component
 */
export const XTimePickerPortalPrefix = "x-time-picker-portal";

export const XTimePickerPortal = new InjectionToken<{}>("x-time-picker-portal");
