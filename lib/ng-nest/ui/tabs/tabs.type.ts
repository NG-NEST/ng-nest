import { XIdentityInput, XData } from "@ng-nest/ui/core";

/**
 * Tabs 组件名
 * @selector x-tabs
 * @decorator component
 */
export const TabsPrefix = "x-tabs";

/**
 * Tabs @Input
 */
export interface XTabsInput {
  /**
   * Data 数据
   */
  data?: XData<XTabsNode[]>;
  /**
   * 布局方式
   */
  layout?: XTabsLayoutType;
  /**
   * 激活的序号
   */
  activatedIndex?: number;
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
 * 布局方式
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type XTabsLayoutType = "top" | "right" | "bottom" | "left";
