import { XIdentityOption, XDirection } from "@ng-nest/ui/core";

/**
 * Button 组件名
 * @selector x-button
 * @decorator component
 */
export const ButtonPrefix = "x-button";

/**
 * Buttons 组件名
 * @selector x-buttons
 * @decorator component
 */
export const ButtonsPrefix = "x-buttons";

/**
 * Button 参数对象
 */
export interface XButtonOption extends XIdentityOption {
  /**
   * 按钮类型
   */
  type?: XButtonType;

  /**
   * 图标
   */
  icon?: string;

  /**
   * 提示信息
   */
  title?: string;

  /**
   * 激活
   */
  activated?: boolean;

  /**
   * 禁用
   */
  disabled?: boolean;

  /**
   * flex 布局下的元素排列方式
   */
  direction?: XDirection;
}

/**
 * Buttons 参数对象
 */
export interface XButtonsOption {
  /**
   * 间距
   * @default 0
   */
  space?: number;
  /**
   * 不显示边框
   */
  notBorder?: boolean;
}

/**
 * 按钮类型
 * @value "primary"
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "danger"
 * @value "text"
 */
export type XButtonType = "primary" | "success" | "info" | "warning" | "danger" | "text";
