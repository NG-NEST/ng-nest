import { Input, Output, EventEmitter } from '@angular/core';

/**
 * PageHeader
 * @selector x-page-header
 * @decorator component
 */
export const XPageHeaderPrefix = 'x-page-header';

/**
 * PageHeader Property
 */
export class XPageHeaderProperty {
  /**
   * 返回图标
   */
  @Input('back-icon') backIcon: string = 'fto-arrow-left';
  /**
   * 返回文字
   */
  @Input('back-text') backText: string = '返回';
  /**
   * 标题
   */
  @Input() title: string;
  /**
   * 副标题
   */
  @Input('sub-title') subTitle: string;
  /**
   * 点击返回的事件
   */
  @Output() backClick = new EventEmitter();
}
