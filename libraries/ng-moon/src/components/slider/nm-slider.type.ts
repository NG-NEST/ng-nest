import { NmIdentity } from "../../interfaces/identify.type";
import { NmData } from "../../interfaces/data.type";

export const SliderPrefix = "nm-slider";

// Slider 参数对象
export interface NmSliderOption {
  // 数据
  nmData?: NmData<NmSliderData[]>;
}

export interface NmSliderData extends NmIdentity {}
