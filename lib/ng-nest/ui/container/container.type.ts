import { XDirection } from "@ng-nest/ui/core";
/**
 * Container 组件名
 * @selector x-container
 * @decorator component
 */
export const XContainerPrefix = "x-container";

/**
 * Container @Input
 */
export interface XContainerInput {
  /**
   * flex 布局下的子元素排列方向
   * @default row 子元素中有 x-header 或 x-footer 时为 column
   */
  direction?: XDirection;
}

/**
 * Header 组件名
 * @selector x-header
 * @decorator component
 */
export const XHeaderPrefix = "x-header";

/**
 * Header @Input
 */
export interface XHeaderInput {
  /**
   * 高度，rem
   */
  height?: number;
}

/**
 * Aside 组件名
 * @selector x-aside
 * @decorator component
 */
export const XAsidePrefix = "x-aside";

/**
 * Aside @Input
 */
export interface XAsideInput {
  /**
   * 宽度，rem
   */
  width?: number;
}

/**
 * main 组件名
 * @selector x-main
 * @decorator component
 */
export const XMainPrefix = "x-main";

/**
 * Footer 组件名
 * @selector x-footer
 * @decorator component
 */
export const XFooterPrefix = "x-footer";

/**
 * Footer @Input
 */
export interface XFooterInput {
  /**
   * 高度，rem
   */
  height?: number;
}
