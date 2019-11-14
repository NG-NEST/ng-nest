/**
 * Row 组件名
 * @selector x-row
 * @decorator component
 */
export const XRowPrefix = "x-row";

/**
 * Col 组件名
 * @selector x-col
 * @decorator component
 */
export const XColPrefix = "x-col";

/**
 * Row 参数对象
 */
export interface XRowOption {
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
 * Col 参数对象
 */
export interface XColOption {
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
  /**
   * 当可视窗口在 xs 尺寸时隐藏
   */
  hiddenXsOnly?: boolean;
  /**
   * 当可视窗口在 sm 尺寸时隐藏
   */
  hiddenSmOnly?: boolean;
  /**
   * 当可视窗口在 sm 及以下尺寸时隐藏
   */
  hiddenSmAndDown?: boolean;
  /**
   * 当可视窗口在 sm 及以上尺寸时隐藏
   */
  hiddenSmAndUp?: boolean;
  /**
   * 当可视窗口在 md 尺寸时隐藏
   */
  hiddenMdOnly?: boolean;
  /**
   * 当可视窗口在 md 及以下尺寸时隐藏
   */
  hiddenMdAndDown?: boolean;
  /**
   * 当可视窗口在 md 及以上尺寸时隐藏
   */
  hiddenMdAndUp?: boolean;
  /**
   * 当可视窗口在 lg 尺寸时隐藏
   */
  hiddenLgOnly?: boolean;
  /**
   * 当可视窗口在 lg 及以下尺寸时隐藏
   */
  hiddenLgAndDown?: boolean;
  /**
   * 当可视窗口在 lg 及以上尺寸时隐藏
   */
  hiddenLgAndUp?: boolean;
  /**
   * 当可视窗口在 xl 尺寸时隐藏
   */
  hiddenXlOnly?: boolean;
}

/**
 * flex 布局下的水平排列方式
 * @value "start"
 * @value "end"
 * @value "center"
 * @value "spaceAround"
 * @value "space-between"
 */
export type XJustify = "start" | "end" | "center" | "spaceAround" | "space-between";

/**
 * flex 布局下的垂直排列方式
 * @value "top"
 * @value "middle"
 * @value "bottom"
 */
export type XAlign = "top" | "middle" | "bottom";
