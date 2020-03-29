import { XParentIdentityInput } from '@ng-nest/ui/core';

/**
 * Menu 组件名
 * @selector x-menu
 * @decorator component
 */
export const XMenuPrefix = 'x-menu';

/**
 * Menu @Input
 */
export interface XMenuInput {}

export interface XMenuNode extends XParentIdentityInput {
  /**
   * 图标
   */
  icon?: string;
}

export type XMenuLayout = 'row' | 'column';

export type XMenuTrigger = 'hover' | 'click';
