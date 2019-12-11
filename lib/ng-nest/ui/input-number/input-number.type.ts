import { XIdentityInput, XFormProperty } from "@ng-nest/ui/core";

/**
 * InputNumber 组件名
 * @selector x-input-number
 * @decorator component
 */
export const XInputNumberPrefix = "x-input-number";

/**
 * InputNumber XInputNumber
 */
export interface XInputNumberInput extends XIdentityInput, XFormProperty {
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 步数
   */
  step?: number;
  /**
   * 按住后步进速度
   */
  debounce?: number;
  /**
   * 精度
   */
  precision?: number;
}
