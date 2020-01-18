/**
 * Avatar 组件名
 * @selector x-avatar
 * @decorator component
 */
export const XAvatarPrefix = "x-avatar";

/**
 * Avatar @Input
 */
export interface XAvatarInput {}

/**
 * 头像形状
 * @value "circle"
 * @value "square"
 */
export type XAvatarShape = "circle" | "square";

/**
 * 当展示类型为图片的时候，设置图片如何适应容器框
 * @value "fill"
 * @value "contain"
 * @value "cover"
 * @value "none"
 * @value "scale-down"
 */
export type XAvatarFit = "fill" | "contain" | "cover" | "none" | "scale-down";
