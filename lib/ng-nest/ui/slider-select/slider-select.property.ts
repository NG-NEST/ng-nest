import { XBoolean, XInputBoolean, XInputNumber, XNumber, XTemplate } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { CdkDragStart, CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * SliderSelect
 * @selector x-slider-select
 * @decorator component
 */
export const XSliderSelectPrefix = 'x-slider-select';

/**
 * SliderSelect Property
 */
@Component({ selector: `${XSliderSelectPrefix}-property`, template: '' })
export class XSliderSelectProperty
  extends XControlValueAccessor<number | number[]>
  implements XSliderSelectOption
{
  /**
   * @zh_CN 最小值
   * @en_US Minimum
   */
  @Input() @XInputNumber() min: XNumber = 0;
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  @Input() @XInputNumber() max: XNumber = 100;
  /**
   * @zh_CN 步数
   * @en_US Step count
   */
  @Input() @XInputNumber() step: XNumber = 1;
  /**
   * @zh_CN 精度，默认根据步数来计算
   * @en_US Precision, calculated based on the number of steps by default
   */
  @Input() @XInputNumber() precision?: XNumber;
  /**
   * @zh_CN 显示 tooltip 提示
   * @en_US Display Tooltip prompts
   */
  @Input() @XInputBoolean() showTooltip?: XBoolean = true;
  /**
   * @zh_CN 反向
   * @en_US Reverse
   */
  @Input() @XInputBoolean() reverse?: XBoolean;
  /**
   * @zh_CN 垂直
   * @en_US Vertical
   */
  @Input() @XInputBoolean() vertical?: XBoolean;
  /**
   * @zh_CN 范围
   * @en_US Range
   */
  @Input() @XInputBoolean() range?: XBoolean;
  /**
   * @zh_CN 自定义滑块
   * @en_US Custom button
   */
  @Input() customButton?: XTemplate;
  /**
   * @zh_CN 刻度标记，key 为实际数字，在 [min,max] 内，可通过 style 设置样式
   * @en_US Scale marking, key is the actual number, in [min, max], you can set style through style
   */
  @Input() marks: XSliderSelectMark[] = [];
  /**
   * @zh_CN 开始拖动的事件
   * @en_US Start drag event
   */
  @Output() dragStartEmit = new EventEmitter<CdkDragStart>();
  /**
   * @zh_CN 按住移动中的事件
   * @en_US Hold down the moving event
   */
  @Output() dragMoveEmit = new EventEmitter<CdkDragMove>();
  /**
   * @zh_CN 移动结束的事件
   * @en_US Mobile end event
   */
  @Output() dragEndEmit = new EventEmitter<CdkDragEnd>();
}

/**
 * SliderSelect Option
 * @undocument true
 */
export interface XSliderSelectOption extends XFormOption {
  /**
   * @zh_CN 最小值
   * @en_US Minimum
   */
  min?: XNumber;
  /**
   * @zh_CN 最大值
   * @en_US Max
   */
  max?: XNumber;
  /**
   * @zh_CN 步数
   * @en_US Step count
   */
  step?: XNumber;
  /**
   * @zh_CN 精度，默认根据步数来计算
   * @en_US Precision, calculated based on the number of steps by default
   */
  precision?: XNumber;
  /**
   * @zh_CN 开始拖动的事件
   * @en_US Start drag event
   */
  dragStart?: (dragStart: CdkDragStart) => void;
  /**
   * @zh_CN 按住移动中的事件
   * @en_US Hold down the moving event
   */
  dragMove?: (dragMove: CdkDragMove) => void;
  /**
   * @zh_CN 移动结束的事件
   * @en_US Mobile end event
   */
  dragEnd?: (dragEnd: CdkDragEnd) => void;
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
