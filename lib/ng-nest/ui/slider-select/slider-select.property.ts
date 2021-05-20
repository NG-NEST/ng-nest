import { XInputNumber, XNumber } from '@ng-nest/ui/core';
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
@Component({ template: '' })
export class XSliderSelectProperty extends XControlValueAccessor<number> implements XSliderSelectOption {
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
  @Input() @XInputNumber() precision: XNumber;
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
