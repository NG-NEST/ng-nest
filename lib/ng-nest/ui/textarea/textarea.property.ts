import { XToBoolean, XToNumber, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, output, model } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XSize,
  XNumber,
  XBoolean,
  XPositionLeftRight,
  XDirection,
  XAlign,
  XJustify,
  XTemplate
} from '@ng-nest/ui/core';

/**
 * Textarea
 * @selector x-textarea
 * @decorator component
 */
export const XTextareaPrefix = 'x-textarea';
const X_TEXTAREA_CONFIG_NAME = 'textarea';

/**
 * Textarea Property
 */
@Component({ selector: `${XTextareaPrefix}-property`, template: '' })
export class XTextareaProperty extends XFormControlFunction(X_TEXTAREA_CONFIG_NAME) {
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
  readonly iconLayout = input<XTextareaIconLayoutType>('right');
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
   * @zh_CN 高度
   * @en_US height
   */
  readonly height = input<string, XNumber>('6rem', { transform: XToCssPixelValue });
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
  override readonly pattern = input<RegExp | RegExp[] | any>(null);
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
