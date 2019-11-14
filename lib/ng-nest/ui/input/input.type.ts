import { XIdentityOption } from "@ng-nest/ui/core";

/**
 * Input 组件名
 * @selector x-input
 * @decorator component
 */
export const InputPrefix = "x-input";

/**
 * Input 参数对象
 */
export interface XInputOption extends XIdentityOption {
  /**
   * 布局方式
   * @default "horizontal"
   */
  layout?: XInputLayoutType;
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
   * 必填
   * @default false
   */
  required?: boolean;
  /**
   * 禁用
   * @default false
   */
  disabled?: boolean;
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
 * 布局方式，此处指文本跟输入框的位置
 * @value "horizontal" 水平
 * @value "vertical" 垂直
 */
export type XInputLayoutType = "horizontal" | "vertical";

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
