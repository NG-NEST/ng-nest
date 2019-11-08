import { NuIdentityOption, NuData } from "@ng-nest/ui/core";

/**
 * Tabs 组件名
 * @selector nu-tabs
 * @decorator component
 */
export const TabsPrefix = "nu-tabs";

/**
 * Tabs 参数对象
 */
export interface NuTabsOption {
  /**
   * Data 数据
   */
  nuData?: NuData<NuTabsNode[]>;
  /**
   * 布局方式
   */
  nuLayout?: NuTabsLayoutType;
  /**
   * 激活的序号
   */
  nuActivatedIndex?: number;
}

/**
 * Tabs 数据对象
 */
export interface NuTabsNode extends NuIdentityOption {}

/**
 * 激活的tab
 */
export interface NuActivatedTab {
  nuActivatedIndex?: number;
  nuActivatedTab?: NuTabsNode;
}

/**
 * 布局方式
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type NuTabsLayoutType = "top" | "right" | "bottom" | "left";
