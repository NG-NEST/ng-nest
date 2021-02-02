import { XControlValueAccessor, XCorner, XFormOption, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

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
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'HH:mm:ss') format: string;
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
