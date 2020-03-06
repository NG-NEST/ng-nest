import { XTemplate } from '@ng-nest/ui/core';

/**
 * Statistic 组件名
 * @selector x-statistic
 * @decorator component
 */
export const XStatisticPrefix = 'x-statistic';

/**
 * Statistic @Input
 */
export interface XStatisticInput {
  /**
   * 显示值
   */
  value?: XTemplate;
  /**
   * 标题
   */
  label?: XTemplate;
  /**
   * 前缀
   */
  prefix?: XTemplate;
  /**
   * 后缀
   */
  suffix?: XTemplate;
  /**
   * 显示值样式
   */
  valueStyle?: { [prop: string]: any };
}

/**
 * Countdown 组件名
 * @selector x-countdown
 * @decorator component
 */
export const XCountdownPrefix = 'x-countdown';

/**
 * Countdown @Input
 */
export interface XCountdownInput extends XStatisticInput {
  /**
   * 格式化
   * @default "HH:mm:ss"
   */
  format?: string;
}
