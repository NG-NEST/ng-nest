import { XControlValueAccessor, XInputBoolean, XInputNumber, XSize } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Input
 * @selector x-input
 * @decorator component
 */
export const XInputPrefix = 'x-input';

/**
 * Input Property
 */
@Component({ template: '' })
export class XInputProperty extends XControlValueAccessor<any> {
  /**
   * 输入类型
   */
  @Input() type: XInputType = 'text';
  /**
   * 清除按钮
   */
  @Input() @XInputBoolean() clearable: boolean;
  /**
   * 只读
   */
  @Input() @XInputBoolean() readonly: boolean;
  /**
   * 图标
   */
  @Input() icon: string;
  /**
   * 图标布局方式
   */
  @Input() iconLayout: XInputIconLayoutType = 'right';
  /**
   * 图标动画
   */
  @Input() @XInputBoolean() iconSpin: boolean;
  /**
   * 输入最大长度
   */
  @Input() @XInputNumber() maxlength: number;
  /**
   * 尺寸
   */
  @Input() size: XSize = 'medium';
  /**
   * 异常
   */
  @Input() error: boolean;
  /**
   * 异常提示文字
   */
  @Input() errorMessage: string;
  /**
   * 清除按钮的事件
   */
  @Output() clearEmit = new EventEmitter<any>();
}

/**
 * 输入框类型
 * @value "text" 文本
 * @value "password" 密码
 * @value "number" 数字
 */
export type XInputType = 'text' | 'password' | 'number';

/**
 * 图标布局方式，指在输入框中的位置
 * @value "left" 靠左
 * @value "right" 靠右
 */
export type XInputIconLayoutType = 'left' | 'right';
