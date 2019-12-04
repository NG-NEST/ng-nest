import { XIdentityInput, XFormProperty } from "@ng-nest/ui/core";

/**
 * Select 组件名
 * @selector x-select
 * @decorator component
 */
export const XSelectPrefix = "x-select";

/**
 * Select @Select
 */
export interface XSelectInput extends XIdentityInput, XFormProperty {}

/**
 * Select 数据对象
 */
export interface XSelectNode extends XIdentityInput {
  /**
   * 禁用
   */
  disabled?: boolean;
}
