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
   * @zh_CN 背景颜色
   * @en_US Background color
   */
  @Input() @XWithConfig<XBadgeType>(X_CONFIG_NAME, 'danger') type: XBadgeType;
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  @Input() @XInputNumber() max: XNumber;
  /**
   * @zh_CN 显示值
   * @en_US Display value
   */
  @Input() value: XNumber = '';
  /**
   * @zh_CN 是否显示小红点
   * @en_US Whether to show the small red dot
   */
  @Input() @XInputBoolean() dot: XBoolean;
}

/**
 * @zh_CN 标记类型
 * @en_US Mark type
 */
export type XBadgeType = XType;
