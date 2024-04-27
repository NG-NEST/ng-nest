import { XStatus, XProperty, XTemplate } from '@ng-nest/ui/core';
import { Input, Component, input } from '@angular/core';

/**
 * Result
 * @selector x-result
 * @decorator component
 */
export const XResultPrefix = 'x-result';

/**
 * Result Property
 */
@Component({ selector: `${XResultPrefix}-property`, template: '' })
export class XResultProperty extends XProperty {
  /**
   * @zh_CN 状态
   * @en_US Status
   */
  readonly status = input<XResultStatus>('info');
  /**
   * @zh_CN 标题，支持模板自定义
   * @en_US Title, support template customization
   */
  readonly title = input<XTemplate>();
  /**
   * @zh_CN 图标，支持模板自定义
   * @en_US Icon, support template customization
   */
  readonly icon = input<XTemplate>();
  /**
   * @zh_CN 小标题，支持模板自定义
   * @en_US Subtitle, support template customization
   */
  readonly subTitle = input<XTemplate>();
}

/**
 * @zh_CN 结果状态
 * @en_US Result status
 */
export type XResultStatus = XStatus | '403' | '404' | '500' | 'custom';
