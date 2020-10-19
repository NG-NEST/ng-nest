/**
 * 方位 左右
 */
export type XPositionLeftRight = 'left' | 'right';
/**
 * 方位 上下
 */
export type XPositionTopBottom = 'top' | 'bottom';
/**
 * 方位
 */
export type XPosition = XPositionTopBottom | XPositionLeftRight;

/**
 * 颜色类型
 */
export type XType = 'initial' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';

/**
 * 状态类型
 */
export type XStatus = 'success' | 'info' | 'warning' | 'error';

/**
 * 样式映射类型
 */
export type XClassMap = { [property: string]: boolean };

/**
 * 样式主题
 */
export type XEffect = 'light' | 'dark' | 'white';

/**
 * 样式属性
 */
export type XStyle = { [property: string]: any };

/**
 * 尺寸
 * @value "big" 超大
 * @value "large" 大型
 * @value "medium" 中等
 * @value "samll" 小型
 * @value "mini" 迷你
 */
export type XSize = 'big' | 'large' | 'medium' | 'small' | 'mini';

/**
 * flex 布局下的子元素水平排列方式
 */
export type XJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

/**
 * flex 布局下的子元素垂直排列方式
 */
export type XAlign = 'start' | 'center' | 'end';

/**
 * flex 布局下的子元素排列方向
 */
export type XDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';

/**
 * 相对与连接元素的位置
 */
export type XPlacement = XPosition | XCorner | 'left-start' | 'left-end' | 'right-start' | 'right-end';

/**
 * 四个角落
 */
export type XCorner = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

/**
 * 九宫格方位
 */
export type XPlace = XPosition | XCorner | 'center';

/**
 * 形状
 */
export type XShape = 'circle' | 'square';

/**
 * 适应方式
 */
export type XFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

/**
 * 阴影显示配置
 */
export type XShadow = 'always' | 'hover' | 'never';

/**
 * 切换方式
 */
export type XTrigger = 'hover' | 'click';

/**
 * 展示的方向
 */
export type XDisplayDirection = 'horizontal' | 'vertical';
