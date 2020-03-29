import { XIdentityInput, XData, XPlace } from '@ng-nest/ui/core';
import { XListNode } from '@ng-nest/ui/list';

/**
 * Dropdown 组件名
 * @selector x-dropdown
 * @decorator component
 */
export const XDropdownPrefix = 'x-dropdown';

/**
 * Dropdown @Input
 */
export interface XDropdownInput {}

/**
 * Dropdown 数据对象
 */
export interface XDropdownNode extends XListNode {
  /**
   * 节点数据
   */
  data?: XData<XDropdownNode[]>;
  /**
   * 触发方式
   * @default 'hover'
   */
  trigger?: XDropdownTrigger;
  /**
   * 方向
   * @default 'bottom-start'
   */
  placement?: XPlace;
  /**
   * 禁用
   */
  disabled?: boolean;
}

/**
 * 显示方式
 * @value "hover"
 * @value "click"
 */
export type XDropdownTrigger = 'hover' | 'click';

/**
 * Dropdown Portal 组件名
 * @selector x-dropdown-portal
 * @decorator component
 */
export const XDropdownPortalPrefix = 'x-dropdown-portal';
