import { XProperty, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Color
 * @selector x-color
 * @decorator component
 */
export const XColorPrefix = 'x-color';

const X_CONFIG_NAME = 'color';

/**
 * @zh_CN 颜色权重比例
 * @en_US Color weightings
 */
export const XAmounts = [-0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

/**
 * Color Property
 */
@Component({ selector: `${XColorPrefix}-property`, template: '' })
export class XColorProperty extends XProperty {
  /**
   * @zh_CN 颜色名称
   * @en_US Color name
   */
  @Input() label: string = 'color';
  /**
   * @zh_CN 十六进制颜色码，此处默认读取 css 变量中的主色
   * @en_US Hexadecimal color code, here the main color in the css variable is read by default
   */
  @Input() hex: string = 'var(--x-primary)';
  /**
   * @zh_CN 混合的颜色
   * @en_US Mixed colors
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '#ffffff') merge!: string;
  /**
   * @zh_CN 混合的颜色占比
   * @en_US Proportion of mixed colors
   */
  @Input() @XWithConfig<number[]>(X_CONFIG_NAME, XAmounts) amounts!: number[];
}
