import { XTemplate, XType, XSize } from '@ng-nest/ui/core';

/**
 * Tag 组件名
 * @selector x-tag
 * @decorator component
 */
export const XTagPrefix = 'x-tag';

/**
 * Tag @Input
 */
export interface XTagInput {
  /**
   * 标签内容
   */
  label?: XTemplate;
  /**
   * 标签样式类型
   */
  type?: XType;
  /**
   * 尺寸
   */
  size?: XSize;
  /**
   * 显示关闭按钮
   */
  closeable?: boolean;
  /**
   * 深色主题
   */
  dark?: boolean;
}
