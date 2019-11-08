import { NuIdentityOption } from "@ng-nest/ui/core";

/**
 * Input 组件名
 * @selector nu-input
 * @decorator component
 */
export const InputPrefix = "nu-input";

/**
 * Input 参数对象
 */
export interface NuInputOption extends NuIdentityOption {
  /**
   * 布局方式
   * @default "horizontal"
   */
  nuLayout?: NuInputLayoutType;
  /**
   * 输入类型
   * @default "text"
   */
  nuType?: NuInputType;
  /**
   * 输入提示
   */
  nuPlaceholder?: string;
  /**
   * 必填
   * @default false
   */
  nuRequired?: boolean;
  /**
   * 禁用
   * @default false
   */
  nuDisabled?: boolean;
  /**
   * 图标
   */
  nuIcon?: string;
  /**
   * 图标布局方式
   * @default "right"
   */
  nuIconLayout?: NuInputIconLayoutType;
}

/**
 * 布局方式，此处指文本跟输入框的位置
 * @value "horizontal" 水平
 * @value "vertical" 垂直
 */
export type NuInputLayoutType = "horizontal" | "vertical";

/**
 * 输入框类型
 * @value "text" 文本
 * @value "password" 密码
 * @value "number" 数字
 */
export type NuInputType = "text" | "password" | "number";

/**
 * 图标布局方式，指在输入框中的位置
 * @value "left" 靠左
 * @value "right" 靠右
 */
export type NuInputIconLayoutType = "left" | "right";
