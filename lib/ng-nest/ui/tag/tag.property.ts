import { XType, XSize, XProperty, XInputBoolean, XBoolean } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Tag
 * @selector x-tag
 * @decorator component
 */
export const XTagPrefix = 'x-tag';

/**
 * Tag Property
 */
@Component({ template: '' })
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
  @Input() @XInputBoolean() closable: XBoolean;
  /**
   * 深色主题
   */
  @Input() @XInputBoolean() dark: XBoolean;
  /**
   * 点击关闭的事件
   */
  @Output() close = new EventEmitter<void>();
}
