import { XStatus, XProperty, XTemplate } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Result
 * @selector x-result
 * @decorator component
 */
export const XResultPrefix = 'x-result';

/**
 * Result Property
 */
@Component({ template: '' })
export class XResultProperty extends XProperty {
  /**
   * @zh_CN 状态
   * @en_US Status
   */
  @Input() status: XResultStatus = 'info';
  /**
   * @zh_CN 标题，支持模板自定义
   * @en_US Title, support template customization
   */
  @Input() title!: XTemplate;
  /**
   * @zh_CN 图标，支持模板自定义
   * @en_US Icon, support template customization
   */
  @Input() icon!: XTemplate;
  /**
   * @zh_CN 小标题，支持模板自定义
   * @en_US Subtitle, support template customization
   */
  @Input() subTitle!: XTemplate;
}

/**
 * @zh_CN 结果状态
 * @en_US Result status
 */
export type XResultStatus = XStatus | '403' | '404' | '500' | 'custom';
