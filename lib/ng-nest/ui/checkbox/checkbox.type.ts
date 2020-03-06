import { XIdentityInput, XData } from '@ng-nest/ui/core';

/**
 * Checkbox 组件名
 * @selector x-checkbox
 * @decorator component
 */
export const XCheckboxPrefix = 'x-checkbox';

/**
 * Checkbox @Input
 */
export interface XCheckboxInput {
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 单选框数据
   */
  data?: XData<XCheckboxNode[]>;
  /**
   * 按钮样式
   */
  button?: boolean;
  /**
   * 图标样式
   */
  icon?: boolean;
  /**
   * 不确定状态的样式
   */
  indeterminate?: boolean;
}

/**
 * Checkbox 数据对象
 */
export interface XCheckboxNode extends XIdentityInput {
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
