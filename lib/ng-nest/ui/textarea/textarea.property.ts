import {
  XInputBoolean,
  XInputNumber,
  XSize,
  XNumber,
  XBoolean,
  XWithConfig,
  XPositionLeftRight,
  XDirection,
  XAlign,
  XJustify
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component, TemplateRef } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

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
@Component({ selector: `${XTextareaPrefix}-property`, template: '' })
export class XTextareaProperty extends XControlValueAccessor<any> implements XTextareaOption {
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
  @Input() @XInputNumber() maxlength!: XNumber;
  /**
   * @zh_CN 高度
   * @en_US height
   */
  @Input() height: string = '6rem';
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  @Input() override label?: string = '';
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  @Input() override labelWidth?: string = '';
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  @Input() override labelAlign?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  @Input() override justify?: XJustify = 'start';
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  @Input() override align?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  @Input() override direction?: XDirection = 'column';
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  @Input() override placeholder?: string | string[] = '';
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() override disabled: XBoolean = false;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  @Input() @XInputBoolean() override required: XBoolean = false;
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  @Input() @XInputBoolean() override readonly: XBoolean = false;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  @Input() override valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  @Input() override valueTplContext: any;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  @Input() override pattern?: any;
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  @Input() override message?: string | string[];
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  @Input() @XInputBoolean() override active: XBoolean = false;
  /**
   * @zh_CN 输入框点击样式
   * @en_US Enter box click style
   */
  @Input() @XInputBoolean() override pointer: XBoolean = false;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  @Input() override inputValidator!: (value: any) => boolean;
  /**
   * @zh_CN 激活状态事件
   * @en_US Activation state event
   */
  @Output() override activeChange = new EventEmitter<XBoolean>();
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
