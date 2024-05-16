import { XToBoolean, XToNumber, XToCssPixelValue, XPropertyFunction } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model, output } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XSize,
  XNumber,
  XBoolean,
  XPositionLeftRight,
  XTemplate,
  XAlign,
  XJustify,
  XDirection
} from '@ng-nest/ui/core';

/**
 * Input
 * @selector x-input
 * @decorator component
 */
export const XInputPrefix = 'x-input';
const X_INPUT_CONFIG_NAME = 'input';

/**
 * Input Property
 */
@Component({ selector: `${XInputPrefix}-property`, template: '' })
export class XInputProperty extends XFormControlFunction(X_INPUT_CONFIG_NAME) {
  /**
   * @zh_CN 输入类型
   * @en_US Input type
   */
  readonly type = input<XInputType>('text');
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  readonly clearable = input<boolean, XBoolean>(this.config?.clearable ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  readonly icon = input<string>();
  /**
   * @zh_CN 图标布局方式
   * @en_US Icon layout
   */
  readonly iconLayout = input<XInputIconLayoutType>(this.config?.iconLayout ?? 'right');
  /**
   * @zh_CN 图标动画
   * @en_US Icon animation
   */
  readonly iconSpin = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 输入最大长度
   * @en_US Enter the maximum length
   */
  readonly maxlength = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 最大值
   * @en_US Enter the max
   */
  readonly max = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 最小值
   * @en_US Enter the min
   */
  readonly min = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 宽度
   * @en_US width
   */
  readonly width = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 输入框样式
   * @en_US Input Style
   */
  readonly inputStyle = input<{ [style: string]: any }>();
  /**
   * @zh_CN 输入框内边距。主要指输入框中的左右内边距
   * @en_US Enter the border of the input box.
   */
  readonly inputPadding = input<string, XNumber>(this.config?.inputPadding ?? '0.75rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 输入框内边距(包含图标)。主要指输入框中的有图标的时候左右内边距
   * @en_US Enter the border between the input box (including icon).
   */
  readonly inputIconPadding = input<string, XNumber>(this.config?.inputPadding ?? '2.15rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 初始启用验证，在输入值都自动开启
   * @en_US Initial enable validation, which is automatically enabled when the input value is
   */
  readonly validator = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  override readonly pointer = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  override readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  override readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  override readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  override readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  override readonly placeholder = input<string | string[]>('');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  override readonly readonly = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  override readonly valueTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  override readonly valueTplContext = input();
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  override readonly before = input<XTemplate>();
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  override readonly after = input<XTemplate>();
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  override readonly pattern = input<RegExp | RegExp[] | any>([]);
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  override readonly message = input<string | string[]>([]);
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  override readonly active = model<boolean>(false);
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
  /**
   * @zh_CN 清除按钮的事件
   * @en_US Clear button event
   */
  readonly clearEmit = output<any>();
  /**
   * @zh_CN 获取焦点的事件
   * @en_US Focus event
   */
  readonly xFocus = output<any>();
  /**
   * @zh_CN 失去焦点的事件
   * @en_US Blur event
   */
  readonly xBlur = output<any>();
  /**
   * @zh_CN Input
   * @en_US Input event
   */
  readonly xInput = output<any>();
  /**
   * @zh_CN Keydown
   * @en_US Keydown event
   */
  readonly xKeydown = output<KeyboardEvent>();
  /**
   * @zh_CN Click
   * @en_US Click event
   */
  readonly xClick = output<MouseEvent>();
  /**
   * @zh_CN Mouseenter
   * @en_US Mouseenter event
   */
  readonly xMouseenter = output<MouseEvent>();
  /**
   * @zh_CN Mouseleave
   * @en_US Mouseleave event
   */
  readonly xMouseleave = output<MouseEvent>();
  /**
   * @zh_CN Composition
   * @en_US Composition event
   */
  readonly xComposition = output<any>();
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
const X_INPUT_GROUP_CONFIG_NAME = 'inputGroup';

/**
 * Input Group Property
 */
@Component({ selector: `${XInputGroupPrefix}-property`, template: '' })
export class XInputGroupProperty extends XPropertyFunction(X_INPUT_GROUP_CONFIG_NAME) {
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize | undefined>(this.config?.size);
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 是否使用紧凑模式
   * @en_US Whether to use a compact mode
   */
  readonly compact = input<boolean, XBoolean>(this.config?.compact ?? false, { transform: XToBoolean });
}
