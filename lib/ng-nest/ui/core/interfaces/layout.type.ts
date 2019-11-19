/**
 * 方位
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type XPosition = "top" | "right" | "bottom" | "left";

/**
 * 尺寸
 * @value "large" 大型
 * @value "medium" 中等
 * @value "samll" 小型
 * @value "mini" 迷你
 */
export type XSize = "large" | "medium" | "samll" | "mini";

/**
 * flex 布局下的水平排列方式
 * @value "start"
 * @value "end"
 * @value "center"
 * @value "spaceAround"
 * @value "space-between"
 */
export type XJustify = "start" | "end" | "center" | "spaceAround" | "space-between";

/**
 * flex 布局下的垂直排列方式
 * @value "top"
 * @value "middle"
 * @value "bottom"
 */
export type XAlign = "top" | "middle" | "bottom";

/**
 * flex 布局下的元素排列方式
 * @value "column"
 * @value "column-reverse"
 * @value "row"
 * @value "row-reverse"
 */
export type XDirection = "column" | "column-reverse" | "row" | "row-reverse";
