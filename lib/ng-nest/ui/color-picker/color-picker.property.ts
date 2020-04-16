import { XControlValueAccessor } from '@ng-nest/ui/core';
import { Component } from '@angular/core';

/**
 * ColorPicker
 * @selector x-color-picker
 * @decorator component
 */
export const XColorPickerPrefix = 'x-color-picker';

/**
 * ColorPicker Property
 */
@Component({ template: '' })
export class XColorPickerProperty extends XControlValueAccessor<string> {}

/**
 * 颜色种类
 */
export type XColorType = 'hex' | 'rgba' | 'hsla';

/**
 * ColorPicker-Portal
 * @selector x-color-picker-portal
 * @decorator component
 */
export const XColorPickerPortalPrefix = 'x-color-picker-portal';
