import { NmIdentityOption, NmData } from "ng-moon/core";
import { TemplateRef } from "@angular/core";

/**
 * Crumb 组件名
 * @selector nm-crumb
 * @decorator component
 */
export const CrumbPrefix = "nm-crumb";

/**
 * Crumb 参数对象
 */
export interface NmCrumbOption {
  /**
   * Data 数据
   * @default []
   */
  nmData?: NmData<NmCrumbNode[]>;
  /**
   * crumb 模板
   */
  nmNodeTemplate?: TemplateRef<any>;
}

/**
 * Crumb 数据对象
 */
export interface NmCrumbNode extends NmIdentityOption {
  /**
   * 自定义数据属性
   */
  [property: string]: any;
}

/**
 * Crumb 点击返回的对象
 */
export interface NmCrumbNodeClick {
  /**
   * 事件
   */
  event: Event;
  /**
   * 点击的节点数据
   */
  node: NmCrumbNode;
}
