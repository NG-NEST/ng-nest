import {
  XBoolean,
  XPlacement,
  XTrigger,
  XSize,
  XPropertyFunction,
  XToDataNew,
  XDataNew,
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
  data = input<XDropdownNode[], XDataNew<XDropdownNode>>([], { transform: XToDataNew });
  /**
   * @zh_CN 触发方式
   * @en_US Trigger method
   */
  trigger = input<XDropdownTrigger>(this.config?.trigger ?? 'hover');
  /**
   * @zh_CN 展示位置
   * @en_US Placement
   */
  placement = input<XPlacement>(this.config?.placement ?? 'bottom-start');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 节点中已经包含子节点数据
   * @en_US The node already contains child node data
   */
  children = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 弹框的最小宽度
   * @en_US Portal min-width
   */
  portalMinWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最大宽度
   * @en_US Portal max-width
   */
  portalMaxWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最小高度
   * @en_US Portal min-height
   */
  portalMinHeight = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最大高度
   * @en_US Portal max-height
   */
  portalMaxHeight = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN hover 延迟触发时间，只有 trigger 为 'hover' 生效
   * @en_US Hover delay trigger time, only trigger is the 'hover'
   */
  hoverDelay = input<number, XNumber>(200, { transform: XToNumber });
  /**
   * @zh_CN 当前激活的菜单
   * @en_US The currently activated menu
   */
  activatedId = model();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  nodeClick = output<XDropdownNode>();
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
