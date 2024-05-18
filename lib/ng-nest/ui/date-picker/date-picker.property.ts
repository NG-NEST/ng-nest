import { XProperty, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import { TemplateRef, Component, input, model, output } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XBoolean,
  XCorner,
  XSize,
  XTemplate,
  XData,
  XIdentityProperty,
  XDirection,
  XAlign,
  XJustify,
  XNumber
} from '@ng-nest/ui/core';

/**
 * DatePicker
 * @selector x-date-picker
 * @decorator component
 */
export const XDatePickerPrefix = 'x-date-picker';
const X_DATA_PICKER_CONFIG_NAME = 'datePicker';

/**
 * DatePicker Property
 */
@Component({ selector: `${XDatePickerPrefix}-property`, template: '' })
export class XDatePickerProperty extends XFormControlFunction(X_DATA_PICKER_CONFIG_NAME) {
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  readonly type = input<XDatePickerType>('date');
  /**
   * @zh_CN 格式化类型
   * @en_US Format type
   */
  readonly format = input<string>(this.config?.format ?? 'yyyy-MM-dd');
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  readonly clearable = input<boolean, XBoolean>(this.config?.clearable ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  readonly placement = input<XCorner>(this.config?.placement ?? 'bottom-start');
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 快捷选择按钮，自定义或直接设置今天（today）,昨天（yesterday）,明天（tomorrow）
   * @en_US Quick selection button, support today, yesterday, tomorrow
   */
  readonly preset = input<XData<XDatePickerPreset>>([]);
  /**
   * @zh_CN 页脚
   * @en_US Footer
   */
  readonly extraFooter = input<XTemplate>();
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  readonly disabledDate = input<XDatePickerDisabledDate>();
  /**
   * @zh_CN 禁用的时间
   * @en_US Disabled time
   */
  readonly disabledTime = input<XDatePickerDisabledTime>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  override readonly pointer = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  override readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  override readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  override readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  override readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  override readonly placeholder = input<string | string[]>('');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  override readonly readonly = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  override readonly valueTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  override readonly valueTplContext = input();
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  override readonly before = input<XTemplate>();
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  override readonly after = input<XTemplate>();
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  override readonly pattern = input<RegExp | RegExp[] | any>(null);
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  override readonly message = input<string | string[]>([]);
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  override readonly active = model<boolean>(false);
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  readonly nodeEmit = output<number>();
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
const X_DATA_RANGE_CONFIG_NAME = 'dateRange';

/**
 * DateRange Property
 */
@Component({ selector: `${XDateRangePrefix}-property`, template: '' })
export class XDateRangeProperty extends XFormControlFunction(X_DATA_RANGE_CONFIG_NAME) {
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  readonly type = input<XDatePickerType>('date');
  /**
   * @zh_CN 格式化类型
   * @en_US Format type
   */
  readonly format = input<string>(this.config?.format ?? 'yyyy-MM-dd');
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  readonly clearable = input<boolean, XBoolean>(this.config?.clearable ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  readonly placement = input<XCorner>(this.config?.placement ?? 'bottom-start');
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 快捷选择按钮，自定义或直接设置本周（thisWeek）、上周（lastWeek）、下周（nextWeek）、本月（thisMonth）、上一月（lastMonth）、下一月（nextMonth）、本年（thisYear）、去年（lastYear）、明年（nextYear）
   * @en_US Quick selection button, support thisWeek, lastWeek, nextWeek, thisMonth, lastMonth, nextMonth, thisYear, lastYear, nextYear
   */
  readonly preset = input<XData<XDateRangePreset>>([]);
  /**
   * @zh_CN 页脚
   * @en_US Footer
   */
  readonly extraFooter = input<XTemplate>();
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  readonly disabledDate = input<XDatePickerDisabledDate>();
  /**
   * @zh_CN 禁用的时间
   * @en_US Disabled time
   */
  readonly disabledTime = input<XDatePickerDisabledTime>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  override readonly pointer = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  override readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  override readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  override readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  override readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  override readonly placeholder = input<string | string[]>('');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  override readonly readonly = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  override readonly valueTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  override readonly valueTplContext = input();
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  override readonly before = input<XTemplate>();
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  override readonly after = input<XTemplate>();
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  override readonly pattern = input<RegExp | RegExp[] | any>(null);
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  override readonly message = input<string | string[]>([]);
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  override readonly active = model<boolean>(false);
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  readonly nodeEmit = output<number[]>();
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
 * @en_US Custom type of disabled date
 */
export type XDatePickerDisabledDate = (current: Date) => boolean;

/**
 * @zh_CN 禁用时间的自定义类型
 * @en_US Custom type of disable time
 */
export type XDatePickerDisabledTime = (type?: XDatePickerRangType) => XDatePickerDisabledTimeFn;

/**
 * @zh_CN 禁用时间的自定义函数
 * @en_US Custom function of disable time
 */
export type XDatePickerDisabledTimeFn = {
  /**
   * @zh_CN 禁用小时的自定义函数
   * @en_US Disable hour custom function
   */
  disabledHours?: () => number[];
  /**
   * @zh_CN 禁用分钟的自定义函数
   * @en_US Disable the custom function of the minute
   */
  disabledMinutes?: () => number[];
  /**
   * @zh_CN 禁用秒的自定义函数
   * @en_US Custom function of disable seconds
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
export type XDatePickerType =
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'date-time'
  | 'date-hour'
  | 'date-minute';

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
@Component({ selector: `${XPickerDatePrefix}-property`, template: '' })
export class XPickerDateProperty extends XProperty {
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  readonly type = model<XDatePickerType>('date');
  /**
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  readonly display = model<Date>(new Date());
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  readonly model = model<Date | null>();
  /**
   * @zh_CN 日期显示模板
   * @en_US Date display template
   */
  readonly dateTemp = input<TemplateRef<any>>();
  /**
   * @zh_CN 显示切换按钮
   * @en_US Display switch button
   */
  readonly showHeader = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围选择
   * @en_US Range picker
   */
  readonly rangePicker = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 上一年
   * @en_US Last year
   */
  readonly lastYearBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 上月
   * @en_US Last month
   */
  readonly lastMonthBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 下一年
   * @en_US Next year
   */
  readonly nextYearBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 上月
   * @en_US Next month
   */
  readonly nextMonthBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围 hover 效果
   * @en_US Range hover style
   */
  readonly rangeHover = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围日期
   * @en_US Range date
   */
  readonly rangeValue = input<(number | null)[]>([]);
  /**
   * @zh_CN 当前选择的是开始/结束日期
   * @en_US The current choice is the start / end date
   */
  readonly rangeType = input<XDatePickerRangType>();
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  readonly disabledDate = input<XDatePickerDisabledDate>();
  /**
   * @zh_CN 范围变化的事件
   * @en_US Scope change event
   */
  readonly rangeChange = output<Date[]>();
  /**
   * @zh_CN 选年的事件
   * @en_US Year change event
   */
  readonly yearChange = output<number>();
  /**
   * @zh_CN 选月的事件
   * @en_US Month change event
   */
  readonly monthChange = output<number>();
  /**
   * @zh_CN 范围日期 mouseenter 事件
   * @en_US Date mouseenter event
   */
  readonly rangeTdMouseenter = output<XDateCell>();
  /**
   * @zh_CN 范围日期 mouseleave 事件
   * @en_US Date mouseleave event
   */
  readonly rangeTdMouseleave = output<XDateCell>();
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
  type?: XDatePickerType;
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
@Component({ selector: `${XPickerMonthPrefix}-property`, template: '' })
export class XPickerMonthProperty extends XProperty {
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  readonly type = model<XDatePickerType>('date');
  /**
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  readonly display = model<Date>(new Date());
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  readonly model = model<Date | null>();
  /**
   * @zh_CN 月份显示模板
   * @en_US Month display template
   */
  readonly monthTemp = input<TemplateRef<any>>();
  /**
   * @zh_CN 显示切换按钮
   * @en_US Display switch button
   */
  readonly showHeader = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围选择
   * @en_US Range picker
   */
  readonly rangePicker = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 上一年
   * @en_US Last year
   */
  readonly lastYearBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 下一年
   * @en_US Next year
   */
  readonly nextYearBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围月份
   * @en_US Range date
   */
  readonly rangeValue = input<(number | null)[]>([]);
  /**
   * @zh_CN 当前选择的是开始/结束日期
   * @en_US The current choice is the start / end date
   */
  readonly rangeType = input<XDatePickerRangType>();
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  readonly disabledDate = input<XDatePickerDisabledDate>();
  /**
   * @zh_CN 范围变化的事件
   * @en_US Scope change event
   */
  readonly rangeChange = output<Date[]>();
  /**
   * @zh_CN 选年的事件
   * @en_US Year change event
   */
  readonly yearChange = output<number>();
  /**
   * @zh_CN 选月的事件
   * @en_US Month change event
   */
  readonly monthChange = output<number>();
  /**
   * @zh_CN 范围月份 mouseenter 事件
   * @en_US Date mouseenter event
   */
  readonly rangeTdMouseenter = output<XDateCell>();
  /**
   * @zh_CN 范围月份 mouseleave 事件
   * @en_US Date mouseleave event
   */
  readonly rangeTdMouseleave = output<XDateCell>();
}

/**
 * PickerQuarter
 * @selector x-picker-quarter
 * @decorator component
 */
export const XPickerQuarterPrefix = 'x-picker-quarter';

/**
 * PickerQuarter Property
 */
@Component({ selector: `${XPickerQuarterPrefix}-property`, template: '' })
export class XPickerQuarterProperty extends XProperty {
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  readonly type = model<XDatePickerType>('date');
  /**
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  readonly display = model<Date>(new Date());
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  readonly model = model<Date | null>();
  /**
   * @zh_CN 季度显示模板
   * @en_US Month display template
   */
  readonly quarterTemp = input<TemplateRef<any>>();
  /**
   * @zh_CN 显示切换按钮
   * @en_US Display switch button
   */
  readonly showHeader = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围选择
   * @en_US Range picker
   */
  readonly rangePicker = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 上一年
   * @en_US Last year
   */
  readonly lastYearBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 下一年
   * @en_US Next year
   */
  readonly nextYearBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围月份
   * @en_US Range date
   */
  readonly rangeValue = input<(number | null)[]>([]);
  /**
   * @zh_CN 当前选择的是开始/结束日期
   * @en_US The current choice is the start / end date
   */
  readonly rangeType = input<XDatePickerRangType>();
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  readonly disabledDate = input<XDatePickerDisabledDate>();
  /**
   * @zh_CN 范围变化的事件
   * @en_US Scope change event
   */
  readonly rangeChange = output<Date[]>();
  /**
   * @zh_CN 选年的事件
   * @en_US Year change event
   */
  readonly yearChange = output<number>();
  /**
   * @zh_CN 选月的事件
   * @en_US Month change event
   */
  readonly monthChange = output<number>();
  /**
   * @zh_CN 范围季度 mouseenter 事件
   * @en_US Date mouseenter event
   */
  readonly rangeTdMouseenter = output<XDateCell>();
  /**
   * @zh_CN 范围季度 mouseleave 事件
   * @en_US Date mouseleave event
   */
  readonly rangeTdMouseleave = output<XDateCell>();
}

/**
 * DateQuarter
 * @selector xDateQuarter
 * @decorator pipe
 */
export const XDateQuarterPrefix = 'xDateQuarter';

/**
 * PickerYear
 * @selector x-picker-year
 * @decorator component
 */
export const XPickerYearPrefix = 'x-picker-year';

/**
 * PickerYear Property
 */
@Component({ selector: `${XPickerYearPrefix}-property`, template: '' })
export class XPickerYearProperty extends XProperty {
  /**
   * @zh_CN 选择类型
   * @en_US Select type
   */
  readonly type = model<XDatePickerType>('date');
  /**
   * @zh_CN 显示的日期
   * @en_US Date displayed
   */
  readonly display = model<Date>(new Date());
  /**
   * @zh_CN 选中的日期
   * @en_US Selected date
   */
  readonly model = model<Date | null>();
  /**
   * @zh_CN 年份显示模板
   * @en_US Month display template
   */
  readonly yearTemp = input<TemplateRef<any>>();
  /**
   * @zh_CN 显示切换按钮
   * @en_US Display switch button
   */
  readonly showHeader = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围选择
   * @en_US Range picker
   */
  readonly rangePicker = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 上一年
   * @en_US Last year
   */
  readonly lastYearBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 下一年
   * @en_US Next year
   */
  readonly nextYearBtn = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 范围年份
   * @en_US Range date
   */
  readonly rangeValue = input<(number | null)[]>([]);
  /**
   * @zh_CN 当前选择的是开始/结束日期
   * @en_US The current choice is the start / end date
   */
  readonly rangeType = input<XDatePickerRangType>();
  /**
   * @zh_CN 禁用的日期
   * @en_US Disabled date
   */
  readonly disabledDate = input<XDatePickerDisabledDate>();
  /**
   * @zh_CN 开始年份变化的事件
   * @en_US Start year change event
   */
  readonly startChange = output<number>();
  /**
   * @zh_CN 范围变化的事件
   * @en_US Scope change event
   */
  readonly rangeChange = output<Date[]>();
  /**
   * @zh_CN 选年的事件
   * @en_US Year change event
   */
  readonly yearChange = output<number>();
  /**
   * @zh_CN 选月的事件
   * @en_US Month change event
   */
  readonly monthChange = output<number>();
  /**
   * @zh_CN 范围月份 mouseenter 事件
   * @en_US Date mouseenter event
   */
  readonly rangeTdMouseenter = output<XDateCell>();
  /**
   * @zh_CN 范围月份 mouseleave 事件
   * @en_US Date mouseleave event
   */
  readonly rangeTdMouseleave = output<XDateCell>();
}
