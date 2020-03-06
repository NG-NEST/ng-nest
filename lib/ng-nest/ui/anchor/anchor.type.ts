import { XIdentityInput } from '@ng-nest/ui/core';

/**
 * Anchor 组件名
 * @selector x-input
 * @decorator component
 */
export const AnchorPrefix = 'x-anchor';

/**
 * Anchor @Input
 */
export interface XAnchorInput {
  /**
   * 布局方式
   * @default "right"
   */
  layout?: XAnchorLayoutType;
  /**
   * 滚动的对象
   */
  scrollElement?: HTMLElement | Window;
  /**
   * 导航是否固定
   */
  sliderFixed?: boolean;
  /**
   * 距离顶部距离，单位rem，自动转换
   * @default 0
   */
  top?: number;
}

/**
 * Anchor 数据对象
 */
export interface XAnchorNode extends XIdentityInput {
  /**
   * 左内边距，用来显示层级
   */
  left?: number;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 锚点的链接
   */
  link?: string;
}

/**
 * 激活的 Anchor
 */
export interface XActivatedAnchor {
  /**
   * 激活的序号
   */
  activatedIndex?: number;
  /**
   * 激活的anchor对象
   */
  activatedAnchor?: XAnchorNode;
}

/**
 * 布局方式，相对内容的位置
 * @value "left"
 * @value "right"
 */
export type XAnchorLayoutType = 'left' | 'right';
