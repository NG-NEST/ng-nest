import { XJustify, XAlign, XProperty, XInputNumber, XInputBoolean, XNumber, XBoolean } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Row
 * @selector x-row
 * @decorator component
 */
export const XRowPrefix = 'x-row';

/**
 * Row Property
 */
@Component({ template: '' })
export class XRowProperty extends XProperty {
  /**
   * @zh_CN 列间隔，rem
   * @en_US Column interval, rem
   */
  @Input() @XInputNumber() space!: XNumber;
  /**
   * @zh_CN flex 布局下的水平排列方式
   * @en_US Horizontal arrangement under flex layout
   */
  @Input() justify?: XJustify;
  /**
   * @zh_CN flex 布局下的垂直排列方式
   * @en_US Vertical arrangement under flex layout
   */
  @Input() align?: XAlign;
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
@Component({ template: '' })
export class XColProperty extends XProperty {
  /**
   * @zh_CN 24栅格布局，列占的宽度
   * @en_US 24 grid layout, column width
   */
  @Input() @XInputNumber() span!: XNumber;
  /**
   * @zh_CN 栅格左侧的间隔格数
   * @en_US The number of intervals on the left side of the grid
   */
  @Input() @XInputNumber() offset!: XNumber;
  /**
   * <768px
   */
  @Input() @XInputNumber() xs!: XNumber;
  /**
   * ≥768px
   */
  @Input() @XInputNumber() sm!: XNumber;
  /**
   * ≥992px
   */
  @Input() @XInputNumber() md!: XNumber;
  /**
   * ≥1200px
   */
  @Input() @XInputNumber() lg!: XNumber;
  /**
   * ≥1920px
   */
  @Input() @XInputNumber() xl!: XNumber;
  /**
   * @zh_CN 默认样式
   * @en_US Default style
   */
  @Input() @XInputBoolean() inherit!: XBoolean;
}
