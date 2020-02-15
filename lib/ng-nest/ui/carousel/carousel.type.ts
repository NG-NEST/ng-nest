/**
 * Carousel 组件名
 * @selector x-carousel
 * @decorator component
 */
export const XCarouselPrefix = "x-carousel";

/**
 * Carousel @Input
 */
export interface XCarouselInput {}

/**
 * 指示器切换方式
 * @value "hover"
 * @value "click"
 */
export type XCarouselTrigger = "hover" | "click";

/**
 * 切换箭头显示方式
 * @value "always"
 * @value "hover"
 * @value "never"
 */
export type XCarouselArrow = "always" | "hover" | "never";

/**
 * 走马灯展示的方向
 * @value "horizontal"
 * @value "vertical"
 */
export type XCarouselDirection = "horizontal" | "vertical";

/**
 * Carousel Panel 组件名
 * @selector x-carousel-panel
 * @decorator component
 */
export const XCarouselPanelPrefix = "x-carousel-panel";
