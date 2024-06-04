import { XPropertyFunction, XToBoolean, XToNumber } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XSize, XTemplate, XBoolean, XNumber, XCorner } from '@ng-nest/ui/core';

/**
 * Loading
 * @selector x-loading
 * @decorator component
 */
export const XLoadingPrefix = 'x-loading';
const X_LOADING_CONFIG_NAME = 'loading';

/**
 * Loading Property
 */
@Component({ selector: `${XLoadingPrefix}-property`, template: '' })
export class XLoadingProperty extends XPropertyFunction(X_LOADING_CONFIG_NAME) {
  /**
   * @zh_CN 显示 loading
   * @en_US Show loading
   */
  readonly loading = input<boolean, XBoolean>(false, { transform: XToBoolean, alias: 'x-loading' });
  /**
   * @zh_CN 层级
   * @en_US z-index
   */
  readonly zIndex = input<number, XNumber>(this.config?.zIndex ?? 10, { transform: XToNumber });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize | number>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 显示文字，支持自定义模板
   * @en_US Display text, support custom template
   */
  readonly text = input<XTemplate>(this.config?.text!);
  /**
   * @zh_CN 显示的图标
   * @en_US Icon displayed
   */
  readonly icon = input<string>(this.config?.icon!);
  /**
   * @zh_CN 颜色
   * @en_US Color
   */
  readonly color = input<string>(this.config?.color!);
  /**
   * @zh_CN 全屏显示
   * @en_US Full-screen display
   */
  readonly fullScreen = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 圆角覆盖显示
   * @en_US Rounded corner coverage display
   */
  readonly radius = input<XBoolean | XCorner[]>();
  /**
   * @zh_CN 背景样式
   * @en_US Background style
   */
  readonly background = input<string>(this.config?.background!);
}
