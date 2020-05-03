import { XPlacement, XInputBoolean, XBoolean, XInputNumber, XNumber } from '@ng-nest/ui/core';
import { Input, Directive } from '@angular/core';

/**
 * Tooltip
 * @selector x-tooltip
 * @decorator directive
 */
export const XTooltipPrefix = 'x-tooltip';

/**
 * Tooltip Property
 */
@Directive({ selector: `[${XTooltipPrefix}], ${XTooltipPrefix}` })
export class XTooltipProperty {
  /**
   * 内容
   */
  @Input() content: string;
  /**
   * 显示位置
   */
  @Input() placement: XPlacement = 'bottom';
  /**
   * 显示/隐藏
   */
  @Input() @XInputBoolean() visible: XBoolean;
  /**
   * 手动处理关闭事件
   */
  @Input() @XInputBoolean() manual: XBoolean;
}

/**
 * Tooltip Portal
 * @selector x-tooltip-portal
 * @decorator component
 */
export const XTooltipPortalPrefix = 'x-tooltip-portal';
