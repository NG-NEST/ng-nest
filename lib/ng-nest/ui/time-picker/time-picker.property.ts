import {
  XAlign,
  XBoolean,
  XCorner,
  XData,
  XDataConvert,
  XDirection,
  XIdentityProperty,
  XInputBoolean,
  XInputNumber,
  XJustify,
  XNumber,
  XSize,
  XTemplate,
  XWithConfig
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component, TemplateRef } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * TimePicker
 * @selector x-time-picker
 * @decorator component
 */
export const XTimePickerPrefix = 'x-time-picker';
const X_CONFIG_NAME = 'timePicker';

/**
 * TimePicker Property
 */
@Component({ selector: `${XTimePickerPrefix}-property`, template: '' })
export class XTimePickerProperty extends XControlValueAccessor<any> {
  /**
   * @zh_CN 时间类型
   * @en_US Time type
   */
  @Input() type: XTimePickerType = 'time';
  /**
   * @zh_CN 格式化
   * @en_US Format
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'HH:mm:ss') format?: string;
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
   * @zh_CN 使用12小时制
   * @en_US Use 12 hour clock
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) use12Hours!: XBoolean;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 小时选项间隔
   * @en_US Hour option interval
   */
  @Input() @XInputNumber() @XWithConfig<XNumber>(X_CONFIG_NAME, 1) hourStep!: XNumber;
  /**
   * @zh_CN 分钟选项间隔
   * @en_US Minute option interval
   */
  @Input() @XInputNumber() @XWithConfig<XNumber>(X_CONFIG_NAME, 1) minuteStep!: XNumber;
  /**
   * @zh_CN 秒选项间隔
   * @en_US Second option interval
   */
  @Input() @XInputNumber() @XWithConfig<XNumber>(X_CONFIG_NAME, 1) secondStep!: XNumber;
  /**
   * @zh_CN 快捷选择按钮，支持此刻以及自定义
   * @en_US Quick selection button, support now and custom
   */
  @Input() @XDataConvert() preset: XData<XTimePickerPreset> = [];
  /**
   * @zh_CN 禁用的时间
   * @en_US Disabled time
   */
  @Input() disabledTime?: XTimePickerDisabledTime;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  @Input() override label?: string = '';
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  @Input() override labelWidth?: string = '';
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  @Input() override labelAlign?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  @Input() override justify?: XJustify = 'start';
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  @Input() override align?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  @Input() override direction?: XDirection = 'column';
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  @Input() override placeholder?: string | string[] = '';
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() override disabled: XBoolean = false;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  @Input() @XInputBoolean() override required: XBoolean = false;
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  @Input() @XInputBoolean() override readonly: XBoolean = false;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  @Input() override valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  @Input() override valueTplContext: any;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  @Input() override before!: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  @Input() override after!: XTemplate;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  @Input() override pattern?: any;
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  @Input() override message?: string | string[];
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  @Input() @XInputBoolean() override active: XBoolean = false;
  /**
   * @zh_CN 输入框点击样式
   * @en_US Enter box click style
   */
  @Input() @XInputBoolean() override pointer: XBoolean = false;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  @Input() override inputValidator!: (value: any) => boolean;
  /**
   * @zh_CN 激活状态事件
   * @en_US Activation state event
   */
  @Output() override activeChange = new EventEmitter<XBoolean>();
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  @Output() nodeEmit = new EventEmitter<number>();
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
