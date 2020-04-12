import { XProperty } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Color
 * @selector x-color
 * @decorator component
 */
export const XColorPrefix = 'x-color';

/**
 * Color Property
 */
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
  @Input() merge: string = '#ffffff';
  /**
   * 混合的颜色占比
   */
  @Input() amounts: number[] = [-0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
}
