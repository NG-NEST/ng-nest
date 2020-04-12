import { XProperty, XInputNumber, XInputBoolean } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Badge
 * @selector x-badge
 * @decorator component
 */
export const XBadgePrefix = 'x-badge';

/**
 * Badge Property
 */
export class XBadgeProperty extends XProperty {
  /**
   * 背景颜色
   */
  @Input() type: XBadgeType = 'danger';
  /**
   * 最大值
   */
  @Input() @XInputNumber() max?: number;
  /**
   * 显示值
   */
  @Input() value: number | string = '';
  /**
   * 是否显示小红点
   */
  @Input() @XInputBoolean() dot: boolean = false;
}

/**
 * 标记类型
 */
export type XBadgeType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';
