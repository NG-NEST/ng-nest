import { XPlacement, XTemplate, XProperty, XInputBoolean, XBoolean } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Directive } from '@angular/core';

/**
 * Popover
 * @selector x-popover
 * @decorator directive
 */
export const XPopoverPrefix = 'x-popover';

/**
 * Popover Property
 */
@Directive({ selector: `[${XPopoverPrefix}], ${XPopoverPrefix}` })
export class XPopoverProperty extends XProperty {
  /**
   * 标题，支持自定义模板
   */
  @Input() title?: XTemplate;
  /**
   * 内容，支持自定义模板
   */
  @Input() content?: XTemplate;
  /**
   * 底部，支持自定义模板
   */
  @Input() footer?: XTemplate;
  /**
   * 弹出的位置
   */
  @Input() placement: XPlacement = 'bottom';
  /**
   * 激活方式
   */
  @Input() trigger: XPopoverTrigger = 'hover';
  /**
   * 宽度
   */
  @Input() width: string = '10rem';
  /**
   * 显示/隐藏控制
   */
  @Input() @XInputBoolean() visible: XBoolean;
  /**
   * 显示/隐藏改变的事件
   */
  @Output() visibleChange = new EventEmitter<XBoolean>();
}

/**
 * 激活方式
 * @value "hover"
 * @value "click"
 */
export type XPopoverTrigger = 'hover' | 'click';

/**
 * Popover Portal
 * @selector x-popover-portal
 * @decorator component
 */
export const XPopoverPortalPrefix = 'x-popover-portal';
