import { NmIdentity } from "../../../interfaces/identify.type";

export const InputPrefix = "nm-input";

/** Input 参数对象 */
export interface NmInputOption extends NmIdentity {
  /** 布局方式，默认 Vertical */
  nmLayout?: NmInputLayoutEnum | string;
  /** Input 输入类型 */
  nmType?: NmInputTypeEnum | string;
  /** 提示描述 */
  nmPlaceholder?: string;
  /** 必填 */
  nmRequired?: boolean;
  /** 禁用 */
  nmDisabled?: boolean;
  /** 图标 */
  nmIcon?: string;
  /** 图标布局方式，默认 Right */
  nmIconLayout?: NmInputIconLayoutEnum | string;
}

/** 布局方式，此处指文本跟输入框的位置 */
export enum NmInputLayoutEnum {
  /** 水平 */
  Horizontal = "horizontal",
  /** 垂直 */
  Vertical = "vertical"
}

/** 输入框类型 */
export enum NmInputTypeEnum {
  /** 文本 */
  Text = "text",
  /** 密码 */
  Password = "password",
  /** 数字 */
  Number = "number"
}

/** 图标布局方式，指在输入框中的位置 */
export enum NmInputIconLayoutEnum {
  /** 靠左 */
  Left = "left",
  /** 靠右 */
  Right = "right"
}
