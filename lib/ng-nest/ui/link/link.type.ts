/**
 * Link 组件名
 * @selector x-link
 * @decorator component
 */
export const XLinkPrefix = 'x-link';

/**
 * Link @Input
 */
export interface XLinkInput {
  /**
   * 标题
   */
  label?: string;
  /**
   * 链接
   */
  href?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 下划线
   */
  underline: boolean;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 图标靠右对齐
   */
  iconRight?: boolean;
  /**
   * 链接类型
   */
  type?: XLinkType;
  /**
   * 打开方式
   */
  target?: string;
}

/**
 * 链接类型
 * @value "primary"
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "danger"
 */
export type XLinkType = 'primary' | 'success' | 'info' | 'warning' | 'danger';
