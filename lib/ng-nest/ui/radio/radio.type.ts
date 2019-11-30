import { XIdentityInput, XData } from "@ng-nest/ui/core";

/**
 * Radio 组件名
 * @selector x-radio
 * @decorator component
 */
export const XRadioPrefix = "x-radio";

/**
 * Radio @Input
 */
export interface XRadioInput {
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 单选框数据
   */
  data?: XData<XRadioNode[]>;
  /**
   * 按钮样式
   */
  button?: boolean | string;
  /**
   * 图标样式
   */
  icon?: boolean | string;
}

/**
 * Radio 数据对象
 */
export interface XRadioNode extends XIdentityInput {
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 图标的提示信息
   */
  title?: string;
}
