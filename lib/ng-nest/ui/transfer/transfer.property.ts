import { XToBoolean } from '@ng-nest/ui/core';
import { TemplateRef, Component, input, model } from '@angular/core';
import { XFormControlFunction } from '@ng-nest/ui/base-form';
import { XTableColumn } from '@ng-nest/ui/table';
import type { XData, XParentIdentityProperty, XBoolean, XQuery, XStyleMap, XTemplate } from '@ng-nest/ui/core';

/**
 * Transfer
 * @selector x-transfer
 * @decorator component
 */
export const XTransferPrefix = 'x-transfer';
const X_TRANSFER_CONFIG_NAME = 'transfer';

/**
 * Transfer Property
 */
@Component({ selector: `${XTransferPrefix}-property`, template: '' })
export class XTransferProperty extends XFormControlFunction(X_TRANSFER_CONFIG_NAME) {
  /**
   * @zh_CN 数据对象
   * @en_US Data object
   */
  readonly data = input<XData<XTransferNode>>([]);
  /**
   * @zh_CN 选择的类型
   * @en_US Type
   */
  readonly type = input<XTransferType>(this.config?.type ?? 'list');
  /**
   * @zh_CN 标题
   * @en_US Title
   * @default ['List', 'Selected']
   */
  readonly titles = input<string[] | null>(this.config?.titles ?? null);
  /**
   * @zh_CN 穿梭框样式，使用方式与 ngStyle 相同
   * @en_US shuttle box style, same as ngStyle
   */
  readonly listStyle = input<XTransferListStyle | null>(this.config?.listStyle ?? null);
  /**
   * @zh_CN 隐藏全选复选框
   * @en_US Hidden check all
   */
  readonly hiddenCheckAll = input<boolean[]>();
  /**
   * @zh_CN 是否能拖动, type
   * @en_US Can drag
   */
  readonly drag = input<boolean, XBoolean>(this.config?.drag ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 是否显示搜索。type 为 'table'，需要设置 tableHeadSearchTpl 和 tableQuery 来配合使用
   * @en_US Whether to display search
   */
  readonly search = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 表格列头搜索自定义模板
   * @en_US table head search custom template
   */
  readonly tableHeadSearchTpl = input<XTemplate[]>();
  /**
   * @zh_CN 行数据自定义模板
   * @en_US Data customization template
   */
  readonly nodeTpl = input<TemplateRef<void>>();
  /**
   * @zh_CN 标题自定义模板
   * @en_US Title custom template
   */
  readonly titleTpl = input<TemplateRef<void>>();
  /**
   * @zh_CN 底部自定义模版
   * @en_US Bottom Custom Template
   */
  readonly footerTpl = input<TemplateRef<void>[]>();
  /**
   * @zh_CN 表格列集合
   * @en_US Table column set
   */
  readonly tableColumns = input<XTableColumn[]>();
  /**
   * @zh_CN 表格页码
   * @en_US Table page number
   */
  readonly tableIndex = model<number>(1);
  /**
   * @zh_CN 表每页数据条数
   * @en_US Number of data items per page
   */
  readonly tableSize = model<number>(10);
  /**
   * @zh_CN 表格查询条件
   * @en_US Number of data items per page
   */
  readonly tableQuery = input<XQuery>({});
  /**
   * @zh_CN 表格数据总条数
   * @en_US Total number of table data
   */
  readonly tableTotal = model<number>(0);
  /**
   * @zh_CN 反选操作
   * @en_US Inverse select
   */
  readonly inverse = input<boolean, XBoolean>(false, { transform: XToBoolean });
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
  footerTpl?: TemplateRef<any>;
  /**
   * @zh_CN 表格列头搜索自定义模板
   * @en_US table head search custom template
   */
  tableHeadSearchTpl?: XTemplate;
}

/**
 * @zh_CN 数据方向
 * @en_US Transfer direction
 */
export type XTransferDirection = 'left' | 'right';

/**
 * @zh_CN 数据类型
 * @en_US Transfer type
 */
export type XTransferType = 'list' | 'tree' | 'table';

/**
 * @zh_CN 穿梭框样式，使用方式与 ngStyle 相同
 * @en_US shuttle box style, same as ngStyle
 */
export type XTransferListStyle = XStyleMap | XStyleMap[];
