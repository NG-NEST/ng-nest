import { XTemplate, XPosition, XProperty, XInputBoolean } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Drawer
 * @selector x-drawer
 * @decorator component
 */
export const XDrawerPrefix = 'x-drawer';

/**
 * Drawer Property
 */
@Component({ template: '' })
export class XDrawerProperty extends XProperty {
  /**
   * 标题
   */
  @Input() title?: XTemplate;
  /**
   * 显示/隐藏
   */
  @Input() @XInputBoolean() visible: boolean;
  /**
   * 展示方向
   */
  @Input() placement: XPosition = 'right';
  /**
   * 尺寸，支持固定值
   */
  @Input() size: string = '30%';
  /**
   * 关闭的事件
   */
  @Output() close = new EventEmitter();
}
