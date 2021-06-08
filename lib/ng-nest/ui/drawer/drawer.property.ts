import { XTemplate, XPosition, XProperty, XInputBoolean, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Drawer
 * @selector x-drawer
 * @decorator component
 */
export const XDrawerPrefix = 'x-drawer';
const X_CONFIG_NAME = 'drawer';

/**
 * Drawer Property
 */
@Component({ template: '' })
export class XDrawerProperty extends XProperty {
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  @Input() title?: XTemplate;
  /**
   * @zh_CN 显示/隐藏
   * @en_US Show/hide
   */
  @Input() @XInputBoolean() visible?: XBoolean;
  /**
   * @zh_CN 展示方向
   * @en_US Display direction
   */
  @Input() @XWithConfig<XPosition>(X_CONFIG_NAME, 'right') placement?: XPosition;
  /**
   * @zh_CN 尺寸，支持固定值
   * @en_US Size, supports fixed value
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '30%') size?: string;
  /**
   * @zh_CN 关闭的事件
   * @en_US Closed event
   */
  @Output() close = new EventEmitter();
  /**
   * @zh_CN 显示/隐藏的事件
   * @en_US Show/hide event
   */
  @Output() visibleChange = new EventEmitter<boolean>();
}
