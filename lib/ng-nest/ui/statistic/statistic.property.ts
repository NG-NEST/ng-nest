import { XPropertyFunction } from '@ng-nest/ui/core';
import { Component, input, output } from '@angular/core';
import type { XTemplate, XStyle } from '@ng-nest/ui/core';

/**
 * Statistic
 * @selector x-statistic
 * @decorator component
 */
export const XStatisticPrefix = 'x-statistic';
const X_STATISTIC_CONFIG_NAME = 'statistic';

/**
 * Statistic Property
 */
@Component({ selector: `${XStatisticPrefix}-property`, template: '' })
export class XStatisticProperty extends XPropertyFunction(X_STATISTIC_CONFIG_NAME) {
  /**
   * @zh_CN 显示值
   * @en_US Display value
   */
  readonly value = input<XTemplate>();
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  readonly label = input<XTemplate>();
  /**
   * @zh_CN 前缀
   * @en_US Prefix
   */
  readonly prefix = input<XTemplate>();
  /**
   * @zh_CN 后缀
   * @en_US Suffix
   */
  readonly suffix = input<XTemplate>();
  /**
   * @zh_CN 显示值样式
   * @en_US Display value style
   */
  readonly valueStyle = input<XStyle>({});
}

/**
 * Countdown
 * @selector x-countdown
 * @decorator component
 */
export const XCountdownPrefix = 'x-countdown';
const X_COUNTDOWN_CONFIG_NAME = 'countdown';

/**
 * Countdown Property
 */
@Component({ selector: `${XCountdownPrefix}-property`, template: '' })
export class XCountdownProperty extends XPropertyFunction(X_COUNTDOWN_CONFIG_NAME) {
  /**
   * @zh_CN 显示值
   * @en_US Display value
   */
  readonly value = input<XTemplate>();
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  readonly label = input<XTemplate>();
  /**
   * @zh_CN 前缀
   * @en_US Prefix
   */
  readonly prefix = input<XTemplate>();
  /**
   * @zh_CN 后缀
   * @en_US Suffix
   */
  readonly suffix = input<XTemplate>();
  /**
   * @zh_CN 显示值样式
   * @en_US Display value style
   */
  readonly valueStyle = input<XStyle>({});
  /**
   * @zh_CN 格式化
   * @en_US Format
   */
  readonly format = input<string>(this.config?.format ?? 'HH:mm:ss');
  /**
   * @zh_CN 倒计时结束的事件
   * @en_US Event at the end of the countdown
   */
  readonly finish = output<void>();
}
