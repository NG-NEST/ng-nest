/**
 * Color 组件名
 * @selector x-color
 * @decorator component
 */
export const XColorPrefix = "x-color";

/**
 * Color @Input
 */
export interface XColorInput {
  /**
   * 颜色标题
   * @default "clolor"
   */
  label?: string;
  /**
   * 十六进制颜色码
   * @default var(--x-primary)
   */
  hex?: string;
  /**
   * 混合的颜色
   * @default "#ffffff"
   */
  merge?: string;
  /**
   * 混合的颜色占比
   * @defalut [0.1, ..., 0.9]
   */
  amounts?: number[];
}
