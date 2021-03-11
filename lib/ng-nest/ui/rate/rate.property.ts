import { XControlValueAccessor, XInputNumber, XNumber, XFormOption, XInputBoolean } from '@ng-nest/ui/core';
import { Input, Component, TemplateRef } from '@angular/core';

/**
 * Rate
 * @selector x-rate
 * @decorator component
 */
export const XRatePrefix = 'x-rate';

/**
 * Rate Property
 */
@Component({ template: '' })
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
  @Input() @XInputBoolean() half: boolean;
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  @Input() customTemp: TemplateRef<void>;
}

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
  half?: boolean;
}
