export enum InputTypeEnum {
  Text = 'text',
  Password = 'password',
  Number = 'number'
}

export enum InputLayoutEnum {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum InputIconLayoutEnum {
  Left = 'left',
  Right = 'right'
}

export enum InputSizeEnum {
  Large = 'large',
  Small = 'small'
}

export interface InputOption {

  layout?: InputLayoutEnum;

  label?: string;

  type?: InputTypeEnum;

  size?: InputSizeEnum;

  placeholder?: String;

  required?: boolean;

  disabled?: boolean;

  icon?: string;

  iconLayout?: InputIconLayoutEnum;

  key?: string;
}