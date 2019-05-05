import { NmIdentity } from "../../interfaces/identify.type";
import { NmData } from "../../interfaces/data.type";
import { NmPosition } from "../../interfaces/position.type";

export const SliderPrefix = "nm-slider";

// Slider 参数对象
export interface NmSliderOption {
  // 数据
  nmData?: NmData<NmSliderData[]>;
  // 布局方式
  nmLayout?: NmSliderLayoutEnum;
  // 边框方位
  nmBorderPosition?: NmSliderBorderPositionEnum;
}

// Slider 数据对象
export interface NmSliderData extends NmIdentity {}

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
