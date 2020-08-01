import { XIdentityProperty, XProperty } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Calendar
 * @selector x-calendar
 * @decorator component
 */
export const XCalendarPrefix = 'x-calendar';

/**
 * Calendar Property
 */
@Component({ template: '' })
export class XCalendarProperty extends XProperty {
  /**
   * @zh_CN 事务数据对象
   * @en_US Transaction data object
   */
  @Input() data: XCalendarData;
  /**
   * @zh_CN 显示模式
   * @en_US Display mode
   */
  @Input() model: XCalendarModel = 'month';
  /**
   * @zh_CN 选择日期变化的事件
   * @en_US Select the event of the date change
   */
  @Output() dateChange = new EventEmitter<Date>();
  /**
   * @zh_CN 日期范围变化的事件
   * @en_US Date range change event
   */
  @Output() rangeChange = new EventEmitter<Date[]>();
}

/**
 * @zh_CN Calendar 数据对象
 * @en_US Calendar data object
 */
export interface XCalendarData {
  /**
   * key-value
   * 2020-2-22: [{id:"1",label:"1"}]
   */
  [prop: string]: XCalendarNode[];
}

/**
 * @zh_CN Calendar 数据对象
 * @en_US Calendar data object
 */
export interface XCalendarNode extends XIdentityProperty {}

/**
 * @zh_CN 显示模式
 * @en_US Display mode
 */
export type XCalendarModel = 'month' | 'year';
