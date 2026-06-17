import {
  XBoolean,
  XPlacement,
  XSize,
  XPropertyFunction,
  XToDataArray,
  XDataArray,
  XToBoolean,
  XNumber,
  XToCssPixelValue
} from '@ng-nest/ui/core';
import { XListNode } from '@ng-nest/ui/list';
import { Component, input, output, ElementRef } from '@angular/core';

/**
 * Contextmenu
 * @selector x-contextmenu
 * @decorator component
 */
export const XContextmenuPrefix = 'x-contextmenu';
const X_CONTEXTMENU_CONFIG_NAME = 'contextmenu';

/**
 * Contextmenu Property
 */
@Component({ selector: `${XContextmenuPrefix}-property`, template: '' })
export class XContextmenuProperty extends XPropertyFunction(X_CONTEXTMENU_CONFIG_NAME) {
  /**
   * @zh_CN 触发目标元素
   * @en_US Trigger target element
   */
  readonly target = input<ElementRef | HTMLElement>();
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XContextmenuNode[], XDataArray<XContextmenuNode>>([], { transform: XToDataArray });
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 节点中已经包含子节点数据
   * @en_US The node already contains child node data
   */
  readonly children = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 展示位置
   * @en_US Placement
   */
  readonly placement = input<XPlacement>(this.config?.placement ?? 'bottom-start');
  /**
   * @zh_CN 弹框的宽度
   * @en_US The width of the drop-down box
   */
  readonly portalWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框设置样式名
   * @en_US The style class name of the drop-down box
   */
  readonly portalClass = input<string | string[]>('');
  /**
   * @zh_CN 弹框最大高度
   * @en_US The biggest height of the drop-down box
   */
  readonly portalMaxHeight = input<string, XNumber>(this.config?.portalMaxHeight ?? '18rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 弹框高度，启用虚拟滚动的时候必须设置一个高度
   * @en_US The biggest height of the drop-down box
   */
  readonly portalHeight = input<string, XNumber>('', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  readonly nodeClick = output<XContextmenuNode>();
}

/**
 * @zh_CN Contextmenu 数据对象
 * @en_US Contextmenu data object
 */
export interface XContextmenuNode extends XListNode {}
