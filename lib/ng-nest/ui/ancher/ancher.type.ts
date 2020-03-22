import { XIdentityInput } from '@ng-nest/ui/core';

/**
 * Ancher 组件名
 * @selector x-ancher
 * @decorator component
 */
export const XAncherPrefix = 'x-ancher';

/**
 * Ancher @Input
 */
export interface XAncherInput {}

/**
 * Anchor 数据对象
 */
export interface XAncherNode extends XIdentityInput {
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
