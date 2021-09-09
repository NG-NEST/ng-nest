import {
  XInputBoolean,
  XInputNumber,
  XSize,
  XNumber,
  XBoolean,
  XWithConfig,
  XPositionLeftRight,
  XProperty,
  XTemplate
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component, TemplateRef } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Input
 * @selector x-input
 * @decorator component
 */
export const XInputPrefix = 'x-input';
const X_CONFIG_NAME = 'input';

/**
 * Input Property
 */
@Component({ template: '' })
export class XInputProperty extends XControlValueAccessor<any> implements XInputOption {
  /**
   * @zh_CN 输入类型
   * @en_US Input type
   */
  @Input() type?: XInputType = 'text';
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() clearable?: XBoolean;
  /**
   * @zh_CN 只读
   * @en_US Read only
   */
  @Input() @XInputBoolean() readonly: XBoolean = false;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  @Input() icon?: string;
  /**
   * @zh_CN 图标布局方式
   * @en_US Icon layout
   */
  @Input() @XWithConfig<XInputIconLayoutType>(X_CONFIG_NAME, 'right') iconLayout: XInputIconLayoutType = 'right';
  /**
   * @zh_CN 图标动画
   * @en_US Icon animation
   */
  @Input() @XInputBoolean() iconSpin: XBoolean = false;
  /**
   * @zh_CN 输入最大长度
   * @en_US Enter the maximum length
   */
  @Input() @XInputNumber() maxlength!: XNumber;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  @Input() valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  @Input() valueTplContext: any;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  @Input() before!: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  @Input() after!: XTemplate;
  /**
   * @zh_CN 清除按钮的事件
   * @en_US Clear button event
   */
  @Output() clearEmit = new EventEmitter<any>();
  /**
   * @zh_CN 获取焦点的事件
   * @en_US Focus event
   */
  @Output() xFocus = new EventEmitter<any>();
  /**
   * @zh_CN 失去焦点的事件
   * @en_US Blur event
   */
  @Output() xBlur = new EventEmitter<any>();
  /**
   * @zh_CN Input
   * @en_US Input event
   */
  @Output() xInput = new EventEmitter<any>();
  /**
   * @zh_CN Keydown
   * @en_US Keydown event
   */
  @Output() xKeydown = new EventEmitter<any>();
  /**
   * @zh_CN Click
   * @en_US Click event
   */
  @Output() xClick = new EventEmitter<any>();
  /**
   * @zh_CN Mouseenter
   * @en_US Mouseenter event
   */
  @Output() xMouseenter = new EventEmitter<any>();
  /**
   * @zh_CN Mouseleave
   * @en_US Mouseleave event
   */
  @Output() xMouseleave = new EventEmitter<any>();
}

/**
 * Input Option
 * @undocument true
 */
export interface XInputOption extends XFormOption {
  /**
   * @zh_CN 输入类型
   * @en_US Input type
   */
  type?: XInputType;
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
  iconLayout?: XInputIconLayoutType;
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
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: XBoolean;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  before?: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  after?: XTemplate;
  /**
   * @zh_CN 清除按钮的事件
   * @en_US Clear button event
   */
  clearClick?: (value: any) => void;
}

/**
 * @zh_CN 输入框类型
 * @en_US Input box type
 * @value "text" 文本
 * @value "password" 密码
 * @value "number" 数字
 */
export type XInputType = 'text' | 'password' | 'number';

/**
 * @zh_CN 图标布局方式，指在输入框中的位置
 * @en_US Icon layout, refers to the position in the input box
 * @value "left" 靠左
 * @value "right" 靠右
 */
export type XInputIconLayoutType = XPositionLeftRight;

/**
 * Input Group
 * @selector x-input-group
 * @decorator component
 */
export const XInputGroupPrefix = 'x-input-group';
const X_CONFIG_GROUP_NAME = 'inputGroup';

/**
 * Input Group Property
 */
@Component({ template: '' })
export class XInputGroupProperty extends XProperty {
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_GROUP_NAME) size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_GROUP_NAME) bordered!: XBoolean;
  /**
   * @zh_CN 是否使用紧凑模式
   * @en_US Whether to use a compact mode
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_GROUP_NAME) compact!: XBoolean;
}
