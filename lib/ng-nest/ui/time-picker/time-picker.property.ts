import { XToBoolean, XToCssPixelValue, XToNumber } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model, output } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XAlign,
  XBoolean,
  XCorner,
  XData,
  XDirection,
  XIdentityProperty,
  XJustify,
  XNumber,
  XSize,
  XTemplate
} from '@ng-nest/ui/core';

/**
 * TimePicker
 * @selector x-time-picker
 * @decorator component
 */
export const XTimePickerPrefix = 'x-time-picker';
const X_TIME_PICKER_CONFIG_NAME = 'timePicker';

/**
 * TimePicker Property
 */
@Component({ selector: `${XTimePickerPrefix}-property`, template: '' })
export class XTimePickerProperty extends XFormControlFunction(X_TIME_PICKER_CONFIG_NAME) {
  /**
   * @zh_CN 时间类型
   * @en_US Time type
   */
  readonly type = input<XTimePickerType>('time');
  /**
   * @zh_CN 格式化
   * @en_US Format
   */
  readonly format = input<string>(this.config?.format ?? 'HH:mm:ss');
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  readonly placement = input<XCorner>(this.config?.placement ?? 'bottom-start');
  /**
   * @zh_CN 使用12小时制
   * @en_US Use 12 hour clock
   */
  readonly use12Hours = input<boolean, XBoolean>(this.config?.use12Hours ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 小时选项间隔
   * @en_US Hour option interval
   */
  readonly hourStep = input<number, XNumber>(this.config?.hourStep ?? 1, { transform: XToNumber });
  /**
   * @zh_CN 分钟选项间隔
   * @en_US Minute option interval
   */
  readonly minuteStep = input<number, XNumber>(this.config?.minuteStep ?? 1, { transform: XToNumber });
  /**
   * @zh_CN 秒选项间隔
   * @en_US Second option interval
   */
  readonly secondStep = input<number, XNumber>(this.config?.secondStep ?? 1, { transform: XToNumber });
  /**
   * @zh_CN 快捷选择按钮，支持此刻以及自定义
   * @en_US Quick selection button, support now and custom
   */
  readonly preset = input<XData<XTimePickerPreset>>([]);
  /**
   * @zh_CN 禁用的时间
   * @en_US Disabled time
   */
  readonly disabledTime = input<XTimePickerDisabledTime>();
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
   * @zh_CN 初始启用验证，在输入值都自动开启
   * @en_US Initial enable validation, which is automatically enabled when the input value is
   */
  override readonly validator = input<boolean, XBoolean>(false, { transform: XToBoolean });
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
 * TimePicker Option
 * @undocument true
 */
export interface XTimePickerOption extends XFormOption {
  /**
   * @zh_CN 时间类型
   * @en_US Time type
   */
  type?: XTimePickerType;
  /**
   * @zh_CN 格式化
   * @en_US Format
   */
  format?: string;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XCorner;
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  nodeClick?: (date: number) => void;
}

/**
 * @zh_CN 时间选择
 * @en_US Time selection
 */
export type XTimePickerType = 'time' | 'hour' | 'minute';

/**
 * @zh_CN 快捷选择按钮
 * @en_US Quick selection button
 */
export interface XTimePickerPreset extends XIdentityProperty {
  /**
   * @zh_CN 自定义函数
   * @en_US Custom function
   */
  func: () => Date;
}

/**
 * TimePickerPortal
 * @selector x-time-picker-portal
 * @decorator component
 */
export const XTimePickerPortalPrefix = 'x-time-picker-portal';

/**
 * TimePickerFrame
 * @selector x-time-picker-frame
 * @decorator component
 */
export const XTimePickerFramePrefix = 'x-time-picker-frame';

/**
 * @zh_CN 禁用时间的自定义类型
 * @en_US Disable custom type of time
 */
export type XTimePickerDisabledTime = (param?: any) => XTimePickerDisabledTimeFn;

/**
 * @zh_CN 禁用时间的自定义函数
 * @en_US Disable custom type of time
 */
export type XTimePickerDisabledTimeFn = {
  /**
   * @zh_CN 禁用小时的自定义函数
   * @en_US Disable custom type of hours
   */
  disabledHours?: () => number[];
  /**
   * @zh_CN 禁用分钟的自定义函数
   * @en_US Disable custom type of minutes
   */
  disabledMinutes?: () => number[];
  /**
   * @zh_CN 禁用秒的自定义函数
   * @en_US Disable custom type of seconds
   */
  disabledSeconds?: () => number[];
};
