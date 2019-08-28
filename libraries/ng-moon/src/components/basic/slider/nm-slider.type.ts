import { NmIdentityOption } from "../../../interfaces/identify.type";
import { NmData } from "../../../interfaces/data.type";
import { TemplateRef } from "@angular/core";

export const SliderPrefix = "nm-slider";

// Slider 参数对象
export interface NmSliderOption {
  // Data 数据
  nmData?: NmData<NmSliderNode[]>;
  // 布局方式
  nmLayout?: NmSliderLayoutEnum;
  // 边框方位
  nmBorderPosition?: NmSliderBorderPositionEnum;
  // 激活的序号
  nmActivatedIndex?: number;
  // Slider 模板
  nmNodeTemplate?: TemplateRef<any>;
}

// Slider 数据对象
export interface NmSliderNode extends NmIdentityOption {}

// ActivatedSlider 激活的slider
export interface NmActivatedSlider {
  nmActivatedIndex?: number;
  nmActivatedSlider?: NmSliderNode;
}

// 布局方式
export enum NmSliderLayoutEnum {
  Row = "row",
  Column = "column"
}

// 边框方位
export enum NmSliderBorderPositionEnum {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left"
}
