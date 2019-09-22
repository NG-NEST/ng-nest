import { NmIdentityOption } from "ng-moon/core";

/**
 * Anchor 组件名
 * @selector nm-input
 * @decorator component
 */
export const AnchorPrefix = "nm-anchor";

/**
 * Anchor 参数对象
 */
export interface NmAnchorOption {
  /**
   * 布局方式
   * @default "right"
   */
  nmLayout?: NmAnchorLayoutType;
  /**
   * 滚动的对象
   */
  nmScrollElement?: HTMLElement | Window;
  /**
   * 导航是否固定
   */
  nmSliderFixed?: boolean;
  /**
   * 距离顶部距离，单位rem，自动转换
   * @default 0
   */
  nmTop?: number;
}

/**
 * Anchor 数据对象
 */
export interface NmAnchorNode extends NmIdentityOption {
  /**
   * 左内边距，用来显示层级
   */
  nmLeft?: number;
  /**
   * 图标
   */
  nmIcon?: string;
  /**
   * 锚点的链接
   */
  nmLink?: string;
}

/**
 * 激活的 Anchor
 */
export interface NmActivatedAnchor {
  /**
   * 激活的序号
   */
  nmActivatedIndex?: number;
  /**
   * 激活的anchor对象
   */
  nmActivatedAnchor?: NmAnchorNode;
}

/**
 * 布局方式，相对内容的位置
 * @value "left"
 * @value "right"
 */
export type NmAnchorLayoutType = "left" | "right";
