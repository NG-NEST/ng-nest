import { XPropertyFunction, XToNumber, XToString, XToCssPixelValue, XToBoolean } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XNumber, XBoolean, XType } from '@ng-nest/ui/core';

/**
 * Badge
 * @selector x-badge
 * @decorator component
 */
export const XBadgePrefix = 'x-badge';
const X_BADGE_CONFIG_NAME = 'badge';

/**
 * Badge Property
 */
@Component({ selector: `${XBadgePrefix}-property`, template: '' })
export class XBadgeProperty extends XPropertyFunction(X_BADGE_CONFIG_NAME) {
  /**
   * @zh_CN 类型，背景颜色
   * @en_US Type, the background color
   * @example
   *
   * ```html
   * <x-badge value="12" type="primary">
   *   <x-button>primary</x-button>
   * </x-badge>
   * <x-badge value="12" type="success">
   *   <x-button>success</x-button>
   * </x-badge>
   * <x-badge value="12" type="info">
   *   <x-button>info</x-button>
   * </x-badge>
   * <x-badge value="12" type="warning">
   *   <x-button>warning</x-button>
   * </x-badge>
   * <x-badge value="12" type="danger">
   *   <x-button>danger</x-button>
   * </x-badge>
   * <x-badge value="12" type="text">
   *   <x-button>text</x-button>
   * </x-badge>
   * ```
   *
   */
  readonly type = input<XBadgeType>(this.config?.type ?? 'danger');
  /**
   * @zh_CN 最大值
   * @en_US Max
   * @example
   *
   * ```html
   * <x-badge value="200" max="99">
   *   <x-button>99</x-button>
   * </x-badge>
   * <x-badge value="300" max="200">
   *   <x-button>200</x-button>
   * </x-badge>
   * ```
   */
  readonly max = input<number, XNumber>(99, { transform: XToNumber });
  /**
   * @zh_CN 显示值
   * @en_US Display value
   * @example
   *
   * ```html
   * <x-badge value="88">
   *   <x-button>value</x-button>
   * </x-badge>
   * ```
   */
  readonly value = input<string, XNumber>('', { transform: XToString });
  /**
   * @zh_CN 偏移值 left
   * @en_US Offset left value
   * @example
   *
   * ```html
   * <x-badge value="88" offsetLeft="5px">
   *   <x-button>value</x-button>
   * </x-badge>
   * ```
   *
   */
  readonly offsetLeft = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 偏移值 top
   * @en_US Offset right value
   * @example
   *
   * ```html
   * <x-badge value="88" offsetTop="5px">
   *   <x-button>value</x-button>
   * </x-badge>
   * ```
   *
   */
  readonly offsetTop = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 是否显示小红点
   * @en_US Whether to show the small red dot
   * @example
   *
   * ```html
   * <x-badge dot>
   *   <x-button>value</x-button>
   * </x-badge>
   * ```
   *
   */
  readonly dot = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 独立使用
   * @en_US Independent use
   * @example
   *
   * ```html
   * <x-badge standalone value="25"></x-badge>
   * <x-badge standalone value="200" max="99"></x-badge>
   * <x-badge standalone value="hot"></x-badge>
   * <x-badge standalone dot></x-badge>
   * ```
   *
   */
  readonly standalone = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 标记类型
 * @en_US Mark type
 */
export type XBadgeType = XType;
