import { XIdentityInput, XData } from '@ng-nest/ui/core';
import { TemplateRef } from '@angular/core';

/**
 * Crumb 组件名
 * @selector x-crumb
 * @decorator component
 */
export const CrumbPrefix = 'x-crumb';

/**
 * Crumb @Input
 */
export interface XCrumbInput {
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
export interface XCrumbNode extends XIdentityInput {
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
