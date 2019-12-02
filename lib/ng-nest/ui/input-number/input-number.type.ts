import { XIdentityInput, XFormProperty } from "@ng-nest/ui/core";

/**
 * InputNumber 组件名
 * @selector x-input-number
 * @decorator component
 */
export const XInputNumberPrefix = "x-input-number";

/**
 * InputNumber @InputNumber
 */
export interface XInputNumberInputNumber extends XIdentityInput, XFormProperty {
  /**
   * 输入提示
   */
  placeholder?: string;
}

/**
 * 输入框类型
 * @value "text" 文本
 * @value "password" 密码
 * @value "number" 数字
 */
export type XInputNumberType = "text" | "password" | "number";

/**
 * 图标布局方式，指在输入框中的位置
 * @value "left" 靠左
 * @value "right" 靠右
 */
export type XInputNumberIconLayoutType = "left" | "right";
