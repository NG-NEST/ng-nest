/**
 * Badge 组件名
 * @selector x-badge
 * @decorator component
 */
export const XBadgePrefix = 'x-badge';

/**
 * Badge @Input
 */
export interface XBadgeInput {
  /**
   * 颜色
   */
  type?: XBadgeType;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 显示值
   */
  value?: number | string;
  /**
   * 是否显示小红点
   */
  dot?: boolean;
}

/**
 * 标记类型
 * @value "primary"
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "danger"
 * @value "text"
 */
export type XBadgeType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';
