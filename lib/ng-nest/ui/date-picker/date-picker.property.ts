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
   * @zh_CN 快捷选择按钮，自定义或直接设置今天（today）,昨天（yesterday）,明天（tomorrow）
   * @en_US Quick selection button, support today, yesterday, tomorrow
   */
  @Input() @XDataConvert() preset: XData<XDatePickerPreset> = [];
  /**
   * @zh_CN 页脚
   * @en_US Footer
   */
  @Input() extraFooter?: XTemplate;
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  @Input() disabledDate?: XDatePickerDisabledDate;
  /**
   * @zh_CN 禁用的时间
   * @en_US Disabled time
   */
  @Input() disabledTime?: XDatePickerDisabledTime;
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
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 快捷选择按钮，自定义或直接设置本周（thisWeek）、上周（lastWeek）、下周（nextWeek）、本月（thisMonth）、上一月（lastMonth）、下一月（nextMonth）、本年（thisYear）、去年（lastYear）、明年（nextYear）
   * @en_US Quick selection button, support thisWeek, lastWeek, nextWeek, thisMonth, lastMonth, nextMonth, thisYear, lastYear, nextYear
   */
  @Input() @XDataConvert() preset: XData<XDateRangePreset> = [];
  /**
   * @zh_CN 日期提示信息
   * @en_US Placeholder of date input
   */
  @Input() override placeholder?: string[];
  /**
   * @zh_CN 页脚
   * @en_US Footer
   */
  @Input() extraFooter?: XTemplate;
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  @Input() disabledDate?: XDatePickerDisabledDate;
  /**
   * @zh_CN 禁用的时间
   * @en_US Disabled time
   */
  @Input() disabledTime?: XDatePickerDisabledTime;
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
  /**
   * @zh_CN 日期提示信息
   * @en_US Placeholder of date input
   */
  placeholder?: string[];
}

/**
 * @zh_CN 禁用日期的自定义类型
 * @en_US 禁用日期的自定义类型
 */
export type XDatePickerDisabledDate = (current: Date) => boolean;

/**
 * @zh_CN 禁用时间的自定义类型
 * @en_US 禁用时间的自定义类型
 */
export type XDatePickerDisabledTime = (type?: XDatePickerRangType) => XDatePickerDisabledTimeFn;

/**
 * @zh_CN 禁用时间的自定义函数
 * @en_US 禁用时间的自定义函数
 */
export type XDatePickerDisabledTimeFn = {
  /**
   * @zh_CN 禁用小时的自定义函数
   * @en_US 禁用小时的自定义函数
   */
  disabledHours?: () => number[];
  /**
   * @zh_CN 禁用分钟的自定义函数
   * @en_US 禁用分钟的自定义函数
   */
  disabledMinutes?: () => number[];
  /**
   * @zh_CN 禁用秒的自定义函数
   * @en_US 禁用秒的自定义函数
   */
  disabledSeconds?: () => number[];
};

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
 * @zh_CN 快捷范围选择按钮
 * @en_US Quick range selection button
 */
export interface XDateRangePreset extends XIdentityProperty {
  /**
   * @zh_CN 自定义函数
   * @en_US Custom function
   */
  func: () => Date[];
}

/**
 * @zh_CN 日期选择类型
 * @en_US Date selection type
 */
export type XDatePickerType = 'date' | 'week' | 'month' | 'year' | 'date-time' | 'date-hour' | 'date-minute';

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
  @Input() model?: Date | null;
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
   * @zh_CN 范围 hover 效果
   * @en_US Range hover style
   */
  @Input() @XInputBoolean() rangeHover: XBoolean = true;
  /**
   * @zh_CN 范围日期
   * @en_US Range date
   */
  @Input() rangeValue: (number | null)[] = [];
  /**
   * @zh_CN 当前选择的是开始/结束日期
   * @en_US The current choice is the start / end date
   */
  @Input() rangeType!: XDatePickerRangType;
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  @Input() disabledDate?: XDatePickerDisabledDate;
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
  /**
   * @zh_CN 范围日期 mouseenter 事件
   * @en_US Date mouseenter event
   */
  @Output() rangeTdMouseenter = new EventEmitter<XDateCell>();
  /**
   * @zh_CN 范围日期 mouseleave 事件
   * @en_US Date mouseleave event
   */
  @Output() rangeTdMouseleave = new EventEmitter<XDateCell>();
  /**
   * @zh_CN 范围中的日期点击事件
   * @en_US Range date click event
   */
  @Output() rangeDateClick = new EventEmitter<XDateCell>();
}

/**
 * @zh_CN 单个日期数据对象
 * @en_US 单个日期数据对象
 */
