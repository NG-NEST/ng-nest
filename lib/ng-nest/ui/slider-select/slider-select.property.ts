import { XControlValueAccessor, XInputNumber, XNumber, XFormOption } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { CdkDragStart, CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';

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
   * 最小值
   */
  @Input() @XInputNumber() min: XNumber = 0;
  /**
   * 最大值
   */
  @Input() @XInputNumber() max: XNumber = 100;
  /**
   * 步数
   */
  @Input() @XInputNumber() step: XNumber = 1;
  /**
   * 精度，默认根据步数来计算
   */
  @Input() @XInputNumber() precision: XNumber;
  /**
   * 开始拖动的事件
   */
  @Output() dragStartEmit = new EventEmitter<CdkDragStart>();
  /**
   * 按住移动中的事件
   */
  @Output() dragMoveEmit = new EventEmitter<CdkDragMove>();
  /**
   * 移动结束的事件
   */
  @Output() dragEndEmit = new EventEmitter<CdkDragEnd>();
}

/**
 * SliderSelect Option
 * @undocument true
 */
export interface XSliderSelectOption extends XFormOption {
  /**
   * 最小值
   */
  min?: XNumber;
  /**
   * 最大值
   */
  max?: XNumber;
  /**
   * 步数
   */
  step?: XNumber;
  /**
   * 精度，默认根据步数来计算
   */
  precision?: XNumber;
  /**
   * 开始拖动的事件
   */
  dragStart?: (dragStart: CdkDragStart) => void;
  /**
   * 按住移动中的事件
   */
  dragMove?: (dragMove: CdkDragMove) => void;
  /**
   * 移动结束的事件
   */
  dragEnd?: (dragEnd: CdkDragEnd) => void;
}
