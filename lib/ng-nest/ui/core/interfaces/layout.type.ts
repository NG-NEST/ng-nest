/**
 * 方位
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type XPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * 颜色类型
 * @value "primary"
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "danger"
 * @value "text"
 */
export type XType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';

/**
 * 状态类型
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "error"
 */
export type XStatus = 'success' | 'info' | 'warning' | 'error';

/**
 * 样式映射类型
 */
export type XClassMap = { [property: string]: boolean };

/**
 * 样式主题
 */
export type XEffect = 'light' | 'dark';

/**
 * 尺寸
 * @value "large" 大型
 * @value "medium" 中等
 * @value "samll" 小型
 * @value "mini" 迷你
 */
export type XSize = 'large' | 'medium' | 'small' | 'mini';

/**
 * flex 布局下的子元素水平排列方式
 * @value "start"
 * @value "end"
 * @value "center"
 * @value "spaceAround"
 * @value "space-between"
 */
export type XJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

/**
 * flex 布局下的子元素垂直排列方式
 * @value "top"
 * @value "middle"
 * @value "bottom"
 */
export type XAlign = 'top' | 'center' | 'bottom';

/**
 * flex 布局下的子元素排列方向
 * @value "column"
 * @value "column-reverse"
 * @value "row"
 * @value "row-reverse"
 */
export type XDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';

/**
 * 相对与连接元素的位置
 */
export type XPlacement =
  | XPosition
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

/**
 * 九宫格方位
 */
export type XPlace = XPosition | 'center' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

/**
 * 表单对象共有的参数
 */
export interface XFormProperty {
  justify?: XJustify;
  align?: XAlign;
  direction?: XDirection;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * 九宫格方位
 */
// export interface XPlace {
//   topStart?: string;
//   top?: string;
//   topEnd?: string;
//   left?: string;
//   center?: string;
//   right?: string;
//   bottomStart?: string;
//   bottom?: string;
//   bottomEnd?: string;
// }
