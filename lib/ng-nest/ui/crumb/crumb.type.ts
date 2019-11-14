import { XIdentityOption, XData } from "@ng-nest/ui/core";
import { TemplateRef } from "@angular/core";

/**
 * Crumb 组件名
 * @selector x-crumb
 * @decorator component
 */
export const CrumbPrefix = "x-crumb";

/**
 * Crumb 参数对象
 */
export interface XCrumbOption {
  /**
   * Data 数据
   * @default []
   */
  data?: XData<XCrumbNode[]>;
  /**
   * crumb 模板
   */
  nodeTemplate?: TemplateRef<any>;
}

/**
 * Crumb 数据对象
 */
export interface XCrumbNode extends XIdentityOption {
  /**
   * 自定义数据属性
   */
  [property: string]: any;
}

/**
 * Crumb 点击返回的对象
 */
export interface XCrumbNodeClick {
  /**
   * 事件
   */
  event: Event;
  /**
   * 点击的节点数据
   */
  node: XCrumbNode;
}
