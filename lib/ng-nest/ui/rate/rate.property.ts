import { XToNumber, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, TemplateRef, input } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type { XNumber, XBoolean, XDirection, XAlign, XJustify } from '@ng-nest/ui/core';

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
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 颜色类型
 * @en_US Color type
 */
export type XRateColor = string | { [color: string]: (rate: number) => boolean };

/**
 * Rate Option
 */
export interface XRateOption extends XFormOption {
  /**
   * @zh_CN 评分个数
   * @en_US Number of ratings
   */
  count?: number;
  /**
   * @zh_CN 半星模式
   * @en_US Number of ratings
   */
  half?: boolean;
  /**
   * @zh_CN 颜色
   * @en_US Color
   */
  color?: XRateColor;
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  customTemp?: TemplateRef<any>;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  label?: string;
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  labelWidth?: string;
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  labelAlign?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  justify?: XJustify;
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  align?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  direction?: XDirection;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  required?: boolean;
}
