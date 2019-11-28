import { XIdentityInput } from "@ng-nest/ui/core";

/**
 * Radio 组件名
 * @selector x-radio
 * @decorator component
 */
export const XRadioPrefix = "x-radio";

/**
 * Radio @Input
 */
export interface XRadioInput {}

/**
 * Radio 数据对象
 */
export interface XRadioNode extends XIdentityInput {
  /**
   * 禁用
   */
  disabled?: boolean;
}
