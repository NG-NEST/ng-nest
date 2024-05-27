import { XBoolean, XCorner, XInputBoolean, XSize, XWithConfig } from '@ng-nest/ui/core';
import { Component, Input } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

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
@Component({ selector: `${XColorPickerPrefix}-property`, template: '' })
export class XColorPickerProperty extends XControlValueAccessor<string> implements XColorPickerOption {
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XCorner>(X_CONFIG_NAME, 'bottom-start') placement?: XCorner;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
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
