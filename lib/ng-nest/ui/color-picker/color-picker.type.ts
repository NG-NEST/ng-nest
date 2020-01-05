import { XIdentityInput, XFormProperty, XParentIdentityInput } from "@ng-nest/ui/core";
import { InjectionToken } from "@angular/core";

/**
 * ColorPicker 组件名
 * @selector x-color-picker
 * @decorator component
 */
export const XColorPickerPrefix = "x-color-picker";

/**
 * ColorPicker @Input
 */
export interface XColorPickerInput extends XIdentityInput, XFormProperty {}

/**
 * ColorPicker 数据对象
 */
export interface XColorPickerNode extends XParentIdentityInput {}

/**
 * ColorPicker-Portal 组件名
 * @selector x-color-picker-portal
 * @decorator component
 */
export const XColorPickerPortalPrefix = "x-color-picker-portal";

export const XColorPickerPortal = new InjectionToken<{}>("x-color-picker-portal");
