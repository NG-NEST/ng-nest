import { XProperty, XWithConfig, XNumber, XControlValueAccessor, XColorsTheme, XInputBoolean, XBoolean } from '@ng-nest/ui/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { emit } from 'process';

/**
 * Theme
 * @selector x-theme
 * @decorator component
 */
export const XThemePrefix = 'x-theme';

const X_CONFIG_NAME = 'theme';

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
  @Input() @XWithConfig<XNumber[]>(X_CONFIG_NAME, XThemeAmounts) amounts: XNumber[];
  /**
   * 显示暗黑模式的设置
   */
  @Input() @XInputBoolean() showDark: XBoolean;
  /**
   * 详细设置
   */
  @Input() @XInputBoolean() showDetail: XBoolean;
  /**
   * 暗黑模式
   */
  @Input() @XInputBoolean() dark: XBoolean = false;
  /**
   * 初始化默认值事件
   */
  @Output() defaultClick = new EventEmitter<XColorsTheme>();
  /**
   * 暗黑模式改变事件
   */
  @Output() darkChange = new EventEmitter<XBoolean>();
}
