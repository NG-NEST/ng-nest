import { XJustify, XAlign } from '@ng-nest/ui/core';

/**
 * Row 组件名
 * @selector x-row
 * @decorator component
 */
export const XRowPrefix = 'x-row';

/**
 * Row @Input
 */
export interface XRowInput {
  /**
   * 列间隔，单位rem
   */
  space?: number;
  /**
   * flex 布局下的水平排列方式
   */
  justify?: XJustify;
  /**
   * flex 布局下的垂直排列方式
   */
  align?: XAlign;
}

/**
 * Col 组件名
 * @selector x-col
 * @decorator component
 */
export const XColPrefix = 'x-col';

/**
 * Col @Input
 */
export interface XColInput {
  /**
   * 24栅格布局，列占的宽度
   */
  span?: number;
  /**
   * 栅格左侧的间隔格数
   */
  offset?: number;
  /**
   * <768px
   */
  xs?: number;
  /**
   * ≥768px
   */
  sm?: number;
  /**
   * ≥992px
   */
  md?: number;
  /**
   * ≥1200px
   */
  lg?: number;
  /**
   * ≥1920px
   */
  xl?: number;
}
