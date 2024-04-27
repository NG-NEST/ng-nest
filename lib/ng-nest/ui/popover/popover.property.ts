import { XPropertyFunction, XToCssPixelValue, XToBoolean, XToNumber } from '@ng-nest/ui/core';
import { Directive, ElementRef, input, model } from '@angular/core';
import type { XPlacement, XTemplate, XBoolean, XNumber } from '@ng-nest/ui/core';

/**
 * Popover
 * @selector x-popover
 * @decorator directive
 */
export const XPopoverPrefix = 'x-popover';
const X_POPOVER_CONFIG_NAME = 'popover';

/**
 * Popover Property
 */
@Directive({ selector: `[${XPopoverPrefix}], ${XPopoverPrefix}` })
export class XPopoverProperty extends XPropertyFunction(X_POPOVER_CONFIG_NAME) {
  /**
   * @zh_CN 标题，支持自定义模板
   * @en_US Title, support custom template
   */
  readonly title = input<XTemplate>('');
  /**
   * @zh_CN 内容，支持自定义模板
   * @en_US Content, support custom templates
   */
  readonly content = input<XTemplate>('');
  /**
   * @zh_CN 底部，支持自定义模板
   * @en_US At the bottom, support custom templates
   */
  readonly footer = input<XTemplate>('');
  /**
   * @zh_CN 内部样式
   * @en_US panel class
   */
  readonly panelClass = input<string | string[]>('');
  /**
   * @zh_CN 指定参考对象
   * @en_US specify reference object
   */
  readonly connectTo = input<ElementRef<HTMLElement> | HTMLElement>();
  /**
   * @zh_CN 弹出的位置
   * @en_US Pop-up position
   */
  readonly placement = input<XPlacement>(this.config?.placement ?? 'top');
  /**
   * @zh_CN 激活方式
   * @en_US Activation method
   */
  readonly trigger = input<XPopoverTrigger>(this.config?.trigger ?? 'hover');
  /**
   * @zh_CN 宽度
   * @en_US width
   */
  readonly width = input<string, XNumber>(this.config?.width ?? '', { transform: XToCssPixelValue });
  /**
   * @zh_CN 最大宽度
   * @en_US Max width
   */
  readonly maxWidth = input<string, XNumber>(this.config?.maxWidth ?? '10rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 最小宽度
   * @en_US Min width
   */
  readonly minWidth = input<string, XNumber>(this.config?.minWidth ?? '10rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 显示/隐藏控制
   * @en_US Show/hide control
   */
  readonly visible = model(false);
  /**
   * @zh_CN 条件触发
   * @en_US condition trigger
   */
  readonly condition = input<boolean, XBoolean>(false, { transform: XToBoolean });
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
}

/**
 * @zh_CN 激活方式
 * @en_US Activation method
 * @value "hover"
 * @value "click"
 */
export type XPopoverTrigger = 'hover' | 'click' | 'focus';

/**
 * Popover Portal
 * @selector x-popover-portal
 * @decorator component
 */
export const XPopoverPortalPrefix = 'x-popover-portal';
