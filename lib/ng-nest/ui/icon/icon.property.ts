import { XProperty, XInputNumber, XInputBoolean } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Icon
 * @selector x-icon
 * @decorator component
 */
export const XIconPrefix = 'x-icon';

/**
 * Icon Property
 */
export class XIconProperty extends XProperty {
  /**
   * 图标类型
   */
  @Input() type: string;
  /**
   * 图标颜色
   */
  @Input() color: string | string[];
  /**
   * 图标旋转角度
   */
  @Input() @XInputNumber() rotate: number;
  /**
   * loading效果（图标一直旋转）
   */
  @Input() @XInputBoolean() spin: boolean = false;
  /**
   * 变化为的图标（未实现）
   */
  @Input() to: string;
}

/**
 * 图标来源
 */
export type XIconSource = 'ant-design' | 'eva' | 'feather' | 'font-awesome' | 'material-design';
