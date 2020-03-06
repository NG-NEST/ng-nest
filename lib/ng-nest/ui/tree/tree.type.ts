import { XParentIdentityInput } from '@ng-nest/ui/core';

/**
 * Tree 组件名
 * @selector x-tree
 * @decorator component
 */
export const XTreePrefix = 'x-tree';

/**
 * Tree @Input
 */
export interface XTreeInput {}

/**
 * Timeline 数据对象
 */
export interface XTreeNode extends XParentIdentityInput {
  /**
   * 子节点
   */
  children?: XTreeNode[];
  /**
   * 展开
   */
  open?: boolean;
  /**
   * 激活的
   */
  activated?: boolean;
  /**
   * 检查更新
   */
  change?: Function;
  /**
   * 子节点已加载过
   */
  childrenLoaded?: boolean;
  /**
   * checkbox 选中的值
   */
  checked?: any[];
  /**
   * 禁用checkbox
   */
  disabled?: boolean;
  /**
   * checkbox 子节点是否有选中的状态
   */
  indeterminate?: boolean;
}

/**
 * TreeNode 组件名
 * @selector x-tree-node
 * @decorator directive
 */
export const XTreeNodePrefix = 'x-tree-node';
