import { NmIdentityOption } from "ng-moon/core";

/**
 * Button 组件名
 * @selector nm-button
 * @decorator component
 */
export const ButtonPrefix = "nm-button";

/**
 * Buttons 组件名
 * @selector nm-buttons
 * @decorator component
 */
export const ButtonsPrefix = "nm-buttons";

/**
 * Button 参数对象
 */
export interface NmButtonOption extends NmIdentityOption {
  /**
   * 按钮类型
   */
  nmType?: NmButtonType;

  /**
   * 图标
   */
  nmIcon?: string;

  /**
   * 提示信息
   */
  nmTitle?: string;
}

/**
 * Buttons 参数对象
 */
export interface NmButtonsOption {
  /**
   * 间距
   * @default 0
   */
  nmSpace?: number;
  /**
   * 不显示边框
   */
  nmNotBorder?: boolean;
}

export type NmButtonType = "submit" | "button";
