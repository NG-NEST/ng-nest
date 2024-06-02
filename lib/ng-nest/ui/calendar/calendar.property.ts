import { XPropertyFunction } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, output } from '@angular/core';
import type { XIdentityProperty } from '@ng-nest/ui/core';

/**
 * Calendar
 * @selector x-calendar
 * @decorator component
 */
export const XCalendarPrefix = 'x-calendar';
const X_CALENDAR_CONFIG_NAME = 'calendar';

/**
 * Calendar Property
 */
@Component({ selector: `${XCalendarPrefix}-property`, template: '' })
export class XCalendarProperty extends XPropertyFunction(X_CALENDAR_CONFIG_NAME) {
  /**
   * @zh_CN 事务数据对象
   * @en_US Transaction data object
   */
  readonly data = input<XCalendarData>({});
  /**
   * @zh_CN 显示模式
   * @en_US Display mode
   */
  readonly model = input<XCalendarModel>('month');
  /**
   * @zh_CN 显示类型
   * @en_US Display type
   */
  readonly displayType = input<XCalendarType>('calendar');
  /**
   * @zh_CN 头部显示模版
   * @en_US Head display template
   */
  readonly headerLeftTemp = input<TemplateRef<any>>();
  /**
   * @zh_CN 选择日期变化的事件
   * @en_US Select the event of the date change
   */
  readonly dateChange = output<Date>();
  /**
   * @zh_CN 日期范围变化的事件
   * @en_US Date range change event
   */
  readonly rangeChange = output<Date[]>();
}

/**
 * @zh_CN Calendar 数据对象
 * @en_US Calendar data object
 */
export interface XCalendarData {
  /**
   * key-value
   * { "2020-2-22": [{id:"1",label:"1"}] }
   */
  [property: string]: XCalendarNode[];
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

/**
 * @zh_CN 显示类型
 * @en_US Display type
 */
export type XCalendarType = 'calendar' | 'card';
