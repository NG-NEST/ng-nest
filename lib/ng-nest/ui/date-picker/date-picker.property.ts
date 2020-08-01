import { XControlValueAccessor, XInputBoolean, XProperty, XBoolean, XCorner, XFormOption, XWithConfig } from '@ng-nest/ui/core';
import { Input, EventEmitter, Output, TemplateRef, Component } from '@angular/core';

/**
 * DatePicker
 * @selector x-date-picker
 * @decorator component
 */
export const XDatePickerPrefix = 'x-date-picker';
const X_CONFIG_NAME = 'datePicker';

/**
 * DatePicker Property
 */
@Component({ template: '' })
export class XDatePickerProperty extends XControlValueAccessor<any> implements XDatePickerOption {
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  @Input() type: XDatePickerType = 'date';
  /**
   * @zh_CN 格式化类型
   * @en_US Format type
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'yyyy-MM-dd') format: string;
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() clearable: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XCorner>(X_CONFIG_NAME, 'bottom-start') placement: XCorner;
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  @Output() nodeEmit = new EventEmitter<number>();
}

/**
 * DatePicker Option
 * @undocument true
 */
export interface XDatePickerOption extends XFormOption {
  /**
   * @zh_CN 选择类型
   * @en_US Choose a type
   */
  type?: XDatePickerType;
  /**
   * @zh_CN 格式化类型
   * @en_US Format type
   */
  format?: string;
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  clearable?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XCorner;
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  nodeClick?: (value: number) => void;
}

/**
 * @zh_CN 日期选择类型
 * @en_US Date selection type
 */
export type XDatePickerType = 'date' | 'month' | 'year';

/**
 * @zh_CN 日期数据类型
 * @en_US Date data type
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
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  @Input() display = new Date();
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  @Input() model: Date;
  /**
   * @zh_CN 日期显示模板
   * @en_US Date display template
   */
  @Input() dateTemp: TemplateRef<any>;
  /**
   * @zh_CN 选中的事件
   * @en_US Selected event
   */
  @Output() modelChange = new EventEmitter<Date>();
  /**
   * @zh_CN 范围变化的事件
   * @en_US Scope change event
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
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  @Input() display = new Date();
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  @Input() model: Date;
  /**
   * @zh_CN 月份显示模板
   * @en_US Month display template
   */
  @Input() monthTemp: TemplateRef<any>;
  /**
   * @zh_CN 选中的事件
   * @en_US Selected event
   */
  @Output() modelChange = new EventEmitter<Date>();
  /**
   * @zh_CN 范围变化的事件
   * @en_US Scope change event
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
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  @Input() display = new Date();
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  @Input() model: Date;
  /**
   * @zh_CN 选中的事件
   * @en_US Selected event
   */
  @Output() modelChange = new EventEmitter<Date>();
  /**
   * @zh_CN 开始年份变化的事件
   * @en_US Start year change event
   */
  @Output() startChange = new EventEmitter<number>();
}
