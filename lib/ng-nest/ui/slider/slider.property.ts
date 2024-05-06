import { XPropertyFunction, XToDataNew, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import { TemplateRef, Component, input, model, output } from '@angular/core';
import type {
  XTemplate,
  XIdentityProperty,
  XJustify,
  XSize,
  XNumber,
  XBoolean,
  XTrigger,
  XDataNew
} from '@ng-nest/ui/core';

/**
 * Slider
 * @selector x-slider
 * @decorator component
 */
export const XSliderPrefix = 'x-slider';
const X_SLIDER_CONFIG_NAME = 'slider';

/**
 * Slider Property
 */
@Component({ selector: `${XSliderPrefix}-property`, template: '' })
export class XSliderProperty extends XPropertyFunction(X_SLIDER_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XSliderNode[], XDataNew<XSliderNode>>([], { transform: XToDataNew });
  /**
   * @zh_CN 滑动动画
   * @en_US Sliding animation
   */
  readonly animated = input<boolean, XBoolean>(this.config?.animated ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 当前激活的索引
   * @en_US Currently active index
   */
  readonly activatedIndex = model<number>(0);
  /**
   * @zh_CN 触发方式
   * @en_US Trigger mode
   */
  readonly trigger = input<XSliderTrigger>(this.config?.trigger ?? 'click');
  /**
   * @zh_CN 排列方式
   * @en_US Arrangement
   */
  readonly layout = input<XSliderLayout>('row');
  /**
   * @zh_CN 对齐方式
   * @en_US Alignment
   */
  readonly justify = input<XJustify>('start');
  /**
   * @zh_CN 节点文字对齐方式
   * @en_US Node text alignment
   */
  readonly nodeJustify = input<XJustify>('center');
  /**
   * @zh_CN 节点自定义模板
   * @en_US Node custom template
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 节点显示不下的时候显示展开所有的按钮，排列方式为 row 的时候生效
   * @en_US When the node is not displayed, display all the buttons, and the arrangement is effective when the arrangement is row
   */
  readonly showExpand = input<boolean, XBoolean>(this.config?.showExpand ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 节点显示不下的时候显示左右/上下的箭头
   * @en_US Nodes can't show the show about/of the up and down arrow
   */
  readonly autoShowArrow = input<boolean, XBoolean>(this.config?.autoShowArrow ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 展开所有弹框的最大高度
   * @en_US Expand the maximum height of all bomb frames
   */
  readonly expandMaxHeight = input<string, XNumber>(this.config?.expandMaxHeight ?? '15rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 显示描点
   * @en_US Show anchor
   */
  readonly showAnchor = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 激活节点改变事件
   * @en_US Activate node change event
   */
  readonly indexChange = output<number>();
  /**
   * @zh_CN 激活节点改变事件
   * @en_US Activate node change event
   */
  readonly nodeChange = output<XSliderNode>();
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
 * @zh_CN 触发方式
 * @en_US Trigger method
 */
export type XSliderTrigger = XTrigger;

/**
 * @zh_CN 布局方式
 * @en_US Layout
 */
export type XSliderLayout = 'row' | 'column';
