import { XData, XDataConvert, XInputBoolean, XParentIdentityProperty, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { TemplateRef, Input, Component } from '@angular/core';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';

/**
 * Transfer
 * @selector x-transfer
 * @decorator component
 */
export const XTransferPrefix = 'x-transfer';

const X_CONFIG_NAME = 'transfer';

/**
 * Transfer Property
 */
@Component({ template: '' })
export class XTransferProperty extends XControlValueAccessor<any[]> {
  /**
   * @zh_CN 数据对象
   * @en_US Data object
   */
  @Input() @XDataConvert() data: XData<XTransferNode> = [];
  /**
   * @zh_CN 选择的类型
   * @en_US Type
   */
  @Input() @XWithConfig<XTransferType>(X_CONFIG_NAME, 'list') type!: XTransferType;
  /**
   * @zh_CN 标题
   * @en_US Title
   * @default ['List', 'Selected']
   */
  @Input() @XWithConfig<string[]>(X_CONFIG_NAME) titles!: string[];
  /**
   * @zh_CN 是否能拖动, type 
   * @en_US Can drag
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() drag?: XBoolean;
  /**
   * @zh_CN 是否显示搜索（暂未实现）
   * @en_US Whether to display search (not implemented yet)
   */
  @Input() @XInputBoolean() search?: XBoolean;
  /**
   * @zh_CN 行数据自定义模板
   * @en_US Data customization template
   */
  @Input() nodeTpl?: TemplateRef<void>;
  /**
   * @zh_CN 标题自定义模板
   * @en_US Title custom template
   */
  @Input() titleTpl?: TemplateRef<void>;
}

/**
 * Transfer Node
 */
export interface XTransferNode extends XParentIdentityProperty<XTransferNode> {
  /**
   * @zh_CN checkbox 是否选中
   * @en_US whether checkbox is selected
   */
  checked?: boolean;
  /**
   * @zh_CN 序号
   * @en_US Serial number
   */
  index?: number;
}

/**
 * Transfer Source
 */
export interface XTransferSource {
  /**
   * @zh_CN 标题
   * @en_US Title
   */
  title?: string;
  /**
   * @zh_CN 搜索的数据
   * @en_US Searched data
   */
  searchInput?: string;
  /**
   * @zh_CN 全选
   * @en_US Select all
   */
  checkedAll?: boolean;
  /**
   * @zh_CN 选中的数量
   * @en_US Selected quantity
   */
  checkedCount?: number;
  /**
   * @zh_CN 不确定状态的样式
   * @en_US Uncertain state style
   */
  indeterminate?: boolean;
  /**
   * @zh_CN 列表数据
   * @en_US List data
   */
  list?: XTransferNode[];
  /**
   * @zh_CN 搜索数据，用来还原
   * @en_US Search data to restore
   */
  searchList?: XTransferNode[];
  /**
   * @zh_CN 按钮禁用
   * @en_US Button disabled
   */
  disabledButton?: boolean;
  /**
   * @zh_CN 列表模版
   * @en_US List
   */
  listTpl?: TemplateRef<void>;
}

/**
 * Transfer type
 */
export type XTransferType = 'list' | 'tree' | 'table';
