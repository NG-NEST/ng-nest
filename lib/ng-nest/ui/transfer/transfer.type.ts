import { XParentIdentityInput, XData } from '@ng-nest/ui/core';
import { TemplateRef } from '@angular/core';

/**
 * Transfer 组件名
 * @selector x-transfer
 * @decorator component
 */
export const XTransferPrefix = 'x-transfer';

/**
 * Transfer @Input
 */
export interface XTransferInput {
  /**
   * 数据对象
   */
  data: XData<XTransferNode[]>;
  /**
   * 标题
   * @default ['列表 1', '列表 2']
   */
  titles: string[];
  /**
   * 是否能拖动
   */
  drag?: boolean;
  /**
   * 是否显示搜索
   */
  search?: boolean;
  /**
   * 数据自定义模板
   */
  nodeTpl?: TemplateRef<any>;
  /**
   * 标题自定义模板
   */
  titleTpl?: TemplateRef<any>;
}

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
