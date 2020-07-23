import { XProperty, XInputNumber, XInputBoolean, XNumber, XBoolean, XType, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Badge
 * @selector x-badge
 * @decorator component
 */
export const XBadgePrefix = 'x-badge';
const X_CONFIG_NAME = 'badge';

/**
 * Badge Property
 */
@Component({ template: '' })
export class XBadgeProperty extends XProperty {
  /**
   * 背景颜色
   */
  @Input() @XWithConfig<XBadgeType>(X_CONFIG_NAME, 'danger') type: XBadgeType;
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
export type XBadgeType = XType;
