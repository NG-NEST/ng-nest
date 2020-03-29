import { TemplateRef } from '@angular/core';

/**
 * PageHeader 组件名
 * @selector x-page-header
 * @decorator component
 */
export const XPageHeaderPrefix = 'x-page-header';

/**
 * PageHeader @Input
 */
export interface XPageHeaderInput {
  /**
   * 返回图标
   * @default 'fto-arrow-left'
   */
  backIcon: string;
  /**
   * 返回文字
   * @default '返回'
   */
  backText: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 副标题
   */
  subTitle: string;
}
