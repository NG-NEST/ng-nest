import {
  XControlValueAccessor,
  XInputBoolean,
  XInputNumber,
  XSize,
  XNumber,
  XBoolean,
  XFormOption,
  XWithConfig,
  XPositionLeftRight
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Textarea
 * @selector x-textarea
 * @decorator component
 */
export const XTextareaPrefix = 'x-textarea';
const X_CONFIG_NAME = 'textarea';

/**
 * Textarea Property
 */
@Component({ template: '' })
export class XTextareaProperty extends XControlValueAccessor<any> implements XTextareaOption {
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() clearable: XBoolean;
  /**
   * @zh_CN 只读
   * @en_US Read only
   */
  @Input() @XInputBoolean() readonly: XBoolean = false;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  @Input() icon: string;
  /**
   * @zh_CN 图标布局方式
   * @en_US Icon layout
   */
  @Input() @XWithConfig<XTextareaIconLayoutType>(X_CONFIG_NAME, 'right') iconLayout: XTextareaIconLayoutType = 'right';
  /**
   * @zh_CN 图标动画
   * @en_US Icon animation
   */
  @Input() @XInputBoolean() iconSpin: XBoolean = false;
  /**
   * @zh_CN 输入最大长度
   * @en_US Enter the maximum length
   */
  @Input() @XInputNumber() maxlength: XNumber = 0;
  /**
   * @zh_CN 高度
   * @en_US height
   */
  @Input() height: string = '4rem';
  /**
   * @zh_CN 清除按钮的事件
   * @en_US Clear button event
   */
  @Output() clearEmit = new EventEmitter<any>();
}

/**
 * Textarea Option
 * @undocument true
 */
export interface XTextareaOption extends XFormOption {
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  clearable?: XBoolean;
  /**
   * @zh_CN 只读
   * @en_US Read only
   */
  readonly?: XBoolean;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 图标布局方式
   * @en_US Icon layout
   */
  iconLayout?: XTextareaIconLayoutType;
  /**
   * @zh_CN 图标动画
   * @en_US Icon animation
   */
  iconSpin?: XBoolean;
  /**
   * @zh_CN 输入最大长度
   * @en_US Enter the maximum length
   */
  maxlength?: XNumber;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 清除按钮的事件
   * @en_US Clear button event
   */
  clearClick?: (value: any) => void;
}

/**
 * @zh_CN 图标布局方式，指在输入框中的位置
 * @en_US Icon layout, refers to the position in the input box
 * @value "left" 靠左
 * @value "right" 靠右
 */
export type XTextareaIconLayoutType = XPositionLeftRight;
