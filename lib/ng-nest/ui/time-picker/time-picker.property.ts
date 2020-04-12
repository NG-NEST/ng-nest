import { XControlValueAccessor } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter } from '@angular/core';

/**
 * TimePicker
 * @selector x-time-picker
 * @decorator component
 */
export const XTimePickerPrefix = 'x-time-picker';

/**
 * TimePicker Property
 */
export class XTimePickerProperty extends XControlValueAccessor<any> {
  /**
   * 时间类型
   */
  @Input() type: XTimePickerType = 'time';
  /**
   * 格式化
   */
  @Input() format: string = 'HH:mm:ss';
  /**
   * 节点点击的事件
   */
  @Output() nodeClick = new EventEmitter<number>();
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
