import { XPropertyFunction, XToBoolean } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XBoolean } from '@ng-nest/ui/core';

/**
 * Icon
 * @selector x-icon
 * @decorator component
 */
export const XIconPrefix = 'x-icon';
const X_ICON_CONFIG_NAME = 'icon';

/**
 * Icon Property
 */
@Component({ selector: `${XIconPrefix}-property`, template: '' })
export class XIconProperty extends XPropertyFunction(X_ICON_CONFIG_NAME) {
  /**
   * @zh_CN SVG 图标根路径地址，可以通过全局只配置一次，所有图标资源在 github 上的 ng-nest-icon 中
   * @en_US The root address of the SVG icon can be configured only once globally. All icon resources are in ng-nest-icon on github
   */
  readonly href = input<string>(this.config?.href ?? 'https://ngnest.com/static/icons/');
  /**
   * @zh_CN 图标类型
   * @en_US Icon type
   * @example
   *
   * ```html
   * <x-icon type="fto-activity"></x-icon>
   * <x-icon type="fto-airplay"></x-icon>
   * <x-icon type="fto-anchor"></x-icon>
   * ```
   *
   */
  readonly type = input<string>();
  /**
   * @zh_CN 图标颜色
   * @en_US Icon color
   * @example
   *
   * ```html
   * <x-icon color="red" type="fto-activity"></x-icon>
   * ```
   *
   */
  readonly color = input<string>();
  /**
   * @zh_CN loading效果（图标一直旋转）
   * @en_US Loading effect (icon keeps rotating)
   * @example
   *
   * ```html
   * <x-icon spin="true" type="fto-loader"></x-icon>
   * ```
   *
   */
  readonly spin = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 图标来源
 * @en_US Icon source
 */
export type XIconSource = 'ant-design' | 'eva' | 'feather' | 'font-awesome' | 'material-design';
