import { Component, input, output } from '@angular/core';
import { XPropertyFunction } from '@ng-nest/ui/core';

/**
 * PageHeader
 * @selector x-page-header
 * @decorator component
 */
export const XPageHeaderPrefix = 'x-page-header';
const X_PAGE_HEADER_CONFIG_NAME = 'pageHeader';

/**
 * PageHeader Property
 */
@Component({ selector: `${XPageHeaderPrefix}-property`, template: '' })
export class XPageHeaderProperty extends XPropertyFunction(X_PAGE_HEADER_CONFIG_NAME) {
  /**
   * @zh_CN 返回图标
   * @en_US Back icon
   */
  readonly backIcon = input<string>(this.config?.backIcon ?? 'fto-arrow-left');
  /**
   * @zh_CN 返回文字
   * @en_US Return text
   */
  readonly backText = input<string>(this.config?.backText ?? '');
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  readonly title = input<string>('');
  /**
   * @zh_CN 副标题
   * @en_US Subtitle
   */
  readonly subTitle = input<string>('');
  /**
   * @zh_CN 点击返回的事件
   * @en_US Click to return event
   */
  readonly backClick = output<Event>();
}
