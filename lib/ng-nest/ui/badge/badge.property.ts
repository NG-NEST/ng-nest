import { XProperty, XInputNumber, XInputBoolean, XNumber, XBoolean } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Badge
 * @selector x-badge
 * @decorator component
 */
export const XBadgePrefix = 'x-badge';

/**
 * Badge Property
 */
@Component({ template: '' })
export class XBadgeProperty extends XProperty {
  /**
   * 背景颜色
   */
  @Input() type: XBadgeType = 'danger';
  /**
   * 最大值
   */
  @Input() @XInputNumber() max: XNumber;
  /**
   * 显示值
   */
  @Input() value: XNumber = '';
  /**
   * 是否显示小红点
   */
  @Input() @XInputBoolean() dot: XBoolean;
}

/**
 * 标记类型
 */
export type XBadgeType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';
