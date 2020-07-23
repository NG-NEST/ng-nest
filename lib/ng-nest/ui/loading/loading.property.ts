import { XProperty, XInputBoolean, XSize, XTemplate, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Loading
 * @selector x-loading
 * @decorator component
 */
export const XLoadingPrefix = 'x-loading';
const X_CONFIG_NAME = 'loading';

/**
 * Loading Property
 */
@Component({ template: '' })
export class XLoadingProperty extends XProperty {
  /**
   * 显示 loading
   */
  @Input('x-loading') @XInputBoolean() loading: XBoolean = false;
  /**
   * 尺寸
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size: XSize;
  /**
   * 显示文字，支持自定义模板
   */
  @Input() @XWithConfig<XTemplate>(X_CONFIG_NAME) text: XTemplate;
  /**
   * 显示的图标
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) icon: string;
  /**
   * 颜色
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) color: string;
  /**
   * 全屏显示
   */
  @Input() @XInputBoolean() fullScreen: XBoolean;
  /**
   * 背景样式
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) background: string;
}
