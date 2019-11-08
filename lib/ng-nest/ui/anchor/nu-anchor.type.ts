import { NuIdentityOption } from "@ng-nest/ui/core";

/**
 * Anchor 组件名
 * @selector nu-input
 * @decorator component
 */
export const AnchorPrefix = "nu-anchor";

/**
 * Anchor 参数对象
 */
export interface NuAnchorOption {
  /**
   * 布局方式
   * @default "right"
   */
  nuLayout?: NuAnchorLayoutType;
  /**
   * 滚动的对象
   */
  nuScrollElement?: HTMLElement | Window;
  /**
   * 导航是否固定
   */
  nuSliderFixed?: boolean;
  /**
   * 距离顶部距离，单位rem，自动转换
   * @default 0
   */
  nuTop?: number;
}

/**
 * Anchor 数据对象
 */
export interface NuAnchorNode extends NuIdentityOption {
  /**
   * 左内边距，用来显示层级
   */
  nuLeft?: number;
  /**
   * 图标
   */
  nuIcon?: string;
  /**
   * 锚点的链接
   */
  nuLink?: string;
}

/**
 * 激活的 Anchor
 */
export interface NuActivatedAnchor {
  /**
   * 激活的序号
   */
  nuActivatedIndex?: number;
  /**
   * 激活的anchor对象
   */
  nuActivatedAnchor?: NuAnchorNode;
}

/**
 * 布局方式，相对内容的位置
 * @value "left"
 * @value "right"
 */
export type NuAnchorLayoutType = "left" | "right";
