import { XIdentityInput, XFormProperty, XParentIdentityInput } from "@ng-nest/ui/core";

/**
 * List 组件名
 * @selector x-list
 * @decorator component
 */
export const XListPrefix = "x-list";

/**
 * List @List
 */
export interface XListInput extends XIdentityInput {
  /**
   * 个数
   */
  number?: number;
}

/**
 * List 数据对象
 */
export interface XListNode extends XParentIdentityInput {}
