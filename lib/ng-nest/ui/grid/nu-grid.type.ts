/**
 * Row 组件名
 * @selector nu-row
 * @decorator component
 */
export const RowPrefix = "nu-row";

/**
 * Col 组件名
 * @selector nu-col
 * @decorator component
 */
export const ColPrefix = "nu-col";

/**
 * Row 参数对象
 */
export interface NuRowOption {
  /**
   * 列间隔，单位rem
   */
  nuSpace?: number;
  /**
   * flex 布局下的水平排列方式
   */
  nuJustify?: NuJustify;
  /**
   * flex 布局下的垂直排列方式
   */
  nuAlign?: NuAlign;
}

/**
 * Col 参数对象
 */
export interface NuColOption {
  /**
   * 24栅格布局，列占的宽度
   */
  nuSpan?: number;
  /**
   * 栅格左侧的间隔格数
   */
  nuOffset?: number;
  /**
   * <768px
   */
  nuXs?: number;
  /**
   * ≥768px
   */
  nuSm?: number;
  /**
   * ≥992px
   */
  nuMd?: number;
  /**
   * ≥1200px
   */
  nuLg?: number;
  /**
   * ≥1920px
   */
  nuXl?: number;
  /**
   * 当可视窗口在 xs 尺寸时隐藏
   */
  nuHiddenXsOnly?: boolean;
  /**
   * 当可视窗口在 sm 尺寸时隐藏
   */
  nuHiddenSmOnly?: boolean;
  /**
   * 当可视窗口在 sm 及以下尺寸时隐藏
   */
  nuHiddenSmAndDown?: boolean;
  /**
   * 当可视窗口在 sm 及以上尺寸时隐藏
   */
  nuHiddenSmAndUp?: boolean;
  /**
   * 当可视窗口在 md 尺寸时隐藏
   */
  nuHiddenMdOnly?: boolean;
  /**
   * 当可视窗口在 md 及以下尺寸时隐藏
   */
  nuHiddenMdAndDown?: boolean;
  /**
   * 当可视窗口在 md 及以上尺寸时隐藏
   */
  nuHiddenMdAndUp?: boolean;
  /**
   * 当可视窗口在 lg 尺寸时隐藏
   */
  nuHiddenLgOnly?: boolean;
  /**
   * 当可视窗口在 lg 及以下尺寸时隐藏
   */
  nuHiddenLgAndDown?: boolean;
  /**
   * 当可视窗口在 lg 及以上尺寸时隐藏
   */
  nuHiddenLgAndUp?: boolean;
  /**
   * 当可视窗口在 xl 尺寸时隐藏
   */
  nuHiddenXlOnly?: boolean;
}

/**
 * flex 布局下的水平排列方式
 * @value "start"
 * @value "end"
 * @value "center"
 * @value "spaceAround"
 * @value "space-between"
 */
export type NuJustify = "start" | "end" | "center" | "spaceAround" | "space-between";

/**
 * flex 布局下的垂直排列方式
 * @value "top"
 * @value "middle"
 * @value "bottom"
 */
export type NuAlign = "top" | "middle" | "bottom";
