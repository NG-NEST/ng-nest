import { XType, XSize, XProperty, XInputBoolean, XBoolean, XWithConfig } from '@ng-nest/ui/core';
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
  @Input() type: XType = 'initial';
  /**
   * 尺寸
   */
  @Input() @XWithConfig<XSize>('medium') size: XSize;
  /**
   * 显示关闭按钮
   */
  @Input() @XWithConfig<XBoolean>() @XInputBoolean() closable: XBoolean;
  /**
   * 深色主题
   */
  @Input() @XWithConfig<XBoolean>() @XInputBoolean() dark: XBoolean;
  /**
   * 禁用
   */
  @Input() @XInputBoolean() disabled?: XBoolean;
  /**
   * 点击关闭的事件
   */
  @Output() close = new EventEmitter<void>();
}
