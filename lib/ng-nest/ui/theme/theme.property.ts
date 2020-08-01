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
   * @zh_CN 参数前缀
   * @en_US Parameter prefix
   */
  @Input() prefix: string = '--x-';
  /**
   * @zh_CN 混合的颜色占比
   * @en_US Proportion of mixed colors
   */
  @Input() @XWithConfig<XNumber[]>(X_CONFIG_NAME, XThemeAmounts) amounts: XNumber[];
  /**
   * @zh_CN 显示暗黑模式的设置
   * @en_US Show dark mode settings
   */
  @Input() @XInputBoolean() showDark: XBoolean;
  /**
   * @zh_CN 详细设置
   * @en_US Detailed settings
   */
  @Input() @XInputBoolean() showDetail: XBoolean;
  /**
   * @zh_CN 暗黑模式
   * @en_US Dark mode
   */
  @Input() @XInputBoolean() dark: XBoolean = false;
  /**
   * @zh_CN 初始化默认值事件
   * @en_US Initialize default value event
   */
  @Output() defaultClick = new EventEmitter<XColorsTheme>();
  /**
   * @zh_CN 暗黑模式改变事件
   * @en_US Dark mode change event
   */
  @Output() darkChange = new EventEmitter<XBoolean>();
}
