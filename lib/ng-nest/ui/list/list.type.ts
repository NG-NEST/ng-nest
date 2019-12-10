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
   * 多选个数
   */
  multiple?: number;
}

/**
 * List 数据对象
 */
export interface XListNode extends XParentIdentityInput {}
