import { XControlValueAccessor, XInputBoolean, XInputNumber, XSize, XNumber, XBoolean, XFormOption } from '@ng-nest/ui/core';
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
export class XInputProperty extends XControlValueAccessor<any> implements XInputOption {
  /**
   * 输入类型
   */
  @Input() type: XInputType = 'text';
  /**
   * 清除按钮
   */
  @Input() @XInputBoolean() clearable: XBoolean = false;
  /**
   * 只读
   */
  @Input() @XInputBoolean() readonly: XBoolean = false;
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
  @Input() @XInputBoolean() iconSpin: XBoolean = false;
  /**
   * 输入最大长度
   */
  @Input() @XInputNumber() maxlength: XNumber = 0;
  /**
   * 清除按钮的事件
   */
  @Output() clearEmit = new EventEmitter<any>();
}

/**
 * Input Option
 * @undocument true
 */
export interface XInputOption extends XFormOption {
  /**
   * 输入类型
   */
  type?: XInputType;
  /**
   * 清除按钮
   */
  clearable?: XBoolean;
  /**
   * 只读
   */
  readonly?: XBoolean;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 图标布局方式
   */
  iconLayout?: XInputIconLayoutType;
  /**
   * 图标动画
   */
  iconSpin?: XBoolean;
  /**
   * 输入最大长度
   */
  maxlength?: XNumber;
  /**
   * 尺寸
   */
  size?: XSize;
  /**
   * 清除按钮的事件
   */
  clearClick?: (value: any) => void;
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
