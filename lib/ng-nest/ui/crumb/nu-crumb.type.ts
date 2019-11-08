import { NuIdentityOption, NuData } from "@ng-nest/ui/core";
import { TemplateRef } from "@angular/core";

/**
 * Crumb 组件名
 * @selector nu-crumb
 * @decorator component
 */
export const CrumbPrefix = "nu-crumb";

/**
 * Crumb 参数对象
 */
export interface NuCrumbOption {
  /**
   * Data 数据
   * @default []
   */
  nuData?: NuData<NuCrumbNode[]>;
  /**
   * crumb 模板
   */
  nuNodeTemplate?: TemplateRef<any>;
}

/**
 * Crumb 数据对象
 */
export interface NuCrumbNode extends NuIdentityOption {
  /**
   * 自定义数据属性
   */
  [property: string]: any;
}

/**
 * Crumb 点击返回的对象
 */
export interface NuCrumbNodeClick {
  /**
   * 事件
   */
  event: Event;
  /**
   * 点击的节点数据
   */
  node: NuCrumbNode;
}
