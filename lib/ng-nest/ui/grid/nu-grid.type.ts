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
}

/**
 * Col 参数对象
 */
export interface NuColOption {
  /**
   * 24栅格布局，列占的宽度
   */
  nuSpan?: number;
}
