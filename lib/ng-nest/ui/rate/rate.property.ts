import { XInputNumber, XNumber, XInputBoolean, XBoolean, XTemplate, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component, TemplateRef } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Rate
 * @selector x-rate
 * @decorator component
 */
export const XRatePrefix = 'x-rate';
const X_CONFIG_NAME = 'rate';

/**
 * Rate Property
 */
@Component({ selector: `${XRatePrefix}-property`, template: '' })
export class XRateProperty extends XControlValueAccessor<any> implements XRateOption {
  /**
   * @zh_CN 评分个数
   * @en_US Number of ratings
   */
  @Input() @XInputNumber() count: XNumber = 5;
  /**
   * @zh_CN 半星模式
   * @en_US Number of ratings
   */
  @Input() @XInputBoolean() half?: XBoolean;
  /**
   * @zh_CN 颜色
   * @en_US Color
   */
  @Input() @XWithConfig<XRateColor>(X_CONFIG_NAME) color?: XRateColor;
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  @Input() customTemp!: TemplateRef<any>;
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
