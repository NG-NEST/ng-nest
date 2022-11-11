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
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XSliderNode> = [];
  /**
   * @zh_CN 滑动动画
   * @en_US Sliding animation
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() animated?: XBoolean;
  /**
   * @zh_CN 当前激活的索引
   * @en_US Currently active index
   */
  @Input() @XInputNumber() activatedIndex: XNumber = 0;
  /**
   * @zh_CN 排列方式
   * @en_US Arrangement
   */
  @Input() layout?: XSliderLayout = 'row';
  /**
   * @zh_CN 对齐方式
   * @en_US Alignment
   */
  @Input() justify?: XJustify = 'start';
  /**
   * @zh_CN 节点文字对齐方式
   * @en_US Node text alignment
   */
  @Input() nodeJustify?: XJustify = 'center';
  /**
   * @zh_CN 节点自定义模板
   * @en_US Node custom template
   */
  @Input() nodeTpl!: TemplateRef<any>;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize;
  /**
   * @zh_CN 节点显示不下的时候显示展开所有的按钮，排列方式为 row 的时候生效
   * @en_US When the node is not displayed, display all the buttons, and the arrangement is effective when the arrangement is row
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() showExpand?: XBoolean;
  /**
   * @zh_CN 展开所有弹框的最大高度
   * @en_US Expand the maximum height of all bomb frames
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '15rem') expandMaxHeight?: string;
  /**
   * @zh_CN 显示描点
   * @en_US Show anchor
   */
  @Input() @XInputBoolean() showAnchor?: XBoolean;
  /**
   * @zh_CN 激活索引变化事件
   * @en_US Activate index change event
   */
  @Output() indexChange = new EventEmitter<number>();
  /**
   * @zh_CN 激活节点改变事件
   * @en_US Activate node change event
   */
  @Output() nodeChange = new EventEmitter<XSliderNode>();
}

/**
 * @zh_CN Slider 数据对象
 * @en_US Slider data object
 */
export interface XSliderNode extends XIdentityProperty {
  /**
   * @zh_CN 标题，支持模板
   * @en_US Title, support template
   */
  label?: XTemplate;
  /**
   * @zh_CN 禁用节点
   * @en_US Node disabled
   */
  disabled?: boolean;
}

/**
 * @zh_CN 布局方式
 * @en_US Layout
 */
export type XSliderLayout = 'row' | 'column';
