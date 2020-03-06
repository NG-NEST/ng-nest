/**
 * Highlight 对象
 * @selector x-highlight
 * @decorator component
 */
export const HighlightPrefix = 'x-highlight';

/**
 * Highlight 对象
 */
export interface XHighlightInput {
  /**
   * 代码类型
   */
  type?: string;
  /**
   * 数据
   */
  data?: string;
}
