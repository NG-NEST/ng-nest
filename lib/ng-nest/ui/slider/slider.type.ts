import { XIdentityOption, XData } from "@ng-nest/ui/core";
import { TemplateRef } from "@angular/core";

/**
 * Slider 组件名
 * @selector x-slider
 * @decorator component
 */
export const SliderPrefix = "x-slider";

/**
 * Slider 参数对象
 */
export interface XSliderOption {
  /**
   * Data 数据
   * @default []
   */
  data?: XData<XSliderNode[]>;
  /**
   * 布局方式
   * @default "row"
   */
  layout?: XSliderLayoutType;
  /**
   * 边框方位
   * @default "bottom"
   */
  borderPosition?: XSliderBorderPositionType;
  /**
   * 激活的序列号
   * @default 0
   */
  activatedIndex?: number;
  /**
   * slider 模板
   */
  nodeTemplate?: TemplateRef<any>;
}

/**
 * Slider 数据对象
 */
export interface XSliderNode extends XIdentityOption {
  /**
   * 自定义数据属性
   */
  [property: string]: any;
}

/**
 * 激活的 Slider
 */
export interface XActivatedSlider {
  /**
   * 激活的序号
   */
  activatedIndex?: number;
  /**
   * 激活的slider对象
   */
  activatedSlider?: XSliderNode;
}

/**
 * 布局方式
 * @value "row"
 * @value "column"
 */
export type XSliderLayoutType = "row" | "column";

/**
 * 边框方位
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type XSliderBorderPositionType = "top" | "right" | "bottom" | "left";
