import { XIdentityProperty, XProperty, XJustify } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Anchor
 * @selector x-anchor
 * @decorator component
 */
export const XAnchorPrefix = 'x-anchor';

/**
 * Anchor Property
 */
export class XAnchorProperty extends XProperty {
  /**
   * 滚动区域对象
   */
  @Input() scroll: HTMLElement;
  /**
   * 顶部距离
   */
  @Input('affix-top') affixTop: string = '0';
  /**
   * 导航相对内容位置
   */
  @Input() layout: XAnchorLayout = 'right';
  /**
   * 对齐方式
   */
  @Input() justify: XJustify = 'start';
}

/**
 * Anchor Node
 */
export interface XAnchorNode extends XIdentityProperty {
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
 */
export type XAnchorLayout = 'left' | 'right';
