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
@Component({ selector: `${XPageHeaderPrefix}-property`, template: '' })
export class XPageHeaderProperty {
  /**
   * @zh_CN 返回图标
   * @en_US Back icon
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'fto-arrow-left') backIcon?: string;
  /**
   * @zh_CN 返回文字
   * @en_US Return text
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) backText?: string;
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  @Input() title?: string;
  /**
   * @zh_CN 副标题
   * @en_US Subtitle
   */
  @Input() subTitle?: string;
  /**
   * @zh_CN 点击返回的事件
   * @en_US Click to return event
   */
  @Output() backClick = new EventEmitter();
}
