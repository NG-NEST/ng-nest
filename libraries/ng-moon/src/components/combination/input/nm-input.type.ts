import { NmIdentity } from "../../../interfaces/identify.type";

/**
 * Input 组件名
 */
export const InputPrefix = "nm-input";

/**
 * Input 参数对象
 *
 * @export
 * @interface NmInputOption
 * @extends {NmIdentity}
 */
export interface NmInputOption extends NmIdentity {
  /**
   * 布局方式
   *
   * @default Horizontal
   * @type {(NmInputLayoutEnum | string)}
   * @memberof NmInputOption
   */
  nmLayout?: NmInputLayoutEnum | string;
  /**
   * 输入类型
   *
   * @default Text
   * @type {(NmInputTypeEnum | string)}
   * @memberof NmInputOption
   */
  nmType?: NmInputTypeEnum | string;
  /**
   * 输入提示
   *
   * @type {string}
   * @memberof NmInputOption
   */
  nmPlaceholder?: string;
  /**
   * 必填
   *
   * @default false
   * @type {boolean}
   * @memberof NmInputOption
   */
  nmRequired?: boolean;
  /**
   * 禁用
   *
   * @default false
   * @type {boolean}
   * @memberof NmInputOption
   */
  nmDisabled?: boolean;
  /** 图标 */
  /**
   * 图标
   *
   * @type {string}
   * @memberof NmInputOption
   */
  nmIcon?: string;
  /**
   * 图标布局方式
   *
   * @default Right
   * @type {(NmInputIconLayoutEnum | string)}
   * @memberof NmInputOption
   */
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
