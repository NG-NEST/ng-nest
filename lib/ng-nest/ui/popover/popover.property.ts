import { XPlacement, XTemplate, XProperty, XInputBoolean, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Directive, ElementRef } from '@angular/core';

/**
 * Popover
 * @selector x-popover
 * @decorator directive
 */
export const XPopoverPrefix = 'x-popover';
const X_CONFIG_NAME = 'popover';

/**
 * Popover Property
 */
@Directive({ selector: `[${XPopoverPrefix}], ${XPopoverPrefix}` })
export class XPopoverProperty extends XProperty {
  /**
   * @zh_CN 标题，支持自定义模板
   * @en_US Title, support custom template
   */
  @Input() title?: XTemplate;
  /**
   * @zh_CN 内容，支持自定义模板
   * @en_US Content, support custom templates
   */
  @Input() content?: XTemplate;
  /**
   * @zh_CN 底部，支持自定义模板
   * @en_US At the bottom, support custom templates
   */
  @Input() footer?: XTemplate;
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
   * @zh_CN 弹出的位置
   * @en_US Pop-up position
   */
  @Input() @XWithConfig<XPlacement>(X_CONFIG_NAME, 'bottom') placement?: XPlacement;
  /**
   * @zh_CN 激活方式
   * @en_US Activation method
   */
  @Input() @XWithConfig<XPopoverTrigger>(X_CONFIG_NAME, 'hover') trigger?: XPopoverTrigger;
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '10rem') width?: string;
  /**
   * @zh_CN 显示/隐藏控制
   * @en_US Show/hide control
   */
  @Input() @XInputBoolean() visible?: XBoolean;
  /**
   * @zh_CN 条件触发
   * @en_US condition trigger
   */
  @Input() @XInputBoolean() condition?: XBoolean;
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
   * @zh_CN 显示/隐藏改变的事件
   * @en_US Show/hide changed events
   */
  @Output() visibleChange = new EventEmitter<XBoolean>();
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
