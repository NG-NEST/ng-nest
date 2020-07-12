import { XTemplate, XPosition, XProperty, XInputBoolean, XBoolean, XWithConfig } from '@ng-nest/ui/core';
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
  @Input() @XInputBoolean() visible: XBoolean;
  /**
   * 展示方向
   */
  @Input() @XWithConfig<XPosition>('right') placement: XPosition;
  /**
   * 尺寸，支持固定值
   */
  @Input() @XWithConfig<string>('30%') size: string;
  /**
   * 关闭的事件
   */
  @Output() close = new EventEmitter();
}
