import { XIdentityInput } from '@ng-nest/ui/core';

/**
 * Anchor 组件名
 * @selector x-anchor
 * @decorator component
 */
export const XAnchorPrefix = 'x-anchor';

/**
 * Anchor @Input
 */
export interface XAnchorInput {
  /**
   * 滚动区域对象
   */
  scroll?: HTMLElement;
  /**
   * 顶部距离
   * @default '0'
   */
  affixTop?: number;
  /**
   * 导航相对内容位置
   * @default 'right'
   */
  layout?: XAnchorLayout;
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
 * 布局方式，相对内容的位置
 * @value "left"
 * @value "right"
 */
export type XAnchorLayout = 'left' | 'right';
