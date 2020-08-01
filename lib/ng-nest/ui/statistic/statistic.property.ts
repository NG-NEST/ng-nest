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
   * @zh_CN 显示值
   * @en_US Display value
   */
  @Input() value?: XTemplate;
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  @Input() label?: XTemplate;
  /**
   * @zh_CN 前缀
   * @en_US Prefix
   */
  @Input() prefix?: XTemplate;
  /**
   * @zh_CN 后缀
   * @en_US Suffix
   */
  @Input() suffix?: XTemplate;
  /**
   * @zh_CN 显示值样式
   * @en_US Display value style
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
   * @zh_CN 格式化
   * @en_US Format
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'HH:mm:ss') format: string;
  /**
   * @zh_CN 倒计时结束的事件
   * @en_US Event at the end of the countdown
   */
  @Output() finish = new EventEmitter<void>();
}
