import { NmIdentityOption } from "../../../interfaces/identify.type";
import { NmData } from "../../../interfaces/data.type";
import { TemplateRef } from "@angular/core";

/**
 * Slider 组件名
 * @selector nm-slider
 * @decorator component
 */
export const SliderPrefix = "nm-slider";

/**
 * Slider 参数对象
 */
export interface NmSliderOption {
  /**
   * Data 数据
   * @default []
   */
  nmData?: NmData<NmSliderNode[]>;
  /**
   * 布局方式
   * @default "row"
   */
  nmLayout?: NmSliderLayoutType;
  /**
   * 边框方位
   * @default "bottom"
   */
  nmBorderPosition?: NmSliderBorderPositionType;
  /**
   * 选中的序号
   * @default 0
   */
  nmActivatedIndex?: number;
  /**
   * slider 模板
   */
  nmNodeTemplate?: TemplateRef<any>;
}

/**
 * Slider 数据对象
 */
export interface NmSliderNode extends NmIdentityOption {}

/**
 * 选中的 Slider
 */
export interface NmActivatedSlider {
  /**
   * 选中的序号
   */
  nmActivatedIndex?: number;
  /**
   * 选中的slider对象
   */
  nmActivatedSlider?: NmSliderNode;
}

/**
 * 布局方式
 * @value "row"
 * @value "column"
 */
export type NmSliderLayoutType = "row" | "column";

/**
 * 边框方位
 * @value "top"
 * @value "right"
 * @value "bottom"
 * @value "left"
 */
export type NmSliderBorderPositionType = "top" | "right" | "bottom" | "left";
