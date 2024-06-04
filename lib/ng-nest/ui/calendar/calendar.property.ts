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
   * @example
   *
   * ```html
   * <x-calendar [data]="{ '2020-2-22': [{id: '1',label: '1'}], '2020-2-24': [{id: '2, label: '2'}] }"></x-calendar>
   * ```
   *
   */
  readonly data = input<XCalendarData>({});
  /**
   * @zh_CN 显示模式
   * @en_US Display mode
   * @example
   *
   * ```html
   * <x-calendar model="month"></x-calendar>
   * <x-calendar model="year"></x-calendar>
   * ```
   *
   */
  readonly model = input<XCalendarModel>('month');
  /**
   * @zh_CN 显示类型
   * @en_US Display type
   * @example
   *
   * ```html
   * <x-calendar displayType="calendar"></x-calendar>
   * <x-calendar displayType="card"></x-calendar>
   * ```
   *
   */
  readonly displayType = input<XCalendarType>('calendar');
  /**
   * @zh_CN 头部显示模版
   * @en_US Head display template
   * @example
   *
   * ```html
   * <x-calendar [headerLeftTemp]="headerLeftTemp"></x-calendar>
   * <ng-template #headerLeftTemp> custom title </ng-template>
   * ```
   *
   */
  readonly headerLeftTemp = input<TemplateRef<any>>();
  /**
   * @zh_CN 选择日期变化的事件
   * @en_US Select the event of the date change
   * @example
   *
   * ```html
   * <x-calendar (dateChange)="onDateChange($event)"></x-calendar>
   * ```
   *
   * ```typescript
   * ...
   * onDateChange(date: Date) {
   *   console.log(date)
   * }
   * ...
   * ```
   *
   */
  readonly dateChange = output<Date>();
  /**
   * @zh_CN 日期范围变化的事件
   * @en_US Date range change event
   * @example
   *
   * ```html
   * <x-calendar (rangeChange)="onRangeChange($event)"></x-calendar>
   * ```
   *
   * ```typescript
   * ...
   * onRangeChange(dates: Date[]) {
   *   console.log(dates)
   * }
   * ...
   * ```
   *
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
