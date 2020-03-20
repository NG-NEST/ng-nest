import { XParentIdentityInput, XData } from '@ng-nest/ui/core';

/**
 * List 组件名
 * @selector x-list
 * @decorator component
 */
export const XListPrefix = 'x-list';

/**
 * List @List
 */
export interface XListInput {
  /**
   * 列表数据
   */
  data?: XData<XListNode[]>;
  /**
   * 多选个数
   */
  multiple?: number;
  /**
   * 选中
   */
  checked?: boolean;
  /**
   * 拖动
   */
  drag?: boolean;
}

/**
 * List 数据对象
 */
export interface XListNode extends XParentIdentityInput {
  event?: Event;
}
