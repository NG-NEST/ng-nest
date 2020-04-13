import { XPlacement, XInputBoolean } from '@ng-nest/ui/core';
import { Input, Component, Directive } from '@angular/core';

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
  @Input() @XInputBoolean() visible: boolean;
}

/**
 * Tooltip Portal
 * @selector x-tooltip-portal
 * @decorator component
 */
export const XTooltipPortalPrefix = 'x-tooltip-portal';
