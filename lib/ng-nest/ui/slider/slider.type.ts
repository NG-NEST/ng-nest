import { XIdentityInput, XData, XTemplate } from '@ng-nest/ui/core';
import { TemplateRef } from '@angular/core';

/**
 * Slider 组件名
 * @selector x-slider
 * @decorator component
 */
export const XSliderPrefix = 'x-slider';

/**
 * Slider @Input
 */
export interface XSliderInput {
  /**
   * 节点数据
   */
  data?: XData<XSliderNode[]>;
  /**
   * 滑动动画
   * @default true
   */
  animated?: boolean;
  /**
   * 当前激活的索引
   * @default 0
   */
  activatedIndex?: number;
  /**
   * 排列方式
   * @default 'row'
   */
  layout?: XSliderLayout;
  /**
   * 节点自定义模板
   */
  nodeTpl?: TemplateRef<any>;
}

/**
 * Slider 数据对象
 */
export interface XSliderNode extends XIdentityInput {
  label?: XTemplate;
}

/**
 * 布局方式
 * @value "row"
 * @value "column"
 */
export type XSliderLayout = 'row' | 'column';
