import { XParentIdentityInput } from '@ng-nest/ui/core';

/**
 * Transfer 组件名
 * @selector x-transfer
 * @decorator component
 */
export const XTransferPrefix = 'x-transfer';

/**
 * Transfer @Input
 */
export interface XTransferInput {}

/**
 * Transfer
 */
export interface XTransferNode extends XParentIdentityInput {
  /**
   * checkbox 选中的值
   */
  checked?: any[];
  /**
   * 序号
   */
  index?: number;
}

export interface XTransferSource {
  /**
   * 标题
   */
  title?: string;
  /**
   * 搜索的数据
   */
  searchInput?: string;
  /**
   * 全选
   */
  checkedAll?: any[];
  /**
   * 选中的数量
   */
  checkedCount?: number;
  /**
   * 不确定状态的样式
   */
  indeterminate?: boolean;
  /**
   * 列表数据
   */
  list?: XTransferNode[];
  /**
   * 搜索数据，用来还原
   */
  searchList?: XTransferNode[];
  /**
   * 按钮禁用
   */
  disabledButton?: boolean;
}
