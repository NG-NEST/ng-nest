import {
  XData,
  XDataConvert,
  XInputBoolean,
  XParentIdentityProperty,
  XBoolean,
  XWithConfig,
  XQuery,
  XStyleMap,
  XTemplate
} from '@ng-nest/ui/core';
import { TemplateRef, Input, Component } from '@angular/core';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XTableColumn } from '@ng-nest/ui/table';

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
   * @zh_CN 穿梭框样式，使用方式于 ngStyle 相同
   * @en_US shuttle box style, same as ngStyle
   */
  @Input() @XWithConfig<XTransferListStyle>(X_CONFIG_NAME) listStyle!: XTransferListStyle;
  /**
   * @zh_CN 隐藏全选复选框
   * @en_US Hidden check all
   */
  @Input() hiddenCheckAll?: boolean[];
  /**
   * @zh_CN 是否能拖动, type
   * @en_US Can drag
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() drag?: XBoolean;
  /**
   * @zh_CN 是否显示搜索。type 为 'table'，需要设置 tableHeadSearchTpl 和 tableQuery 来配合使用
   * @en_US Whether to display search
   */
  @Input() @XInputBoolean() search?: XBoolean;
  /**
   * @zh_CN 表格列头搜索自定义模板
   * @en_US table head search custom template
   */
  @Input() tableHeadSearchTpl?: XTemplate[];
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
  /**
   * @zh_CN 底部自定义模版
   * @en_US Bottom Custom Template
   */
  @Input() footerTpl?: TemplateRef<void>[];
  /**
   * @zh_CN 表格列集合
   * @en_US Table column set
   */
  @Input() tableColumns?: XTableColumn[];
  /**
   * @zh_CN 表格页码
   * @en_US Table page number
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 1) tableIndex!: number;
  /**
   * @zh_CN 表每页数据条数
   * @en_US Number of data items per page
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 10) tableSize!: number;
  /**
   * @zh_CN 表格查询条件
   * @en_US Number of data items per page
   */
  @Input() tableQuery: XQuery = {};
  /**
   * @zh_CN 表格数据总条数
   * @en_US Total number of table data
   */
  @Input() tableTotal: number = 0;
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
  /**
   * @zh_CN 自定义属性
   * @en_US Custom property
   */
  [property: string]: any;
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
   * @zh_CN 可选择的数据总数
   * @en_US Total number of selectable data
   */
  count?: number;
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
   * @zh_CN 隐藏全选复选框
   * @en_US Hidden check all
   */
  hiddenCheckAll?: boolean;
  /**
   * @zh_CN 列表样式
   * @en_US List style
   */
  listStyle?: XStyleMap;
  /**
   * @zh_CN 数据方向
   * @en_US Data direction
   */
  direction?: XTransferDirection;
  /**
   * @zh_CN 底部自定义模版
   * @en_US Bottom Custom Template
   */
  footerTpl?: TemplateRef<void>;
  /**
   * @zh_CN 表格列头搜索自定义模板
   * @en_US table head search custom template
   */
  tableHeadSearchTpl?: XTemplate;
}

/**
 * Transfer direction
 */
export type XTransferDirection = 'left' | 'right';

/**
 * Transfer type
 */
export type XTransferType = 'list' | 'tree' | 'table';

/**
 * Transfer list style
 */
export type XTransferListStyle = XStyleMap | XStyleMap[];
