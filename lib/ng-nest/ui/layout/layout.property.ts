import { XPropertyFunction, XToBoolean, XToCssPixelValue, XToNumber } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XJustify, XAlign, XNumber, XBoolean } from '@ng-nest/ui/core';

/**
 * Row
 * @selector x-row
 * @decorator component
 */
export const XRowPrefix = 'x-row';
const X_ROW_CONFIG_NAME = 'row';

/**
 * Row Property
 */
@Component({ selector: `${XRowPrefix}-property`, template: '' })
export class XRowProperty extends XPropertyFunction(X_ROW_CONFIG_NAME) {
  /**
   * @zh_CN 列间隔
   * @en_US Column interval
   * @example
   *
   * ```html
   * <x-row space="1rem">
   *   <x-col span="6">col-1</x-col>
   *   <x-col span="6">col-2</x-col>
   * </x-row>
   * ```
   *
   */
  readonly space = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN flex 布局下的水平排列方式
   * @en_US Horizontal arrangement under flex layout
   * @example
   *
   * ```html
   * <x-row justify="end">
   *   <x-col span="6">col-1</x-col>
   *   <x-col span="6">col-2</x-col>
   * </x-row>
   * ```
   *
   */
  readonly justify = input<XJustify>();
  /**
   * @zh_CN flex 布局下的垂直排列方式
   * @en_US Vertical arrangement under flex layout
   * @example
   *
   * ```html
   * <x-row align="end">
   *   <x-col span="6">col-1</x-col>
   *   <x-col span="6">col-2</x-col>
   * </x-row>
   * ```
   *
   */
  readonly align = input<XAlign>();
}

/**
 * Col
 * @selector x-col
 * @decorator component
 */
export const XColPrefix = 'x-col';
const X_COL_CONFIG_NAME = 'col';

/**
 * Col Property
 */
@Component({ selector: `${XColPrefix}-property`, template: '' })
export class XColProperty extends XPropertyFunction(X_COL_CONFIG_NAME) {
  /**
   * @zh_CN 24栅格布局，列占的宽度
   * @en_US 24 grid layout, column width
   * @example
   *
   * ```html
   * <x-row>
   *   <x-col span="6">col-1</x-col>
   *   <x-col span="18">col-2</x-col>
   * </x-row>
   * ```
   *
   */
  readonly span = input<number, XNumber>(24, { transform: XToNumber });
  /**
   * @zh_CN 栅格左侧的间隔格数
   * @en_US The number of intervals on the left side of the grid
   * @example
   *
   * ```html
   * <x-row>
   *   <x-col span="6">col-1</x-col>
   *   <x-col span="12" offset="6">col-2</x-col>
   * </x-row>
   * ```
   *
   */
  readonly offset = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * <768px
   */
  readonly xs = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * ≥768px
   */
  readonly sm = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * ≥992px
   */
  readonly md = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * ≥1200px
   */
  readonly lg = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * ≥1920px
   */
  readonly xl = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 默认样式
   * @en_US Default style
   * @example
   *
   * ```html
   * <x-row>
   *   <x-col span="6" inherit>col-1</x-col>
   *   <x-col span="12" offset="6" inherit>col-2</x-col>
   * </x-row>
   * ```
   *
   */
  readonly inherit = input<boolean, XBoolean>(false, { transform: XToBoolean });
}
