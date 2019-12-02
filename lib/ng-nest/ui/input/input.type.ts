import { XIdentityInput, XFormProperty } from "@ng-nest/ui/core";

/**
 * Input 组件名
 * @selector x-input
 * @decorator component
 */
export const XInputPrefix = "x-input";

/**
 * Input @Input
 */
export interface XInputInput extends XIdentityInput, XFormProperty {
  /**
   * 输入类型
   * @default "text"
   */
  type?: XInputType;
  /**
   * 输入提示
   */
  placeholder?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 图标布局方式
   * @default "right"
   */
  iconLayout?: XInputIconLayoutType;
}

/**
 * 输入框类型
 * @value "text" 文本
 * @value "password" 密码
 * @value "number" 数字
 */
export type XInputType = "text" | "password" | "number";

/**
 * 图标布局方式，指在输入框中的位置
 * @value "left" 靠左
 * @value "right" 靠右
 */
export type XInputIconLayoutType = "left" | "right";
