import { Input, Output, EventEmitter, Component } from '@angular/core';
import { XWithConfig } from '@ng-nest/ui/core';

/**
 * PageHeader
 * @selector x-page-header
 * @decorator component
 */
export const XPageHeaderPrefix = 'x-page-header';
const X_CONFIG_NAME = 'header';

/**
 * PageHeader Property
 */
@Component({ template: '' })
export class XPageHeaderProperty {
  /**
   * 返回图标
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'fto-arrow-left') backIcon: string;
  /**
   * 返回文字
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '返回') backText: string;
  /**
   * 标题
   */
  @Input() title: string;
  /**
   * 副标题
   */
  @Input() subTitle: string;
  /**
   * 点击返回的事件
   */
  @Output() backClick = new EventEmitter();
}
