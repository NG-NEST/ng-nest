import { XControlValueAccessor, XCorner, XFormOption, XWithConfig } from '@ng-nest/ui/core';
import { Component, Input } from '@angular/core';

/**
 * ColorPicker
 * @selector x-color-picker
 * @decorator component
 */
export const XColorPickerPrefix = 'x-color-picker';

const X_CONFIG_NAME = 'colorPicker';

/**
 * ColorPicker Property
 */
@Component({ template: '' })
export class XColorPickerProperty extends XControlValueAccessor<string> implements XColorPickerOption {
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XCorner>(X_CONFIG_NAME, 'bottom-start') placement: XCorner;
}

/**
 * ColorPicker Option
 * @undocument true
 */
export interface XColorPickerOption extends XFormOption {
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XCorner;
}

/**
 * @zh_CN 颜色种类
 * @en_US Color type
 */
export type XColorType = 'hex' | 'rgba' | 'hsla';

/**
 * ColorPicker-Portal
 * @selector x-color-picker-portal
 * @decorator component
 */
export const XColorPickerPortalPrefix = 'x-color-picker-portal';
