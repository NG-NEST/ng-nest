import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import { Component, input, output, TemplateRef } from '@angular/core';
import { XBoolean, XNumber, XToBoolean, XToNumber } from '@ng-nest/ui/core';

/**
 * Sender
 * @selector x-sender
 * @decorator component
 */
export const XSenderPrefix = 'x-sender';
const X_SENDER_CONFIG_NAME = 'sender';

/**
 * Sender Property
 */
@Component({ selector: `${XSenderPrefix}-property`, template: '' })
export class XSenderProperty extends XFormControlFunction(X_SENDER_CONFIG_NAME) {
  /**
   * @zh_CN 最小的行数
   * @en_US min number of rows
   */
  readonly minRows = input<number, XNumber>(1, { transform: XToNumber });
  /**
   * @zh_CN 最大的行数
   * @en_US max number of rows
   */
  readonly maxRows = input<number, XNumber>(Number.MAX_SAFE_INTEGER, { transform: XToNumber });
  /**
   * @zh_CN 提交加载中
   * @en_US Loading
   */
  readonly loading = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 提交类型
   * @en_US Submit type
   */
  readonly submitType = input<XSenderSubmitType>(this.config?.submitType ?? 'enter');
  /**
   * @zh_CN 提交
   * @en_US Submit
   */
  readonly submit = output<Event>();
  /**
   * @zh_CN 自定义后缀
   * @en_US Custom actions buttons
   */
  readonly suffix = input<TemplateRef<any>>();
  /**
   * @zh_CN 自定义前缀
   * @en_US Custom prefix
   */
  readonly prefix = input<TemplateRef<any>>();
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
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
}

/**
 * Sender Option
 */
export interface XSenderOption extends XFormOption {}

/**
 * @zh_CN 提交类型
 * @en_US Submit type
 */
export type XSenderSubmitType = 'enter' | 'shiftEnter';
