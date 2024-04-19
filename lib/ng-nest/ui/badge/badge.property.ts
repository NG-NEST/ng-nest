import { XPropertyFunction, XToNumber, XToString, XToCssPixelValue, XToBoolean } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XNumber, XBoolean, XType } from '@ng-nest/ui/core';

/**
 * Badge
 * @selector x-badge
 * @decorator component
 */
export const XBadgePrefix = 'x-badge';
const X_BADGE_CONFIG_NAME = 'badge';

/**
 * Badge Property
 */
@Component({ selector: `${XBadgePrefix}-property`, template: '' })
export class XBadgeProperty extends XPropertyFunction(X_BADGE_CONFIG_NAME) {
  /**
   * @zh_CN 背景颜色
   * @en_US Background color
   */
  type = input<XBadgeType>(this.config?.type ?? 'danger');
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  max = input<number, XNumber>(99, { transform: XToNumber });
  /**
   * @zh_CN 显示值
   * @en_US Display value
   */
  value = input<string, XNumber>('', { transform: XToString });
  /**
   * @zh_CN 偏移值 left
   * @en_US Offset left value
   */
  offsetLeft = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 偏移值 top
   * @en_US Offset right value
   */
  offsetTop = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 是否显示小红点
   * @en_US Whether to show the small red dot
   */
  dot = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 独立使用
   * @en_US Independent use
   */
  standalone = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 标记类型
 * @en_US Mark type
 */
export type XBadgeType = XType;
