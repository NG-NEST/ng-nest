import { XProperty, XWithConfig, XNumber, XControlValueAccessor, XColorsTheme } from '@ng-nest/ui/core';
import { Component, Input } from '@angular/core';

/**
 * Theme
 * @selector x-theme
 * @decorator component
 */
export const XThemePrefix = 'x-theme';

export const XThemeAmounts = [-0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

/**
 * Theme Property
 */
@Component({ template: '' })
export class XThemeProperty extends XControlValueAccessor<XColorsTheme> {
  /**
   * 参数前缀
   */
  @Input() prefix: string = '--x-';
  /**
   * 混合的颜色占比
   */
  @Input() @XWithConfig<XNumber[]>(XThemeAmounts) amounts: XNumber[];
}
