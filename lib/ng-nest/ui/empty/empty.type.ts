import { XTemplate } from '@ng-nest/ui/core';

/**
 * Empty 组件名
 * @selector x-empty
 * @decorator component
 */
export const XEmptyPrefix = 'x-empty';

/**
 * Empty @Input
 */
export interface XEmptyInput {
  /**
   * 图片地址或自定义模板
   */
  img?: XTemplate;
  /**
   * 内容或自定义模板
   */
  content?: XTemplate;
}
