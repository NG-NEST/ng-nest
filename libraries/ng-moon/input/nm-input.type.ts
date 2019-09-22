import { NmIdentityOption } from "ng-moon/core";

/**
 * Input 组件名
 * @selector nm-input
 * @decorator component
 */
export const InputPrefix = "nm-input";

/**
 * Input 参数对象
 */
export interface NmInputOption extends NmIdentityOption {
  /**
   * 布局方式
   * @default "horizontal"
   */
  nmLayout?: NmInputLayoutType;
  /**
   * 输入类型
   * @default "text"
   */
  nmType?: NmInputType;
  /**
   * 输入提示
   */
  nmPlaceholder?: string;
  /**
   * 必填
   * @default false
   */
  nmRequired?: boolean;
  /**
   * 禁用
   * @default false
   */
  nmDisabled?: boolean;
  /**
   * 图标
   */
  nmIcon?: string;
  /**
   * 图标布局方式
   * @default "right"
   */
  nmIconLayout?: NmInputIconLayoutType;
}

/**
 * 布局方式，此处指文本跟输入框的位置
 * @value "horizontal" 水平
 * @value "vertical" 垂直
 */
export type NmInputLayoutType = "horizontal" | "vertical";

/**
 * 输入框类型
 * @value "text" 文本
 * @value "password" 密码
 * @value "number" 数字
 */
export type NmInputType = "text" | "password" | "number";

/**
 * 图标布局方式，指在输入框中的位置
 * @value "left" 靠左
 * @value "right" 靠右
 */
export type NmInputIconLayoutType = "left" | "right";
