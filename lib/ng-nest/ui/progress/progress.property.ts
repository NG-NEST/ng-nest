import { Component, input } from '@angular/core';
import { XPropertyFunction, XToNumber, XToCssPixelValue, XToBoolean } from '@ng-nest/ui/core';
import type { XNumber, XBoolean } from '@ng-nest/ui/core';

/**
 * Progress
 * @selector x-progress
 * @decorator component
 */
export const XProgressPrefix = 'x-progress';
const X_PROGRESS_CONFIG_NAME = 'progress';

/**
 * Progress Property
 */
@Component({ selector: `${XProgressPrefix}-property`, template: '' })
export class XProgressProperty extends XPropertyFunction(X_PROGRESS_CONFIG_NAME) {
  /**
   * @zh_CN 进度条类型
   * @en_US Progress bar type
   */
  readonly type = input<XProgressType>('line');
  /**
   * @zh_CN 显示进度 0-100
   * @en_US Show progress 0-100
   */
  readonly percent = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 进度条高度
   * @en_US Height of progress bar
   */
  readonly height = input<string, XNumber>(this.config?.height ?? '1rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 状态
   * @en_US Status
   */
  readonly status = input<XProgressStatus>('normal');
  /**
   * @zh_CN 是否显示百分比文本信息
   * @en_US Whether to display percentage text
   */
  readonly info = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 文本信息宽度
   * @en_US The width of the text information
   */
  readonly infoWidth = input<string, XNumber>('3.5rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 百分比文本是否显示在进度条里面
   * @en_US Whether the percentage text is displayed in the progress bar
   */
  readonly inside = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 自定义百分比文本内容
   * @en_US Custom percentage text content
   */
  readonly format = input<(percent: number) => string>();
  /**
   * @zh_CN 自定义颜色
   * @en_US Custom color
   */
  readonly color = input<XProgressColor>();
  /**
   * @zh_CN 自定义轨道颜色
   * @en_US Custom rail color
   */
  readonly railColor = input<XProgressColor>();
  /**
   * @zh_CN 渐变颜色
   * @en_US Gradient color
   */
  readonly gradient = input<XProgressGradient>();
  /**
   * @zh_CN 步骤进度条
   * @en_US Steps progress bar
   */
  readonly steps = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 单个步骤的宽度
   * @en_US Single step width
   */
  readonly stepWidth = input<string, XNumber>('2rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 单个步骤的宽度自适应
   * @en_US Single step width flex
   */
  readonly stepFlex = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 圆环/仪表盘厚度
   * @en_US Ring thickness
   */
  readonly thickness = input<string, XNumber>('1rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 圆环/仪表盘尺寸
   * @en_US Ring size
   */
  readonly size = input<string, XNumber>('8rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 仪表盘缺口角度 0~300
   * @en_US Dashboard notch angle
   */
  readonly notchAngle = input<number, XNumber>(80, { transform: XToNumber });
  /**
   * @zh_CN 分段显示颜色，只适用 type = 'line'
   * @en_US Segmentation display color, only use of type = 'line'
   */
  readonly subsection = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 进度条类型
 * @en_US Progress bar type
 */
export type XProgressType = 'line' | 'circle' | 'dashboard';

/**
 * @zh_CN 进度条颜色
 * @en_US Progress bar color
 */
export type XProgressColor = string | XProgressColorNode[] | Function;

/**
 * @zh_CN 进度条节点颜色
 * @en_US Progress bar node color
 */
export interface XProgressColorNode {
  /**
   * @zh_CN 颜色
   * @en_US Color
   */
  color: string;
  /**
   * @zh_CN 百分比
   * @en_US Percent
   */
  percent: number;
}
/**
 * @zh_CN 状态
 * @en_US Status
 */
export type XProgressStatus = 'normal' | 'active' | 'success' | 'exception' | 'warning';

/**
 * @zh_CN 渐变颜色
 * @en_US Gradient color
 */
export type XProgressGradient = { direction?: string } & ({ from: string; to: string } | { [percent: string]: string });
