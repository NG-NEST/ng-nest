import {
  XAlign,
  XBoolean,
  XDirection,
  XInputBoolean,
  XInputNumber,
  XJustify,
  XNumber,
  XTemplate
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component, TemplateRef } from '@angular/core';
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
export class XSliderSelectProperty extends XControlValueAccessor<number | number[]> implements XSliderSelectOption {
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
   * @zh_CN 自定义 tooltip
   * @en_US Custom tooltip
   */
  @Input() tooltipCustom!: XTemplate;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  @Input() override label?: string = '';
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  @Input() override labelWidth?: string = '';
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  @Input() override labelAlign?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  @Input() override justify?: XJustify = 'start';
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  @Input() override align?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  @Input() override direction?: XDirection = 'column';
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  @Input() override placeholder?: string | string[] = '';
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() override disabled: XBoolean = false;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  @Input() @XInputBoolean() override required: XBoolean = false;
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  @Input() @XInputBoolean() override readonly: XBoolean = false;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  @Input() override valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  @Input() override valueTplContext: any;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  @Input() override before!: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  @Input() override after!: XTemplate;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  @Input() override pattern?: any;
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  @Input() override message?: string | string[];
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  @Input() @XInputBoolean() override active: XBoolean = false;
  /**
   * @zh_CN 输入框点击样式
   * @en_US Enter box click style
   */
  @Input() @XInputBoolean() override pointer: XBoolean = false;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  @Input() override inputValidator!: (value: any) => boolean;
  /**
   * @zh_CN 激活状态事件
   * @en_US Activation state event
   */
  @Output() override activeChange = new EventEmitter<XBoolean>();
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
