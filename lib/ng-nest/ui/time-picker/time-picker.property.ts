import { XBoolean, XCorner, XInputBoolean, XInputNumber, XNumber, XSize, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';
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
@Component({ template: '' })
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
