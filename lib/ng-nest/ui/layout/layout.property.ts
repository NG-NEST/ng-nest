import { XJustify, XAlign, XProperty, XInputNumber, XInputBoolean } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Row 组件名
 * @selector x-row
 * @decorator component
 */
export const XRowPrefix = 'x-row';

/**
 * Row Property
 */
export class XRowProperty extends XProperty {
  /**
   * 列间隔，rem
   */
  @Input() @XInputNumber() space?: number;
  /**
   * flex 布局下的水平排列方式
   */
  @Input() justify?: XJustify;
  /**
   * flex 布局下的垂直排列方式
   */
  @Input() align?: XAlign;
}

/**
 * Col 组件名
 * @selector x-col
 * @decorator component
 */
export const XColPrefix = 'x-col';

/**
 * Col Property
 */
export class XColProperty extends XProperty {
  /**
   * 24栅格布局，列占的宽度
   */
  @Input() @XInputNumber() span?: number;
  /**
   * 栅格左侧的间隔格数
   */
  @Input() @XInputNumber() offset?: number;
  /**
   * <768px
   */
  @Input() @XInputNumber() xs?: number;
  /**
   * ≥768px
   */
  @Input() @XInputNumber() sm?: number;
  /**
   * ≥992px
   */
  @Input() @XInputNumber() md?: number;
  /**
   * ≥1200px
   */
  @Input() @XInputNumber() lg?: number;
  /**
   * ≥1920px
   */
  @Input() @XInputNumber() xl?: number;
  /**
   * 默认样式
   */
  @Input() @XInputBoolean() inherit?: boolean;
}
