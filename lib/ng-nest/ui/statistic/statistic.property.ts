import { XTemplate, XStyle, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Statistic
 * @selector x-statistic
 * @decorator component
 */
export const XStatisticPrefix = 'x-statistic';

/**
 * Statistic Property
 */
@Component({ template: '' })
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
  @Input() valueStyle: XStyle = {};
}

/**
 * Countdown
 * @selector x-countdown
 * @decorator component
 */
export const XCountdownPrefix = 'x-countdown';
const X_CONFIG_NAME = 'countdown';

/**
 * Countdown Property
 */
@Component({ template: '' })
export class XCountdownProperty extends XStatisticProperty {
  /**
   * 格式化
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'HH:mm:ss') format: string;
  /**
   * 倒计时结束的事件
   */
  @Output() finish = new EventEmitter<void>();
}
