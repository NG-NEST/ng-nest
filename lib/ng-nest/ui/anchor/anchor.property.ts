import { XIdentityProperty, XProperty, XJustify, XWithConfig, XPosition, XPositionLeftRight } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Anchor
 * @selector x-anchor
 * @decorator component
 */
export const XAnchorPrefix = 'x-anchor';
const X_CONFIG_NAME = 'anchor';

/**
 * Anchor Property
 */
@Component({ template: '' })
export class XAnchorProperty extends XProperty {
  /**
   * 滚动区域对象
   */
  @Input() scroll: HTMLElement;
  /**
   * 顶部距离
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '0') affixTop: string;
  /**
   * 导航相对内容位置
   */
  @Input() @XWithConfig<XAnchorLayout>(X_CONFIG_NAME, 'right') layout: XAnchorLayout;
  /**
   * 对齐方式
   */
  @Input() @XWithConfig<XJustify>(X_CONFIG_NAME, 'start') justify: XJustify;
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
export type XAnchorLayout = XPositionLeftRight;
