import { XTemplate } from '@ng-nest/ui/core';

/**
 * Card 组件名
 * @selector x-card
 * @decorator component
 */
export const XCardPrefix = 'x-card';

/**
 * Card @Input
 */
export interface XCardInput {
  /**
   * 卡片宽度
   */
  width?: string;
  /**
   * 内容样式
   */
  bodyStyle?: any;
  /**
   * 头部模板
   */
  header?: XTemplate;
  /**
   * 阴影显示方式
   * @default "always"
   */
  shadow?: XCardShadow;
}

/**
 * 阴影显示配置
 * @value "always"
 * @value "hover"
 * @value "never"
 */
export type XCardShadow = 'always' | 'hover' | 'never';
