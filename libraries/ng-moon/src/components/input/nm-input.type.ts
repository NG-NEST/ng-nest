export const prefix = "nm-input";

/**
 * Input 参数对象
 */
export interface NmInputOption {
  /** 布局方式，默认 Vertical */
  nmLayout?: NmInputLayoutEnum;
  /** Label 内容 */
  nmLabel?: string;
  /** Input 输入类型 */
  nmType?: NmInputTypeEnum;
  /** 提示描述 */
  nmPlaceholder?: string;
  /** 必填 */
  nmRequired?: boolean;
  /** 禁用 */
  nmDisabled?: boolean;
  /** 图标 */
  nmIcon?: string;
  /** 图标布局方式，默认 Right */
  nmIconLayout?: NmInputIconLayoutEnum;
}

export enum NmInputLayoutEnum {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

export enum NmInputTypeEnum {
  Text = "text",
  Password = "password",
  Number = "number"
}

export enum NmInputIconLayoutEnum {
  Left = "left",
  Right = "right"
}
