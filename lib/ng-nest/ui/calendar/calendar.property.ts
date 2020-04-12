import { XIdentityProperty, XProperty } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter } from '@angular/core';

/**
 * Calendar
 * @selector x-calendar
 * @decorator component
 */
export const XCalendarPrefix = 'x-calendar';

/**
 * Calendar Property
 */
export class XCalendarProperty extends XProperty {
  /**
   * 事务数据对象
   */
  @Input() data?: XCalendarData;
  /**
   * 显示模式
   */
  @Input() model: XCalendarModel = 'month';
  /**
   * 选择日期变化的事件
   */
  @Output() dateChange = new EventEmitter<Date>();
  /**
   * 日期范围变化的事件
   */
  @Output() rangeChange = new EventEmitter<Date[]>();
}

/**
 * Calendar 数据对象
 */
export interface XCalendarData {
  /**
   * key-value
   * 2020-2-22: [{id:"1",label:"1"}]
   */
  [prop: string]: XCalendarNode[];
}

/**
 * Calendar 数据对象
 */
export interface XCalendarNode extends XIdentityProperty {}

/**
 * 显示模式
 */
export type XCalendarModel = 'month' | 'year';
