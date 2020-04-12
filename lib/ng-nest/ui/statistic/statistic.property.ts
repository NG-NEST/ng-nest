import { XTemplate } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter } from '@angular/core';

/**
 * Statistic
 * @selector x-statistic
 * @decorator component
 */
export const XStatisticPrefix = 'x-statistic';

/**
 * Statistic Property
 */
export class XStatisticProperty {
  /**
   * 显示值
   */
  @Input() value?: XTemplate;
  /**
   * 标题
   */
  @Input() label?: XTemplate;
  /**
   * 前缀
   */
  @Input() prefix?: XTemplate;
  /**
   * 后缀
   */
  @Input() suffix?: XTemplate;
  /**
   * 显示值样式
   */
  @Input() valueStyle: { [prop: string]: any } = {};
}

/**
 * Countdown
 * @selector x-countdown
 * @decorator component
 */
export const XCountdownPrefix = 'x-countdown';

/**
 * Countdown Property
 */
export class XCountdownProperty extends XStatisticProperty {
  /**
   * 格式化
   */
  @Input() format: string = 'HH:mm:ss';
  /**
   * 倒计时结束的事件
   */
  @Output() finish = new EventEmitter<void>();
}
