import { XType, XSize, XProperty, XInputBoolean } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter } from '@angular/core';

/**
 * Tag
 * @selector x-tag
 * @decorator component
 */
export const XTagPrefix = 'x-tag';

/**
 * Tag Property
 */
export class XTagProperty extends XProperty {
  /**
   * 标签样式类型
   */
  @Input() type: XType;
  /**
   * 尺寸
   */
  @Input() size: XSize = 'medium';
  /**
   * 显示关闭按钮
   */
  @Input() @XInputBoolean() closable: boolean = false;
  /**
   * 深色主题
   */
  @Input() @XInputBoolean() dark: boolean = false;
  /**
   * 点击关闭的事件
   */
  @Output() close = new EventEmitter<void>();
}
