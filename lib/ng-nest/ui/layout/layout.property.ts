import { XProperty, XToBoolean, XToCssPixelValue, XToNumber } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XJustify, XAlign, XNumber, XBoolean } from '@ng-nest/ui/core';

/**
 * Row
 * @selector x-row
 * @decorator component
 */
export const XRowPrefix = 'x-row';

/**
 * Row Property
 */
@Component({ selector: `${XRowPrefix}-property`, template: '' })
export class XRowProperty extends XProperty {
  /**
   * @zh_CN 列间隔
   * @en_US Column interval
   */
  readonly space = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN flex 布局下的水平排列方式
   * @en_US Horizontal arrangement under flex layout
   */
  readonly justify = input<XJustify>();
  /**
   * @zh_CN flex 布局下的垂直排列方式
   * @en_US Vertical arrangement under flex layout
   */
  readonly align = input<XAlign>();
}

/**
 * Col
 * @selector x-col
 * @decorator component
 */
export const XColPrefix = 'x-col';

/**
 * Col Property
 */
@Component({ selector: `${XColPrefix}-property`, template: '' })
export class XColProperty extends XProperty {
  /**
   * @zh_CN 24栅格布局，列占的宽度
   * @en_US 24 grid layout, column width
   */
  readonly span = input<number, XNumber>(24, { transform: XToNumber });
  /**
   * @zh_CN 栅格左侧的间隔格数
   * @en_US The number of intervals on the left side of the grid
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
   */
  readonly inherit = input<boolean, XBoolean>(false, { transform: XToBoolean });
}
