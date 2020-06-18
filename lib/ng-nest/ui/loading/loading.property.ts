import { XProperty, XInputBoolean, XSize, XTemplate, XBoolean } from '@ng-nest/ui/core';
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
  @Input('x-loading') @XInputBoolean() loading: XBoolean = false;
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
  @Input() @XInputBoolean() fullScreen: XBoolean;
  /**
   * 背景样式
   */
  @Input() background: string;
}
