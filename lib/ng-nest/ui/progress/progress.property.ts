import { Input, Component } from '@angular/core';
import { XInputNumber, XProperty, XInputBoolean, XNumber, XBoolean } from '@ng-nest/ui/core';

/**
 * Progress
 * @selector x-progress
 * @decorator component
 */
export const XProgressPrefix = 'x-progress';

/**
 * Progress Property
 */
@Component({ template: '' })
export class XProgressProperty extends XProperty {
  /**
   * 显示进度 0-100
   */
  @Input() @XInputNumber() percent: XNumber = 0;
  /**
   * 进度条高度
   */
  @Input() height: string = '0.5rem';
  /**
   * 状态
   */
  @Input() status: XProgressStatus = 'normal';
  /**
   * 是否显示百分比文本
   */
  @Input() @XInputBoolean() info: XBoolean = true;
  /**
   * 百分比文本是否显示在进度条里面
   */
  @Input() @XInputBoolean() inside: XBoolean;
  /**
   * 自定义百分比文本内容
   */
  @Input() format?: Function;
  /**
   * 自定义颜色
   */
  @Input() color?: string | { color: string; percent: number }[] | Function;
}

/**
 * 进度条类型
 */
export type XProgressType = 'line' | 'circle' | 'dashboard';

/**
 * 状态
 */
export type XProgressStatus = 'normal' | 'active' | 'success' | 'exception' | 'warning';
