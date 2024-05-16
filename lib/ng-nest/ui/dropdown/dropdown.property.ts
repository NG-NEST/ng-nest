import {
  XBoolean,
  XPlacement,
  XTrigger,
  XSize,
  XPropertyFunction,
  XToDataArray,
  XDataArray,
  XToBoolean,
  XToCssPixelValue,
  XNumber,
  XToNumber
} from '@ng-nest/ui/core';
import { XListNode } from '@ng-nest/ui/list';
import { Component, input, model, output } from '@angular/core';

/**
 * Dropdown
 * @selector x-dropdown
 * @decorator component
 */
export const XDropdownPrefix = 'x-dropdown';
const X_DROPDOWN_CONFIG_NAME = 'dropdown';

/**
 * Dropdown Property
 */
@Component({ selector: `${XDropdownPrefix}-property`, template: '' })
export class XDropdownProperty extends XPropertyFunction(X_DROPDOWN_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XDropdownNode[], XDataArray<XDropdownNode>>([], { transform: XToDataArray });
  /**
   * @zh_CN 触发方式
   * @en_US Trigger method
   */
  readonly trigger = input<XDropdownTrigger>(this.config?.trigger ?? 'hover');
  /**
   * @zh_CN 展示位置
   * @en_US Placement
   */
  readonly placement = input<XPlacement>(this.config?.placement ?? 'bottom-start');
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
   * @zh_CN 弹框的最小宽度
   * @en_US Portal min-width
   */
  readonly portalMinWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最大宽度
   * @en_US Portal max-width
   */
  readonly portalMaxWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最小高度
   * @en_US Portal min-height
   */
  readonly portalMinHeight = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最大高度
   * @en_US Portal max-height
   */
  readonly portalMaxHeight = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN hover 延迟触发时间，只有 trigger 为 'hover' 生效
   * @en_US Hover delay trigger time, only trigger is the 'hover'
   */
  readonly hoverDelay = input<number, XNumber>(200, { transform: XToNumber });
  /**
   * @zh_CN 当前激活的菜单
   * @en_US The currently activated menu
   */
  readonly activatedId = model<string | number>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  readonly nodeClick = output<XDropdownNode>();
}

/**
 * @zh_CN Dropdown 数据对象
 * @en_US Dropdown data object
 */
export interface XDropdownNode extends XListNode {}

/**
 * @zh_CN 显示方式
 * @en_US Display method
 */
export type XDropdownTrigger = XTrigger;

/**
 * Dropdown Portal
 * @selector x-dropdown-portal
 * @decorator component
 */
export const XDropdownPortalPrefix = 'x-dropdown-portal';
