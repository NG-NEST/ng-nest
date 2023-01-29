import { XProperty, XInputBoolean, XSize, XTemplate, XBoolean, XWithConfig, XNumber } from '@ng-nest/ui/core';
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
   * @zh_CN 显示 loading
   * @en_US Show loading
   */
  @Input('x-loading') @XInputBoolean() loading: XBoolean = false;
  /**
   * @zh_CN 层级
   * @en_US z-index
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 10) zIndex?: XNumber;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize | number;
  /**
   * @zh_CN 显示文字，支持自定义模板
   * @en_US Display text, support custom template
   */
  @Input() @XWithConfig<XTemplate>(X_CONFIG_NAME) text?: XTemplate;
  /**
   * @zh_CN 显示的图标
   * @en_US Icon displayed
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) icon?: string;
  /**
   * @zh_CN 颜色
   * @en_US Color
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) color?: string;
  /**
   * @zh_CN 全屏显示
   * @en_US Full-screen display
   */
  @Input() @XInputBoolean() fullScreen?: XBoolean;
  /**
   * @zh_CN 背景样式
   * @en_US Background style
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) background?: string;
}
