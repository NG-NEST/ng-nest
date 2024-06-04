import { XPropertyFunction, XToBoolean, XToNumber } from '@ng-nest/ui/core';
import { Directive, ElementRef, input, model } from '@angular/core';
import type { XPlacement, XBoolean, XTemplate, XNumber } from '@ng-nest/ui/core';

/**
 * Tooltip
 * @selector x-tooltip
 * @decorator directive
 */
export const XTooltipPrefix = 'x-tooltip';
const X_TOOLTIP_CONFIG_NAME = 'tooltip';

/**
 * Tooltip Property
 */
@Directive({ selector: `[${XTooltipPrefix}], ${XTooltipPrefix}` })
export class XTooltipProperty extends XPropertyFunction(X_TOOLTIP_CONFIG_NAME) {
  /**
   * @zh_CN 内容
   * @en_US Content
   */
  readonly content = input<XTemplate>();
  /**
   * @zh_CN 显示位置
   * @en_US Display position
   */
  readonly placement = input<XPlacement>(this.config?.placement ?? 'top');
  /**
   * @zh_CN 显示/隐藏
   * @en_US Show/hide
   */
  readonly visible = model<boolean>(false);
  /**
   * @zh_CN 内部样式
   * @en_US panel class
   */
  readonly panelClass = input<string | string[]>();
  /**
   * @zh_CN 指定参考对象
   * @en_US specify reference object
   */
  readonly connectTo = input<ElementRef<HTMLElement> | HTMLElement>();
  /**
   * @zh_CN 背景颜色
   * @en_US Background color
   */
  readonly backgroundColor = input<string>();
  /**
   * @zh_CN 文字颜色
   * @en_US Text color
   */
  readonly color = input<string>();
  /**
   * @zh_CN 手动处理关闭事件
   * @en_US Manually handle the shutdown event
   */
  readonly manual = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 鼠标移入后延时多少才显示
   * @en_US How much is the mouse transfer after transfer
   */
  readonly mouseEnterDelay = input<number, XNumber>(150, { transform: XToNumber });
  /**
   * @zh_CN 鼠标移出后延时多少才隐藏
   * @en_US How much hidden is hidden after the mouse is removed
   */
  readonly mouseLeaveDelay = input<number, XNumber>(100, { transform: XToNumber });
  /**
   * @zh_CN 禁用显示
   * @en_US Disable display
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * Tooltip Portal
 * @selector x-tooltip-portal
 * @decorator component
 */
export const XTooltipPortalPrefix = 'x-tooltip-portal';
