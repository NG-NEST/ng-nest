import { XPlacement, XInputBoolean, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Directive, ElementRef } from '@angular/core';

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
   * @zh_CN 内部样式
   * @en_US panel class
   */
  @Input() panelClass?: string | string[];
  /**
   * @zh_CN 指定参考对象
   * @en_US specify reference object
   */
  @Input() connectTo?: ElementRef<HTMLElement> | HTMLElement;
  /**
   * @zh_CN 背景颜色
   * @en_US Background color
   */
  @Input() backgroundColor?: string;
  /**
   * @zh_CN 文字颜色
   * @en_US Text color
   */
  @Input() color?: string;
  /**
   * @zh_CN 手动处理关闭事件
   * @en_US Manually handle the shutdown event
   */
  @Input() @XInputBoolean() manual?: XBoolean;
  /**
   * @zh_CN 鼠标移入后延时多少才显示
   * @en_US How much is the mouse transfer after transfer
   */
  @Input() mouseEnterDelay: number = 150;
  /**
   * @zh_CN 鼠标移出后延时多少才隐藏
   * @en_US How much hidden is hidden after the mouse is removed
   */
  @Input() mouseLeaveDelay: number = 100;
  /**
   * @zh_CN 禁用显示
   * @en_US Disable display
   */
  @Input() @XInputBoolean() disabled?: XBoolean = false;
}

/**
 * Tooltip Portal
 * @selector x-tooltip-portal
 * @decorator component
 */
export const XTooltipPortalPrefix = 'x-tooltip-portal';
