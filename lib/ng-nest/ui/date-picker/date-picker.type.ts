import { XIdentityInput, XFormProperty, XParentIdentityInput } from '@ng-nest/ui/core';
import { InjectionToken } from '@angular/core';

/**
 * DatePicker 组件名
 * @selector x-date-picker
 * @decorator component
 */
export const XDatePickerPrefix = 'x-date-picker';

/**
 * DatePicker @Input
 */
export interface XDatePickerInput extends XIdentityInput, XFormProperty {}

/**
 * DatePicker 数据对象
 */
export interface XDatePickerNode extends XParentIdentityInput {}

/**
 * 日期选择类型
 * @value "date"
 * @value "month"
 * @value "year"
 */
export type XDatePickerType = 'date' | 'month' | 'year';

/**
 * 日期数据类型
 * @value "date"
 * @value "number"
 * @value "string"
 */
export type XDatePickerModelType = 'date' | 'number' | 'string';

/**
 * DatePicker-Portal 组件名
 * @selector x-date-picker-portal
 * @decorator component
 */
export const XDatePickerPortalPrefix = 'x-date-picker-portal';

export const XDatePickerPortal = new InjectionToken<{}>('x-date-picker-portal');
