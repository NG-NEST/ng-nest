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
   * @example
   *
   * ```html
   * <x-link href="https://www.ngnest.com" target="_blank">ng-nest</x-link>
   * ```
   *
   */
  readonly href = input<string>();
  /**
   * @zh_CN 图标
   * @en_US Icon
   * @example
   *
   * ```html
   * <x-link icon="fto-chevron-left">left</x-link>
   * <x-link icon="fto-chevron-right">right</x-link>
   * ```
   *
   */
  readonly icon = input<string>();
  /**
   * @zh_CN 下划线
   * @en_US Underscore
   * @example
   *
   * ```html
   * <x-link underline>underline</x-link>
   * ```
   *
   */
  readonly underline = input<boolean, XBoolean>(this.config?.underline ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   * @example
   *
   * ```html
   * <x-link disabled>disabled</x-link>
   * ```
   *
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 图标靠右对齐
   * @en_US Icons are aligned to the right
   * @example
   *
   * ```html
   * <x-link icon="fto-chevron-left">left</x-link>
   * <x-link icon="fto-chevron-right" iconRight>right</x-link>
   * ```
   *
   */
  readonly iconRight = input<boolean, XBoolean>(this.config?.iconRight ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 链接类型
   * @en_US Link type
   * @example
   *
   * ```html
   * <x-link type="primary">primary</x-link>
   * <x-link type="success">success</x-link>
   * <x-link type="warning">warning</x-link>
   * <x-link type="danger">danger</x-link>
   * <x-link type="info">info</x-link>
   * ```
   *
   */
  readonly type = input<XLinkType>('initial');
  /**
   * @zh_CN 打开方式
   * @en_US Open method
   * @example
   *
   * ```html
   * <x-link href="https://www.ngnest.com" target="_self">ng-nest</x-link>
   * <x-link href="https://www.ngnest.com" target="_blank">ng-nest</x-link>
   * ```
   *
   */
  readonly target = input<string>();
}

/**
 * @zh_CN 链接类型
 * @en_US Link type
 */
export type XLinkType = XType;
