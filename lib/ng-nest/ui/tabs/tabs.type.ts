import { XIdentityInput, XData, XJustify } from '@ng-nest/ui/core';

/**
 * Tabs 组件名
 * @selector x-tabs
 * @decorator component
 */
export const XTabsPrefix = 'x-tabs';

/**
 * Tabs @Input
 */
export interface XTabsInput {
  /**
   * Data 数据
   */
  data?: XData<XTabsNode[]>;
  /**
   * 对齐方式
   * @default 'start'
   */
  justify: XJustify;
  /**
   * 样式
   * @default 'block'
   */
  type?: XTabsType;
  /**
   * 布局方式
   * @default 'top'
   */
  layout?: XTabsLayout;
  /**
   * 激活的序号
   */
  activatedIndex?: number;
  /**
   * 动画
   * @default true
   */
  animated?: boolean;
}

/**
 * Tabs 数据对象
 */
export interface XTabsNode extends XIdentityInput {}

/**
 * 激活的tab
 */
export interface XActivatedTab {
  activatedIndex?: number;
  activatedTab?: XTabsNode;
}

/**
 * 样式类型
 * @value "block"
 * @value "tag"
 * @value "card"
 */
export type XTabsType = 'block' | 'tag' | 'card';

/**
 * 布局方式
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type XTabsLayout = 'top' | 'right' | 'bottom' | 'left';
