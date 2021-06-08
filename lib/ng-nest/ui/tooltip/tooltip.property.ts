import { XPlacement, XInputBoolean, XBoolean, XInputNumber, XNumber, XWithConfig } from '@ng-nest/ui/core';
import { Input, Directive } from '@angular/core';

/**
 * Tooltip
 * @selector x-tooltip
 * @decorator directive
 */
export const XTooltipPrefix = 'x-tooltip';
const X_CONFIG_NAME = 'tooltip';

/**
 * Tooltip Property
 */
@Directive({ selector: `[${XTooltipPrefix}], ${XTooltipPrefix}` })
export class XTooltipProperty {
  /**
   * @zh_CN 内容
   * @en_US Content
   */
  @Input() content?: string;
  /**
   * @zh_CN 显示位置
   * @en_US Display position
   */
  @Input() @XWithConfig<XPlacement>(X_CONFIG_NAME, 'bottom') placement?: XPlacement;
  /**
   * @zh_CN 显示/隐藏
   * @en_US Show/hide
   */
  @Input() @XInputBoolean() visible?: XBoolean;
  /**
   * @zh_CN 手动处理关闭事件
   * @en_US Manually handle the shutdown event
   */
  @Input() @XInputBoolean() manual?: XBoolean;
}

/**
 * Tooltip Portal
 * @selector x-tooltip-portal
 * @decorator component
 */
export const XTooltipPortalPrefix = 'x-tooltip-portal';