export interface XDateCell {
  /**
   * @zh_CN 日期
   * @en_US Date
   */
  date?: Date;
  /**
   * @zh_CN 上个月或下个月的日期
   * @en_US Date of the previous or next month
   */
  isLastOrNext?: boolean;
  /**
   * @zh_CN 当天
   * @en_US Same day
   */
  isNow?: boolean;
  /**
   * @zh_CN 当月第一天
   * @en_US The first day of the month
   */
  isFirstDay?: boolean;
  /**
   * @zh_CN 当月最后一天
   * @en_US The last day of the month
   */
  isLastDay?: boolean;
  /**
   * @zh_CN 范围内日期
   * @en_US 范围内日期
   */
  isInRange?: boolean;
  /**
   * @zh_CN 范围内 hover 选中
   * @en_US 范围内 hover 选中
   */
  isInRangeHover?: boolean;
  /**
   * @zh_CN 范围内 hover 当前日期左边
   * @en_US 范围内 hover 当前日期左边
   */
  isInRangeHoverLeft?: boolean;
  /**
   * @zh_CN 范围内 hover 当前日期右边
   * @en_US 范围内 hover 当前日期右边
   */
  isInRangeHoverRight?: boolean;
  /**
   * @zh_CN 选中开始左边
   * @en_US Range start left
   */
  isRangeStartLeft?: boolean;
  /**
   * @zh_CN 选中开始右边
   * @en_US Range start right
   */
  isRangeStartRight?: boolean;
  /**
   * @zh_CN 选中结束左边
   * @en_US Range start left
   */
  isRangeEndLeft?: boolean;
  /**
   * @zh_CN 选中结束右边
   * @en_US Range start right
   */
  isRangeEndRight?: boolean;
  /**
   * @zh_CN 范围 hover
   * @en_US Range hover
   */
  isRangeHover?: boolean;
  /**
   * @zh_CN hover 当前开始
   * @en_US Range hover start
   */
  isRangeHoverStart?: boolean;
  /**
   * @zh_CN hover 当前结束
   * @en_US End date
   */
  isRangeHoverEnd?: boolean;
  /**
   * @zh_CN hover 开始左边
   * @en_US Range hover start left
   */
  isRangeHoverStartLeft?: boolean;
  /**
   * @zh_CN hover 开始右边
   * @en_US Range hover start right
   */
  isRangeHoverStartRight?: boolean;
  /**
   * @zh_CN hover 结束左边
   * @en_US Range hover end left
   */
  isRangeHoverEndLeft?: boolean;
  /**
   * @zh_CN hover 结束右边
   * @en_US Range hover end right
   */
  isRangeHoverEndRight?: boolean;
  /**
   * @zh_CN 当前选中日期
   * @en_US Current selected date
   */
  isActive?: boolean;
  /**
   * @zh_CN 禁用日期
   * @en_US Disabled date
   */
  isDisabled?: boolean;
  /**
   * @zh_CN 类型
   * @en_US Type
   */
  type?: 'date' | 'week';
  /**
   * @zh_CN 第几周
   * @en_US Week
   */
  week?: number;
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
  @Input() model?: Date | null;
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
   * @zh_CN 下一年
   * @en_US Next year
   */
  @Input() @XInputBoolean() nextYearBtn: XBoolean = true;
  /**
   * @zh_CN 范围月份
   * @en_US Range date
   */
  @Input() rangeValue: (number | null)[] = [];
  /**
   * @zh_CN 当前选择的是开始/结束日期
   * @en_US The current choice is the start / end date
   */
  @Input() rangeType!: XDatePickerRangType;
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  @Input() disabledDate?: XDatePickerDisabledDate;
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
   * @zh_CN 显示月份事件
   * @en_US display date event
   */
  @Output() displayChange = new EventEmitter<Date>();
  /**
   * @zh_CN 范围月份 mouseenter 事件
   * @en_US Date mouseenter event
   */
  @Output() rangeTdMouseenter = new EventEmitter<XDateCell>();
  /**
   * @zh_CN 范围月份 mouseleave 事件
   * @en_US Date mouseleave event
   */
  @Output() rangeTdMouseleave = new EventEmitter<XDateCell>();
  /**
   * @zh_CN 范围中的月份点击事件
   * @en_US Range date click event
   */
  @Output() rangeDateClick = new EventEmitter<XDateCell>();
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
  @Input() model?: Date | null;
  /**
   * @zh_CN 年份显示模板
   * @en_US Month display template
   */
  @Input() yearTemp?: TemplateRef<any>;
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
   * @zh_CN 下一年
   * @en_US Next year
   */
  @Input() @XInputBoolean() nextYearBtn: XBoolean = true;
  /**
   * @zh_CN 范围年份
   * @en_US Range date
   */
  @Input() rangeValue: (number | null)[] = [];
  /**
   * @zh_CN 当前选择的是开始/结束日期
   * @en_US The current choice is the start / end date
   */
  @Input() rangeType!: XDatePickerRangType;
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  @Input() disabledDate?: XDatePickerDisabledDate;
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
   * @zh_CN 显示月份事件
   * @en_US display date event
   */
  @Output() displayChange = new EventEmitter<Date>();
  /**
   * @zh_CN 范围月份 mouseenter 事件
   * @en_US Date mouseenter event
   */
  @Output() rangeTdMouseenter = new EventEmitter<XDateCell>();
  /**
   * @zh_CN 范围月份 mouseleave 事件
   * @en_US Date mouseleave event
   */
  @Output() rangeTdMouseleave = new EventEmitter<XDateCell>();
  /**
   * @zh_CN 范围中的月份点击事件
   * @en_US Range date click event
   */
  @Output() rangeDateClick = new EventEmitter<XDateCell>();
}
