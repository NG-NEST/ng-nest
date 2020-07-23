import { XProperty, XNumber, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Color
 * @selector x-color
 * @decorator component
 */
export const XColorPrefix = 'x-color';

const X_CONFIG_NAME = 'color';

export const XAmounts = [-0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

/**
 * Color Property
 */
@Component({ template: '' })
export class XColorProperty extends XProperty {
  /**
   * 颜色名称
   */
  @Input() label: string = 'color';
  /**
   * 十六进制颜色码，此处默认读取 css 变量中的主色
   */
  @Input() hex: string = 'var(--x-primary)';
  /**
   * 混合的颜色
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '#ffffff') merge: string;
  /**
   * 混合的颜色占比
   */
  @Input() @XWithConfig<XNumber[]>(X_CONFIG_NAME, XAmounts) amounts: XNumber[];
}
