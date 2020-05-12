import { XControlValueAccessor, XInputBoolean, XProperty, XBoolean, XCorner, XFormOption } from '@ng-nest/ui/core';
import { Input, EventEmitter, Output, TemplateRef, Component } from '@angular/core';

/**
 * DatePicker
 * @selector x-date-picker
 * @decorator component
 */
export const XDatePickerPrefix = 'x-date-picker';

/**
 * DatePicker Property
 */
@Component({ template: '' })
export class XDatePickerProperty extends XControlValueAccessor<any> implements XDatePickerOption {
  /**
   * 选择类型
   */
  @Input() type: XDatePickerType = 'date';
  /**
   * 格式化类型
   */
  @Input() format: string = 'yyyy-MM-dd';
  /**
   * 清除按钮
   */
  @Input() @XInputBoolean() clearable: XBoolean = true;
  /**
   * 展示方位
   */
  @Input() placement: XCorner = 'bottom-start';
  /**
   * 节点点击的事件
   */
  @Output() nodeEmit = new EventEmitter<number>();
}

/**
 * DatePicker Option
 * @undocument true
 */
export interface XDatePickerOption extends XFormOption {
  /**
   * 选择类型
   */
  type?: XDatePickerType;
  /**
   * 格式化类型
   */
  format?: string;
  /**
   * 清除按钮
   */
  clearable?: XBoolean;
  /**
   * 展示方位
   */
  placement?: XCorner;
  /**
   * 节点点击的事件
   */
  nodeClick?: (value: number) => void;
}

/**
 * 日期选择类型
 */
export type XDatePickerType = 'date' | 'month' | 'year';

/**
 * 日期数据类型
 */
export type XDatePickerModelType = 'date' | 'number' | 'string';

/**
 * DatePicker Portal
 * @selector x-date-picker-portal
 * @decorator component
 */
export const XDatePickerPortalPrefix = 'x-date-picker-portal';

/**
 * PickerDate
 * @selector x-picker-date
 * @decorator component
 */
export const XPickerDatePrefix = 'x-picker-date';

/**
 * PickerDate Property
 */
@Component({ template: '' })
export class XPickerDateProperty extends XProperty {
  /**
   * 显示的日期
   */
  @Input() display = new Date();
  /**
   * 选中的日期
   */
  @Input() model: Date;
  /**
   * 日期显示模板
   */
  @Input() dateTemp: TemplateRef<any>;
  /**
   * 选中的事件
   */
  @Output() modelChange = new EventEmitter<Date>();
  /**
   * 范围变化的事件
   */
  @Output() rangeChange = new EventEmitter<Date[]>();
}

/**
 * PickerMonth
 * @selector x-picker-month
 * @decorator component
 */
export const XPickerMonthPrefix = 'x-picker-month';

/**
 * PickerMonth Property
 */
@Component({ template: '' })
export class XPickerMonthProperty extends XProperty {
  /**
   * 显示的日期
   */
  @Input() display = new Date();
  /**
   * 选中的日期
   */
  @Input() model: Date;
  /**
   * 月份显示模板
   */
  @Input() monthTemp: TemplateRef<any>;
  /**
   * 选中的事件
   */
  @Output() modelChange = new EventEmitter<Date>();
  /**
   * 范围变化的事件
   */
  @Output() rangeChange = new EventEmitter<Date[]>();
}

/**
 * PickerYear
 * @selector x-picker-year
 * @decorator component
 */
export const XPickerYearPrefix = 'x-picker-year';

/**
 * PickerYear Property
 */
@Component({ template: '' })
export class XPickerYearProperty extends XProperty {
  /**
   * 显示的日期
   */
  @Input() display = new Date();
  /**
   * 选中的日期
   */
  @Input() model: Date;
  /**
   * 选中的事件
   */
  @Output() modelChange = new EventEmitter<Date>();
  /**
   * 开始年份变化的事件
   */
  @Output() startChange = new EventEmitter<number>();
}
