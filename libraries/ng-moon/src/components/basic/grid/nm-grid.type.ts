/**
 * Row 组件名
 * @selector nm-row
 * @decorator component
 */
export const RowPrefix = "nm-row";

/**
 * Col 组件名
 * @selector nm-col
 * @decorator component
 */
export const ColPrefix = "nm-col";

/**
 * Row 参数对象
 */
export interface NmRowOption {}

/**
 * Col 参数对象
 */
export interface NmColOption {
  /**
   * 24栅格布局，列占的宽度
   */
  nmSpan?: number;
}
