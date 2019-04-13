export const prefix = "nm-input";

export interface InputOption {
  layout?: InputLayoutEnum;
  label?: string;
  type?: InputTypeEnum;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  iconLayout?: InputIconLayoutEnum;
}

export enum InputLayoutEnum {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

export enum InputTypeEnum {
  Text = "text",
  Password = "password",
  Number = "number"
}

export enum InputIconLayoutEnum {
  Left = "left",
  Right = "right"
}
