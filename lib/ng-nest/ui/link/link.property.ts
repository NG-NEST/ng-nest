import { XPropertyFunction, XToBoolean } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XBoolean, XType } from '@ng-nest/ui/core';

/**
 * Link
 * @selector x-link
 * @decorator component
 */
export const XLinkPrefix = 'x-link';
const X_LINK_CONFIG_NAME = 'link';

/**
 * Link Property
 */
@Component({ selector: `${XLinkPrefix}-property`, template: '' })
export class XLinkProperty extends XPropertyFunction(X_LINK_CONFIG_NAME) {
  /**
   * @zh_CN 链接
   * @en_US Link
   */
  readonly href = input<string>();
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  readonly icon = input<string>();
  /**
   * @zh_CN 下划线
   * @en_US Underscore
   */
  readonly underline = input<boolean, XBoolean>(this.config?.underline ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 图标靠右对齐
   * @en_US Icons are aligned to the right
   */
  readonly iconRight = input<boolean, XBoolean>(this.config?.iconRight ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 阻止超链接的默认行为
   * @en_US Block the default behavior of hyperlinks
   */
  readonly preventDefault = input<boolean, XBoolean>(this.config?.preventDefault ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 链接类型
   * @en_US Link type
   */
  readonly type = input<XLinkType>('initial');
  /**
   * @zh_CN 打开方式
   * @en_US Open method
   */
  readonly target = input<string>();
}

/**
 * @zh_CN 链接类型
 * @en_US Link type
 */
export type XLinkType = XType;
