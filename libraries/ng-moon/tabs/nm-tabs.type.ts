import { NmIdentityOption, NmData } from "ng-moon/core";

/**
 * Tabs 组件名
 * @selector nm-tabs
 * @decorator component
 */
export const TabsPrefix = "nm-tabs";

/**
 * Tabs 参数对象
 */
export interface NmTabsOption {
  /**
   * Data 数据
   */
  nmData?: NmData<NmTabsNode[]>;
  /**
   * 布局方式
   */
  nmLayout?: NmTabsLayoutType;
  /**
   * 激活的序号
   */
  nmActivatedIndex?: number;
}

/**
 * Tabs 数据对象
 */
export interface NmTabsNode extends NmIdentityOption {}

/**
 * 激活的tab
 */
export interface NmActivatedTab {
  nmActivatedIndex?: number;
  nmActivatedTab?: NmTabsNode;
}

/**
 * 布局方式
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type NmTabsLayoutType = "top" | "right" | "bottom" | "left";
