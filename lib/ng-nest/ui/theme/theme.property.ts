import { XColorsTheme, XBoolean, XToBoolean } from '@ng-nest/ui/core';
import { Component, input, model, output } from '@angular/core';
import { XFormControlFunction } from '@ng-nest/ui/base-form';

/**
 * Theme
 * @selector x-theme
 * @decorator component
 */
export const XThemePrefix = 'x-theme';
const X_THEME_CONFIG_NAME = 'theme';

/**
 * @zh_CN 混合的颜色占比
 * @en_US Proportion of mixed colors
 */
export const XThemeAmounts = [
  -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9
];

/**
 * Theme Property
 */
@Component({ selector: `${XThemePrefix}-property`, template: '' })
export class XThemeProperty extends XFormControlFunction(X_THEME_CONFIG_NAME) {
  /**
   * @zh_CN 参数前缀
   * @en_US Parameter prefix
   */
  readonly prefix = input<string>('--x-');
  /**
   * @zh_CN 混合的颜色占比
   * @en_US Proportion of mixed colors
   */
  readonly amounts = input<number[]>(this.config?.amounts ?? XThemeAmounts);
  /**
   * @zh_CN 显示暗黑模式的设置
   * @en_US Show dark mode settings
   */
  readonly showDark = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 详细设置
   * @en_US Detailed settings
   */
  readonly showDetail = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 暗黑模式
   * @en_US Dark mode
   */
  readonly dark = model(false);
  /**
   * @zh_CN 初始化默认值事件
   * @en_US Initialize default value event
   */
  readonly defaultClick = output<XColorsTheme>();
}
