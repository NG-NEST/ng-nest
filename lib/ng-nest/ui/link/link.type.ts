/**
 * Link 组件名
 * @selector x-link
 * @decorator component
 */
export const XLinkPrefix = "x-link";

/**
 * Link @Input
 */
export interface XLinkInput {}

/**
 * 链接类型
 * @value "primary"
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "danger"
 * @value "text"
 */
export type XLinkType = "primary" | "success" | "info" | "warning" | "danger" | "text";
