import { XToBoolean, XToCssPixelValue, XToNumber } from '@ng-nest/ui/core';
import { Component, input, output } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type { CdkDragStart, CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';
import type { XAlign, XBoolean, XDirection, XJustify, XNumber, XTemplate } from '@ng-nest/ui/core';

/**
 * SliderSelect
 * @selector x-slider-select
 * @decorator component
 */
export const XSliderSelectPrefix = 'x-slider-select';
const X_SLIDER_SELECT_CONFIG_NAME = 'sliderSelect';

/**
 * SliderSelect Property
 */
@Component({ selector: `${XSliderSelectPrefix}-property`, template: '' })
export class XSliderSelectProperty extends XFormControlFunction(X_SLIDER_SELECT_CONFIG_NAME) {
  /**
   * @zh_CN 最小值
   * @en_US Minimum
   */
  readonly min = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  readonly max = input<number, XNumber>(100, { transform: XToNumber });
  /**
   * @zh_CN 步数
   * @en_US Step count
   */
  readonly step = input<number, XNumber>(1, { transform: XToNumber });
  /**
   * @zh_CN 精度，默认根据步数来计算
   * @en_US Precision, calculated based on the number of steps by default
   */
  readonly precision = input<number | undefined, XNumber>(undefined, { transform: XToNumber });
  /**
   * @zh_CN 显示 tooltip 提示
   * @en_US Display Tooltip prompts
   */
  readonly showTooltip = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 反向
   * @en_US Reverse
   */
  readonly reverse = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 垂直
   * @en_US Vertical
   */
  readonly vertical = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 范围
   * @en_US Range
   */
  readonly range = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 自定义滑块
   * @en_US Custom button
   */
  readonly customButton = input<XTemplate>();
  /**
   * @zh_CN 刻度标记，key 为实际数字，在 [min,max] 内，可通过 style 设置样式
   * @en_US Scale marking, key is the actual number, in [min, max], you can set style through style
   */
  readonly marks = input<XSliderSelectMark[]>([]);
  /**
   * @zh_CN 自定义 tooltip
   * @en_US Custom tooltip
   */
  readonly tooltipCustom = input<XTemplate>();
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
   * @zh_CN 开始拖动的事件
   * @en_US Start drag event
   */
  readonly dragStartEmit = output<CdkDragStart>();
  /**
   * @zh_CN 按住移动中的事件
   * @en_US Hold down the moving event
   */
  readonly dragMoveEmit = output<CdkDragMove>();
  /**
   * @zh_CN 移动结束的事件
   * @en_US Mobile end event
   */
  readonly dragEndEmit = output<CdkDragEnd>();
}

/**
 * SliderSelect Option
 */
export interface XSliderSelectOption extends XFormOption {
  /**
   * @zh_CN 最小值
   * @en_US Minimum
   */
  min?: number;
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  max?: number;
  /**
   * @zh_CN 步数
   * @en_US Step count
   */
  step?: number;
  /**
   * @zh_CN 精度，默认根据步数来计算
   * @en_US Precision, calculated based on the number of steps by default
   */
  precision?: number;
  /**
   * @zh_CN 显示 tooltip 提示
   * @en_US Display Tooltip prompts
   */
  showTooltip?: boolean;
  /**
   * @zh_CN 反向
   * @en_US Reverse
   */
  reverse?: boolean;
  /**
   * @zh_CN 垂直
   * @en_US Vertical
   */
  vertical?: boolean;
  /**
   * @zh_CN 范围
   * @en_US Range
   */
  range?: boolean;
  /**
   * @zh_CN 自定义滑块
   * @en_US Custom button
   */
  customButton?: XTemplate;
  /**
   * @zh_CN 刻度标记，key 为实际数字，在 [min,max] 内，可通过 style 设置样式
   * @en_US Scale marking, key is the actual number, in [min, max], you can set style through style
   */
  marks?: XSliderSelectMark[];
  /**
   * @zh_CN 自定义 tooltip
   * @en_US Custom tooltip
   */
  tooltipCustom?: XTemplate;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  label?: string;
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  labelWidth?: string;
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  labelAlign?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  justify?: XJustify;
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  align?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  direction?: XDirection;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  required?: boolean;
  /**
   * @zh_CN 开始拖动的事件
   * @en_US Start drag event
   */
  dragStartEmit?: (start: CdkDragStart) => void;
  /**
   * @zh_CN 按住移动中的事件
   * @en_US Hold down the moving event
   */
  dragMoveEmit?: (move: CdkDragMove) => void;
  /**
   * @zh_CN 移动结束的事件
   * @en_US Mobile end event
   */
  dragEndEmit?: (end: CdkDragEnd) => void;
}

/**
 * @zh_CN 刻度标记
 * @en_US Scale marking
 */
export interface XSliderSelectMark {
  /**
   * @zh_CN 数值
   * @en_US Value
   */
  value: number;
  /**
   * @zh_CN 显示标签
   * @en_US Label
   */
  label: string;
  /**
   * @zh_CN 标签样式
   * @en_US style
   */
  style?: { [style: string]: any };
  /**
   * @zh_CN 实际偏移量（自动计算）
   * @en_US Offset. automatic calculation
   */
  offset?: number;
}
