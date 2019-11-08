import { NuIdentityOption } from "@ng-nest/ui/core";

/**
 * Button 组件名
 * @selector nu-button
 * @decorator component
 */
export const ButtonPrefix = "nu-button";

/**
 * Buttons 组件名
 * @selector nu-buttons
 * @decorator component
 */
export const ButtonsPrefix = "nu-buttons";

/**
 * Button 参数对象
 */
export interface NuButtonOption extends NuIdentityOption {
  /**
   * 按钮类型
   */
  nuType?: NuButtonType;

  /**
   * 图标
   */
  nuIcon?: string;

  /**
   * 提示信息
   */
  nuTitle?: string;

  /**
   * 激活
   */
  nuActivated?: boolean;

  /**
   * 禁用
   */
  nuDisabled?: boolean;
}

/**
 * Buttons 参数对象
 */
export interface NuButtonsOption {
  /**
   * 间距
   * @default 0
   */
  nuSpace?: number;
  /**
   * 不显示边框
   */
  nuNotBorder?: boolean;
}

export type NuButtonType = "submit" | "button";
