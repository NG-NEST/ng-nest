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
   * 状态
   */
  @Input() status: XResultStatus = 'info';
  /**
   * 标题，支持模板自定义
   */
  @Input() title: XTemplate;
  /**
   * 图标，支持模板自定义
   */
  @Input() icon: XTemplate;
  /**
   * 小标题，支持模板自定义
   */
  @Input() subTitle: XTemplate;
}

/**
 * 结果状态
 */
export type XResultStatus = XStatus | '403' | '404' | '500' | 'custom';
