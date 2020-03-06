import { XIdentityInput, XData } from '@ng-nest/ui/core';

/**
 * Upload 组件名
 * @selector x-upload
 * @decorator component
 */
export const XUploadPrefix = 'x-upload';

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
export interface XUploadNode extends File {
  /**
   * 地址
   */
  url?: string;
  /**
   * 状态
   */
  state?: XStateType;
  /**
   * 上传进度
   */
  percent?: number;
}

/**
 * 文件状态
 * @value "ready" 准备上传
 * @value "uploading" 上传中
 * @value "success" 上传成功
 * @value "error" 上传失败
 */
export type XStateType = 'ready' | 'uploading' | 'success' | 'error';
