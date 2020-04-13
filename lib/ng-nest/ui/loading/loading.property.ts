import { XProperty, XInputBoolean, XSize, XTemplate } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Loading
 * @selector x-loading
 * @decorator component
 */
export const XLoadingPrefix = 'x-loading';

/**
 * Loading Property
 */
@Component({ template: '' })
export class XLoadingProperty extends XProperty {
  /**
   * 显示 loading
   */
  @Input('x-loading') @XInputBoolean() loading: boolean;
  /**
   * 尺寸
   */
  @Input() size: XSize = 'medium';
  /**
   * 显示文字，支持自定义模板
   */
  @Input() text: XTemplate;
  /**
   * 显示的图标
   */
  @Input() icon: string;
  /**
   * 颜色
   */
  @Input() color: string;
  /**
   * 全屏显示
   */
  @Input('full-screen') @XInputBoolean() fullScreen: boolean;
  /**
   * 背景样式
   */
  @Input() background: string;
}
