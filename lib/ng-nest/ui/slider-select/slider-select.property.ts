import { XControlValueAccessor, XInputNumber } from '@ng-nest/ui/core';
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
export class XSliderSelectProperty extends XControlValueAccessor<number> {
  /**
   * 最小值
   */
  @Input() @XInputNumber() min: number = 0;
  /**
   * 最大值
   */
  @Input() @XInputNumber() max: number = 100;
  /**
   * 步数
   */
  @Input() @XInputNumber() step: number = 1;
  /**
   * 精度，默认根据步数来计算
   */
  @Input() @XInputNumber() precision: number;
  /**
   * 开始拖动的事件
   */
  @Output() dragStarted = new EventEmitter<CdkDragStart>();
  /**
   * 按住移动中的事件
   */
  @Output() dragMoved = new EventEmitter<CdkDragMove>();
  /**
   * 移动结束的事件
   */
  @Output() dragEnded = new EventEmitter<CdkDragEnd>();
}
