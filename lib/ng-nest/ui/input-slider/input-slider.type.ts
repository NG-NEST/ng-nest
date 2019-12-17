import { XIdentityInput, XFormProperty } from "@ng-nest/ui/core";

/**
 * InputSlider 组件名
 * @selector x-input-slider
 * @decorator component
 */
export const XInputSliderPrefix = "x-input-slider";

/**
 * InputSlider XInputSlider
 */
export interface XInputSliderInput extends XIdentityInput, XFormProperty {
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
