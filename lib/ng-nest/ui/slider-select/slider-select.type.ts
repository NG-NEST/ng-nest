import { XIdentityInput, XFormProperty } from '@ng-nest/ui/core';

/**
 * SliderSelect 组件名
 * @selector x-slider-select
 * @decorator component
 */
export const XSliderSelectPrefix = 'x-slider-select';

/**
 * SliderSelect XSliderSelect
 */
export interface XSliderSelectInput extends XIdentityInput, XFormProperty {
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
