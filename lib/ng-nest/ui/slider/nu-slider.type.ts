import { NuIdentityOption, NuData } from "@ng-nest/ui/core";
import { TemplateRef } from "@angular/core";

/**
 * Slider 组件名
 * @selector nu-slider
 * @decorator component
 */
export const SliderPrefix = "nu-slider";

/**
 * Slider 参数对象
 */
export interface NuSliderOption {
  /**
   * Data 数据
   * @default []
   */
  nuData?: NuData<NuSliderNode[]>;
  /**
   * 布局方式
   * @default "row"
   */
  nuLayout?: NuSliderLayoutType;
  /**
   * 边框方位
   * @default "bottom"
   */
  nuBorderPosition?: NuSliderBorderPositionType;
  /**
   * 激活的序列号
   * @default 0
   */
  nuActivatedIndex?: number;
  /**
   * slider 模板
   */
  nuNodeTemplate?: TemplateRef<any>;
}

/**
 * Slider 数据对象
 */
export interface NuSliderNode extends NuIdentityOption {
  /**
   * 自定义数据属性
   */
  [property: string]: any;
}

/**
 * 激活的 Slider
 */
export interface NuActivatedSlider {
  /**
   * 激活的序号
   */
  nuActivatedIndex?: number;
  /**
   * 激活的slider对象
   */
  nuActivatedSlider?: NuSliderNode;
}

/**
 * 布局方式
 * @value "row"
 * @value "column"
 */
export type NuSliderLayoutType = "row" | "column";

/**
 * 边框方位
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type NuSliderBorderPositionType = "top" | "right" | "bottom" | "left";
