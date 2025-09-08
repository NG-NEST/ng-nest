/**
 * @zh_CN 方位 左右
 * @en_US position left, right
 */
export type XPositionLeftRight = 'left' | 'right';

/**
 * @zh_CN 方位 上下
 * @en_US position top, bottom
 */
export type XPositionTopBottom = 'top' | 'bottom';

/**
 * @zh_CN 方位
 * @en_US position
 */
export type XPosition = XPositionTopBottom | XPositionLeftRight;

/**
 * @zh_CN 风格类型
 * - `'initial'` : 默认
 * - `'primary'` : 主要
 * - `'success'` : 成功
 * - `'info'` : 信息
 * - `'warning'` : 警告
 * - `'danger'` : 危险
 * - `'text'` : 文本
 * @en_US Style type
 * - `'initial'` : Initial
 * - `'primary'` : Primary
 * - `'success'` : Success
 * - `'info'` : Info
 * - `'warning'` : Warning
 * - `'danger'` : Danger
 * - `'text'` : Text
 */
export type XType = 'initial' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';

/**
 * @zh_CN 输入框形态变体
 * - `'outlined'` : 默认
 * - `'filled'` : 填充
 * - `'borderless'` : 无边框
 * - `'underlined'` : 下划线
 * @en_US Input box variant
 * - `'outlined'` : Outlined
 * - `'filled'` : Filled
 * - `'borderless'` : Borderless
 * - `'underlined'` : Underlined
 */
export type XVariant = 'outlined' | 'filled' | 'borderless' | 'underlined' | 'fixed-filled';

/**
 * @zh_CN 浮动标签
 * - `'over'` : 默认
 * - `'in'` : 填充
 * - `'on'` : 无边框
 * @en_US Float label
 * - `'over'` : Over
 * - `'in'` : In
 * - `'on'` : On
 */
export type XFloatLabel = 'over' | 'in' | 'on';

/**
 * @zh_CN 状态类型
 * @en_US Status type
 */
export type XStatus = 'success' | 'info' | 'warning' | 'error' | 'loading';

/**
 * @zh_CN 样式名映射类型
 * @en_US Style name mapping type
 */
export type XClassMap = { [property: string]: boolean };

/**
 * @zh_CN 样式映射类型
 * @en_US Style mapping type
 */
export type XStyleMap = { [property: string]: any };

/**
 * @zh_CN 样式主题
 * @en_US Style theme
 */
export type XEffect = 'light' | 'dark' | 'white';

/**
 * @zh_CN 样式属性
 * @en_US Style attribute
 */
export type XStyle = { [property: string]: any };

/**
 * @zh_CN 尺寸
 * - `'big'` : 超大
 * - `'large'` : 大型
 * - `'medium'` : 中等
 * - `'small'` : 小型
 * - `'mini'` : 迷你
 * @en_US Size
 * - `'big'` : Big
 * - `'large'` : Large
 * - `'medium'` : Medium
 * - `'small'` : Small
 * - `'mini'` : Mini
 */
export type XSize = 'big' | 'large' | 'medium' | 'small' | 'mini';

/**
 * @zh_CN 响应尺寸
 * - `xs` <768px
 * - `sm` ≥768px
 * - `md` ≥992px
 * - `lg` ≥1200px
 * - `xl` ≥1920px
 * @en_US Response size
 * - `xs` <768px
 * - `sm` ≥768px
 * - `md` ≥992px
 * - `lg` ≥1200px
 * - `xl` ≥1920px
 */
export type XResponseSize = { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };

/**
 * @zh_CN flex 布局下的子元素水平排列方式
 * @en_US The level of sub element level arrangement under flex layout
 */
export type XJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

/**
 * @zh_CN flex 布局下的子元素垂直排列方式
 * @en_US Sub element vertical arrangement method under flex layout
 */
export type XAlign = 'start' | 'center' | 'end';

/**
 * @zh_CN flex 布局下的子元素排列方向
 * - `'column'` : 将 flex 项目从上到下垂直排列，就像列一样
 * - `'column-reverse'` : 与 `'column'` 相反，将 flex 项目从下到上垂直排列
 * - `'row'` : 将 flex 项目从左到右水平排列，就像行一样
 * - `'row-reverse'` : 与 `'row'` 相反，将 flex 项目从右到左水平排列
 * @en_US The direction of the sub element arrangement under flex layout
 * - `'column'` : Arranges flex items vertically from top to bottom, like columns. This is the default value
 * - `'column-reverse'` : Opposite of column, arranges flex items vertically from bottom to top
 * - `'row'` : Arranges flex items horizontally from left to right, like a row
 * - `'row-reverse'` : Opposite of row, arranges flex items horizontally from right to
 */
export type XDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';

/**
 * @zh_CN 相对与连接元素的位置
 * @en_US Relatively and connected element position
 */
export type XPlacement = XPosition | XCorner | 'left-start' | 'left-end' | 'right-start' | 'right-end';

/**
 * @zh_CN 四个角落
 * @en_US Four corners
 */
export type XCorner = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

/**
 * @zh_CN 九宫格方位
 * @en_US Jiugong grid position
 */
export type XPlace = XPosition | XCorner | 'center';

/**
 * @zh_CN 形状
 * @en_US Shape
 */
export type XShape = 'circle' | 'square';

/**
 * @zh_CN 适应方式
 * @en_US Adaptation type
 */
export type XFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

/**
 * @zh_CN 阴影显示配置
 * @en_US Shadow display configuration
 */
export type XShadow = 'always' | 'hover' | 'never';

/**
 * @zh_CN 切换方式
 * @en_US Switching event
 */
export type XTrigger = 'hover' | 'click';

/**
 * @zh_CN 展示的方向
 * @en_US Direction of display
 */
export type XDisplayDirection = 'horizontal' | 'vertical';

/**
 * @zh_CN 文字对齐方向
 * @en_US Text alignment direction
 */
export type XTextAlign = 'left' | 'center' | 'right';
