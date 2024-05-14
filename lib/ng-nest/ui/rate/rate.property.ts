import { XToNumber, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type { XNumber, XBoolean, XTemplate, XDirection, XAlign, XJustify } from '@ng-nest/ui/core';

/**
 * Rate
 * @selector x-rate
 * @decorator component
 */
export const XRatePrefix = 'x-rate';
const X_RATE_CONFIG_NAME = 'rate';

/**
 * Rate Property
 */
@Component({ selector: `${XRatePrefix}-property`, template: '' })
export class XRateProperty extends XFormControlFunction(X_RATE_CONFIG_NAME) {
  /**
   * @zh_CN 评分个数
   * @en_US Number of ratings
   */
  readonly count = input<number, XNumber>(5, { transform: XToNumber });
  /**
   * @zh_CN 半星模式
   * @en_US Number of ratings
   */
  readonly half = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 颜色
   * @en_US Color
   */
  readonly color = input<XRateColor>(this.config?.color ?? '');
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  readonly customTemp = input<TemplateRef<any>>();
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
}

/**
 * @zh_CN 颜色类型
 * @en_US Color type
 */
export type XRateColor = string | { [color: string]: (rate: number) => boolean };

/**
 * Rate Option
 * @undocument true
 */
export interface XRateOption extends XFormOption {
  /**
   * @zh_CN 评分个数
   * @en_US Number of ratings
   */
  count?: XNumber;
  /**
   * @zh_CN 半星模式
   * @en_US Number of ratings
   */
  half?: XBoolean;
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  customTemp?: XTemplate;
}
