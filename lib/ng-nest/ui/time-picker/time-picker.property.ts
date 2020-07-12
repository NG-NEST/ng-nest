import { XControlValueAccessor, XCorner, XFormOption, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * TimePicker
 * @selector x-time-picker
 * @decorator component
 */
export const XTimePickerPrefix = 'x-time-picker';

/**
 * TimePicker Property
 */
@Component({ template: '' })
export class XTimePickerProperty extends XControlValueAccessor<any> {
  /**
   * 时间类型
   */
  @Input() type: XTimePickerType = 'time';
  /**
   * 格式化
   */
  @Input() @XWithConfig<string>('HH:mm:ss') format: string;
  /**
   * 展示方位
   */
  @Input() @XWithConfig<XCorner>('bottom-start') placement: XCorner;
  /**
   * 节点点击的事件
   */
  @Output() nodeEmit = new EventEmitter<number>();
}

/**
 * TimePicker Option
 * @undocument true
 */
export interface XTimePickerOption extends XFormOption {
  /**
   * 时间类型
   */
  type?: XTimePickerType;
  /**
   * 格式化
   */
  format?: string;
  /**
   * 展示方位
   */
  placement?: XCorner;
  /**
   * 节点点击的事件
   */
  nodeClick?: (date: number) => void;
}

/**
 * 时间选择
 */
export type XTimePickerType = 'time' | 'hour' | 'minute';

/**
 * TimePicker-Portal
 * @selector x-time-picker-portal
 * @decorator component
 */
export const XTimePickerPortalPrefix = 'x-time-picker-portal';
