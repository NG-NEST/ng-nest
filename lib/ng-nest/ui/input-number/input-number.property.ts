import { XBoolean, XInputBoolean, XInputNumber, XNumber, XSize, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * InputNumber
 * @selector x-input-number
 * @decorator component
 */
export const XInputNumberPrefix = 'x-input-number';

const X_CONFIG_NAME = 'inputNumber';

/**
 * InputNumber Property
 */
@Component({ template: '' })
export class XInputNumberProperty extends XControlValueAccessor<any> implements XInputNumberOption {
  /**
   * @zh_CN 最小值
   * @en_US Minimum
   */
  @Input() @XInputNumber() min: XNumber = Number.MIN_SAFE_INTEGER;
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  @Input() @XInputNumber() max: XNumber = Number.MAX_SAFE_INTEGER;
  /**
   * @zh_CN 步数
   * @en_US Step count
   */
  @Input() @XInputNumber() step: XNumber = 1;
  /**
   * @zh_CN 按住后步进速度
   * @en_US Stepping speed after pressing
   */
  @Input() @XInputNumber() debounce: XNumber = 40;
  /**
   * @zh_CN 精度
   * @en_US Precision
   */
  @Input() @XInputNumber() precision: XNumber = 0;
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
}

/**
 * InputNumber Option
 * @undocument true
 */
export interface XInputNumberOption extends XFormOption {
  /**
   * @zh_CN 最小值
   * @en_US Minimum
   */
  min?: XNumber;
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  max?: XNumber;
  /**
   * @zh_CN 步数
   * @en_US Step count
   */
  step?: XNumber;
  /**
   * @zh_CN 按住后步进速度
   * @en_US Stepping speed after pressing
   */
  debounce?: XNumber;
  /**
   * @zh_CN 精度
   * @en_US Precision
   */
  precision?: XNumber;
}
