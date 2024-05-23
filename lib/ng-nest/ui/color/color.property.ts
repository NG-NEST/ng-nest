import { XPropertyFunction } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';

/**
 * Color
 * @selector x-color
 * @decorator component
 */
export const XColorPrefix = 'x-color';
const X_COLOR_CONFIG_NAME = 'color';

/**
 * Color Property
 */
@Component({ selector: `${XColorPrefix}-property`, template: '' })
export class XColorProperty extends XPropertyFunction(X_COLOR_CONFIG_NAME) {
  /**
   * @zh_CN 颜色名称
   * @en_US Color name
   */
  readonly label = input<string>('color');
  /**
   * @zh_CN 十六进制颜色码，此处默认读取 css 变量中的主色
   * @en_US Hexadecimal color code, here the main color in the css variable is read by default
   * @default 'var(--x-primary)'
   */
  readonly hex = input<string>('var(--x-primary)');
  /**
   * @zh_CN 混合的颜色
   * @en_US Mixed colors
   */
  readonly merge = input<string>(this.config?.merge ?? '#ffffff');
  /**
   * @zh_CN 混合的颜色占比
   * @en_US Proportion of mixed colors
   * @default [-0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
   */
  readonly amounts = input<number[]>(this.config?.amounts ?? [-0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
}
