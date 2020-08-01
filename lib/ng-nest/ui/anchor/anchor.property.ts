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
   * @zh_CN 滚动区域对象
   * @en_US Scroll area object
   */
  @Input() scroll: HTMLElement;
  /**
   * @zh_CN 顶部距离
   * @en_US Top distance
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '0') affixTop: string;
  /**
   * @zh_CN 导航相对内容位置
   * @en_US Navigation relative content position
   */
  @Input() @XWithConfig<XAnchorLayout>(X_CONFIG_NAME, 'right') layout: XAnchorLayout;
  /**
   * @zh_CN 对齐方式
   * @en_US Alignment
   */
  @Input() @XWithConfig<XJustify>(X_CONFIG_NAME, 'start') justify: XJustify;
}

/**
 * Anchor Node
 */
export interface XAnchorNode extends XIdentityProperty {
  /**
   * @zh_CN 左内边距，用来显示层级
   * @en_US Left inner margin, used to display hierarchy
   */
  left?: number;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 锚点的链接
   * @en_US Anchor link
   */
  link?: string;
}

/**
 * @zh_CN 布局方式，相对内容的位置
 * @en_US Layout method, relative content position
 */
export type XAnchorLayout = XPositionLeftRight;
