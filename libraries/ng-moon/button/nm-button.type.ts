import { NmIdentityOption } from "ng-moon/core";

/**
 * Button 组件名
 * @selector nm-button
 * @decorator component
 */
export const ButtonPrefix = "nm-button";

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
}

export type NmButtonType = "submit" | "button";
