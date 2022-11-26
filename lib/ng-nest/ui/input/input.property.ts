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
import { Input, Output, EventEmitter, Component } from '@angular/core';
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
   * @zh_CN 宽度
   * @en_US width
   */
  @Input() @XInputNumber() width!: XNumber;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 输入框样式
   * @en_US Input Style
   */
  @Input() inputStyle!: { [style: string]: any };
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  @Input() @XInputBoolean() override pointer!: XBoolean;
  /**
   * @zh_CN 初始启用验证，在输入值都自动开启
   * @en_US Initial enable validation, which is automatically enabled when the input value is
   */
  @Input() @XInputBoolean() override validator!: XBoolean;
  /**
   * @zh_CN 输入框内边距，rem。主要指输入框中的左右内边距
   * @en_US Enter the border of the input box, rem.
   */
  @Input() @XInputNumber() @XWithConfig<XNumber>(X_CONFIG_NAME, 0.4) inputPadding!: XNumber;
  /**
   * @zh_CN 输入框内边距(包含图标)，rem。主要指输入框中的有图标的时候左右内边距
   * @en_US Enter the border between the input box (including icon), rem.
   */
  @Input() @XInputNumber() @XWithConfig<XNumber>(X_CONFIG_NAME, 1.8) inputIconPadding!: XNumber;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  @Input() override before!: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  @Input() override after!: XTemplate;
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
  /**
   * @zh_CN Composition
   * @en_US Composition event
   */
  @Output() xComposition = new EventEmitter<any>();
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
   * @zh_CN 宽度
   * @en_US width
   */
  width?: XNumber;
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
  /**
   * @zh_CN 输入验证函数
   * @en_US Input validation function
   */
  inputValidator?: (value: any) => boolean;
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
