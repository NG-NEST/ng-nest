import { XIdentityInput, XData } from "@ng-nest/ui/core";

/**
 * Upload 组件名
 * @selector x-upload
 * @decorator component
 */
export const XUploadPrefix = "x-upload";

/**
 * Upload @Input
 */
export interface XUploadInput {
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 单选框数据
   */
  data?: XData<XUploadNode[]>;
  /**
   * 按钮样式
   */
  button?: boolean;
  /**
   * 图标样式
   */
  icon?: boolean;
}

/**
 * Upload 数据对象
 */
export interface XUploadNode extends XIdentityInput {
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
