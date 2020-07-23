import {
  XData,
  XTemplate,
  XProperty,
  XIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XInputNumber,
  XJustify,
  XSize,
  XNumber,
  XBoolean,
  XWithConfig
} from '@ng-nest/ui/core';
import { TemplateRef, Input, EventEmitter, Output, Component } from '@angular/core';

/**
 * Slider
 * @selector x-slider
 * @decorator component
 */
export const XSliderPrefix = 'x-slider';
const X_CONFIG_NAME = 'slider';

/**
 * Slider Property
 */
@Component({ template: '' })
export class XSliderProperty extends XProperty {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XSliderNode> = [];
  /**
   * 滑动动画
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() animated: XBoolean;
  /**
   * 当前激活的索引
   */
  @Input() @XInputNumber() activatedIndex: XNumber = 0;
  /**
   * 排列方式
   */
  @Input() layout: XSliderLayout = 'row';
  /**
   * 对齐方式
   */
  @Input() justify: XJustify = 'start';
  /**
   * 节点文字对齐方式
   */
  @Input() nodeJustify: XJustify = 'center';
  /**
   * 节点自定义模板
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * 尺寸
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size: XSize;
  /**
   * 激活索引变化事件
   */
  @Output() indexChange = new EventEmitter<number>();
}

/**
 * Slider 数据对象
 */
export interface XSliderNode extends XIdentityProperty {
  /**
   * 标题，支持模板
   */
  label?: XTemplate;
}

/**
 * 布局方式
 */
export type XSliderLayout = 'row' | 'column';
