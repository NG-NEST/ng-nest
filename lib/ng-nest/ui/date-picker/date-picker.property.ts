import {
  XInputBoolean,
  XProperty,
  XBoolean,
  XCorner,
  XWithConfig,
  XSize,
  XTemplate,
  XDataConvert,
  XData,
  XIdentityProperty
} from '@ng-nest/ui/core';
import { Input, EventEmitter, Output, TemplateRef, Component } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

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
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'yyyy-MM-dd') format?: string;
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() clearable?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XCorner>(X_CONFIG_NAME, 'bottom-start') placement?: XCorner;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 快捷选择按钮，支持今天,昨天,明天
   * @en_US Quick selection button, support today, yesterday, tomorrow
   */
  @Input() @XDataConvert() preset: XData<XDatePickerPreset> = [];
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
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: XBoolean;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  before?: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  after?: XTemplate;
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  nodeClick?: (value: number) => void;
}

/**
 * DateRange
 * @selector x-date-range
 * @decorator component
 */
export const XDateRangePrefix = 'x-date-range';
const X_CONFIG_RANGE_NAME = 'dateRange';

/**
 * DateRange Property
 */
@Component({ template: '' })
export class XDateRangeProperty extends XControlValueAccessor<any> implements XDateRangeOption {
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  @Input() type: XDatePickerType = 'date';
  /**
   * @zh_CN 格式化类型
   * @en_US Format type
   */
  @Input() @XWithConfig<string>(X_CONFIG_RANGE_NAME, 'yyyy-MM-dd') format?: string;
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_RANGE_NAME, true) @XInputBoolean() clearable?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XCorner>(X_CONFIG_RANGE_NAME, 'bottom-start') placement?: XCorner;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_RANGE_NAME, 'medium') override size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_RANGE_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 快捷选择按钮，支持今天,昨天,明天
   * @en_US Quick selection button, support today, yesterday, tomorrow
   */
  @Input() @XDataConvert() preset: XData<XDatePickerPreset> = [];
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  @Output() nodeEmit = new EventEmitter<number[]>();
}

/**
 * DateRange Option
 * @undocument true
 */
export interface XDateRangeOption extends XFormOption {
  /**
   * @zh_CN tab 键控制次序
   * @en_US Tab key control order
   */
  tabindex?: number;
}

/**
 * @zh_CN 快捷选择按钮
 * @en_US Quick selection button
 */
export interface XDatePickerPreset extends XIdentityProperty {
  /**
   * @zh_CN 自定义函数
   * @en_US Custom function
   */
  func: () => Date;
}

/**
 * @zh_CN 日期选择类型
 * @en_US Date selection type
 */
export type XDatePickerType = 'date' | 'month' | 'year' | 'date-time' | 'date-hour' | 'date-minute';

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
 * DateRange Portal
 * @selector x-date-range-portal
 * @decorator component
 */
export const XDateRangePortalPrefix = 'x-date-range-portal';

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
   * @zh_CN 选择类型
   * @en_US Select type
   */
  @Input() type: XDatePickerType = 'date';
  /**
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  @Input() display = new Date();
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  @Input() model?: Date;
  /**
   * @zh_CN 日期显示模板
   * @en_US Date display template
   */
  @Input() dateTemp?: TemplateRef<any>;
  /**
   * @zh_CN 显示切换按钮
   * @en_US Display switch button
   */
  @Input() @XInputBoolean() showHeader: XBoolean = true;
  /**
   * @zh_CN 范围选择
   * @en_US Range picker
   */
  @Input() @XInputBoolean() rangePicker?: XBoolean;
  /**
   * @zh_CN 上一年
   * @en_US Last year
   */
  @Input() @XInputBoolean() lastYearBtn: XBoolean = true;
  /**
   * @zh_CN 上月
   * @en_US Last month
   */
  @Input() @XInputBoolean() lastMonthBtn: XBoolean = true;
  /**
   * @zh_CN 下一年
   * @en_US Next year
   */
  @Input() @XInputBoolean() nextYearBtn: XBoolean = true;
  /**
   * @zh_CN 上月
   * @en_US Next month
   */
  @Input() @XInputBoolean() nextMonthBtn: XBoolean = true;
  /**
   * @zh_CN 范围日期
   * @en_US Range date
   */
  @Input() rangeValue: number[] = [];
  /**
   * @zh_CN 当前选择的是开始/结束日期
   * @en_US The current choice is the start / end date
   */
  @Input() rangeType!: XDatePickerRangType;
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  @Output() typeChange = new EventEmitter<XDatePickerType>();
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
  /**
   * @zh_CN 选年的事件
   * @en_US Year change event
   */
  @Output() yearChange = new EventEmitter<number>();
  /**
   * @zh_CN 选月的事件
   * @en_US Month change event
   */
  @Output() monthChange = new EventEmitter<number>();
  /**
   * @zh_CN 显示日期事件
   * @en_US display date event
   */
  @Output() displayChange = new EventEmitter<Date>();
}

/**
 * @zh_CN 当前选择的是开始/结束日期
 * @en_US The current choice is the start / end date
 */
export type XDatePickerRangType = 'start' | 'end';

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
   * @zh_CN 选择类型
   * @en_US Select type
   */
  @Input() type: XDatePickerType = 'date';
  /**
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  @Input() display: Date = new Date();
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  @Input() model?: Date;
  /**
   * @zh_CN 月份显示模板
   * @en_US Month display template
   */
  @Input() monthTemp?: TemplateRef<any>;
  /**
   * @zh_CN 显示切换按钮
   * @en_US Display switch button
   */
  @Input() @XInputBoolean() showHeader: XBoolean = true;
  /**
   * @zh_CN 选中的事件
   * @en_US Selected event
   */
  @Output() modelChange = new EventEmitter<Date>();
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  @Output() typeChange = new EventEmitter<XDatePickerType>();
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
   * @zh_CN 选择类型
   * @en_US Select type
   */
  @Input() type: XDatePickerType = 'date';
  /**
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  @Input() display: Date = new Date();
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  @Input() model?: Date;
  /**
   * @zh_CN 显示切换按钮
   * @en_US Display switch button
   */
  @Input() @XInputBoolean() showHeader: XBoolean = true;
  /**
   * @zh_CN 选中的事件
   * @en_US Selected event
   */
  @Output() modelChange = new EventEmitter<Date>();
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  @Output() typeChange = new EventEmitter<XDatePickerType>();
  /**
   * @zh_CN 开始年份变化的事件
   * @en_US Start year change event
   */
  @Output() startChange = new EventEmitter<number>();
}
