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
   * 列间隔，rem
   */
  @Input() @XInputNumber() space: XNumber;
  /**
   * flex 布局下的水平排列方式
   */
  @Input() justify: XJustify;
  /**
   * flex 布局下的垂直排列方式
   */
  @Input() align: XAlign;
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
   * 24栅格布局，列占的宽度
   */
  @Input() @XInputNumber() span: XNumber;
  /**
   * 栅格左侧的间隔格数
   */
  @Input() @XInputNumber() offset: XNumber;
  /**
   * <768px
   */
  @Input() @XInputNumber() xs: XNumber;
  /**
   * ≥768px
   */
  @Input() @XInputNumber() sm: XNumber;
  /**
   * ≥992px
   */
  @Input() @XInputNumber() md: XNumber;
  /**
   * ≥1200px
   */
  @Input() @XInputNumber() lg: XNumber;
  /**
   * ≥1920px
   */
  @Input() @XInputNumber() xl: XNumber;
  /**
   * 默认样式
   */
  @Input() @XInputBoolean() inherit: XBoolean;
}
