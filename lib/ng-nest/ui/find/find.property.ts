import {
  XInputBoolean,
  XBoolean,
  XDataConvert,
  XData,
  XInputNumber,
  XNumber,
  XSort,
  XQuery,
  XWithConfig
} from '@ng-nest/ui/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { XTreeNode } from '@ng-nest/ui/tree';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Find
 * @selector x-find
 * @decorator component
 */
export const XFindPrefix = 'x-find';
const X_CONFIG_NAME = 'find';

/**
 * Find Property
 */
@Component({ template: '' })
export class XFindProperty extends XControlValueAccessor<any | any[]> implements XFindOption {
  /**
   * @zh_CN 多选
   * @en_US Multiple choice
   */
  @Input() @XInputBoolean() multiple: XBoolean = false;
  /**
   * @zh_CN 选中 label 名称字段
   * @en_US Check the label name field
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, 'label') columnLabel: string;
  /**
   * @zh_CN 弹框标题
   * @en_US Bullet title
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '查找选择') dialogTitle: string;
  /**
   * @zh_CN 弹框宽度
   * @en_US Bullet frame width
   */
  @Input() dialogWidth: string;
  /**
   * @zh_CN 弹框高度
   * @en_US Height of bullet frame
   */
  @Input() dialogHeight: string;
  /**
   * @zh_CN 弹框显示，隐藏
   * @en_US Bullet box display, hide
   */
  @Input() @XInputBoolean() dialogVisible: boolean = false;
  /**
   * @zh_CN 弹框显示，隐藏
   * @en_US Bullet box display, hide
   */
  @Output() dialogVisibleChange = new EventEmitter<boolean>();
  /**
   * @zh_CN 按钮居中
   * @en_US Button centered
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() dialogButtonsCenter: XBoolean;

  /**
   * @zh_CN 表格行数据
   * @en_US Table row data
   */
  @Input() tableData: XData<XTableRow> = [];
  /**
   * @zh_CN 表格页码
   * @en_US Table page number
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 1) tableIndex: number;
  /**
   * @zh_CN 表每页数据条数
   * @en_US Number of data items per page
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 10) tableSize: number;
  /**
   * @zh_CN 表每页数据条数
   * @en_US Number of data items per page
   */
  @Input() tableQuery: XQuery = {};
  /**
   * @zh_CN 表格数据总条数
   * @en_US Total number of table data
   */
  @Input() tableTotal: number = 0;
  /**
   * @zh_CN 页码变化的事件
   * @en_US Page number change event
   */
  @Output() tableIndexChange = new EventEmitter<number>();
  /**
   * @zh_CN 每页显示条数变化的事件
   * @en_US Show the number of events on each page
   */
  @Output() tableSizeChange = new EventEmitter<number>();
  /**
   * @zh_CN 排序点击的事件
   * @en_US Sort click events
   */
  @Output() tableSortChange = new EventEmitter<XSort[]>();
  /**
   * @zh_CN 表格列参数
   * @en_US Table column parameters
   */
  @Input() tableColumns: XTableColumn[] = [];
  /**
   * @zh_CN 当前选中行数据
   * @en_US Currently selected row data
   */
  @Input() tableActivatedRow?: any;
  /**
   * @zh_CN 表格行点击事件
   * @en_US Table row click event
   */
  @Output() tableRowEmit = new EventEmitter<any>();
  /**
   * @zh_CN 表格行点击事件
   * @en_US Table row click event
   */
  @Input() tableCheckedRow: { [property: string]: any[] } = {};
  /**
   * @zh_CN 是否启用加载 loading
   * @en_US Whether to enable loading loading
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() tableLoading: XBoolean;
  /**
   * @zh_CN 表格开启虚拟滚动
   * @en_US Table opens virtual scrolling
   */
  @Input() @XWithConfig<boolean>(X_CONFIG_NAME, false) @XInputBoolean() tableVirtualScroll: boolean;
  /**
   * @zh_CN 表格 body 数据高度
   * @en_US Table body data height
   */
  @Input() @XInputNumber() tableBodyHeight: number;
  /**
   * @zh_CN 表格超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US The table exceeds the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  @Input() tableMinBufferPx: number = 100;
  /**
   * @zh_CN 表格渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US The pixels of the new data buffer for the table rendering, corresponding to the parameters in cdk scroll
   */
  @Input() tableMaxBufferPx: number = 200;
  /**
   * @zh_CN 表格自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   * @en_US Table adaptive height, table height is equal to the screen height minus the value set here
   */
  @Input() @XInputNumber() tableAdaptionHeight: XNumber;
  /**
   * @zh_CN 表格文档高度百分比，弹窗百分比高度用到
   * @en_US Table document height percentage, used for pop-up window percentage height
   */
  @Input() @XInputNumber() tableDocPercent: XNumber = 1;
  /**
   * @zh_CN 表格行高度，单位 px
   * @en_US Table row height, unit px
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 42) @XInputNumber() tableRowHeight: number;
  /**
   * @zh_CN 树节点数据
   * @en_US Tree node data
   */
  @Input() @XDataConvert() treeData: XData<XTreeNode> = [];
  /**
   * @zh_CN 树当前点击选中的节点变化的事件
   * @en_US The event of the tree currently clicked on the selected node change
   */
  @Output() treeActivatedChange = new EventEmitter<XTreeNode>();
  /**
   * @zh_CN 树当前激活的节点 Id
   * @en_US Id of the currently active node of the tree
   */
  @Input() treeActivatedId: any;
  /**
   * @zh_CN 树默认展开的层级
   * @en_US The level of the tree expanded by default
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 0) @XInputNumber() treeExpandedLevel: XNumber;
  /**
   * @zh_CN 树 checkbox 选中的节点
   * @en_US Tree checkbox selected node
   */
  @Input() treeChecked: any[] = [];
  /**
   * @zh_CN 树显示多选框
   * @en_US Tree display checkbox
   */
  @Input() @XInputBoolean() treeCheckbox: XBoolean;
  /**
   * @zh_CN 树和表格同时存在的时候，树节点 id 对应表格的属性，用来做表格数据过滤
   * @en_US When the tree and the table exist at the same time, the tree node id corresponds to the attribute of the table, which is used to filter the table data
   */
  @Input() treeTableConnect: any;
}

/**
 * Find Option
 * @undocument true
 */
export interface XFindOption extends XFormOption {
  /**
   * @zh_CN 多选
   * @en_US Multiple select
   */
  multiple?: XBoolean;
  /**
   * @zh_CN 选中 label 名称字段
   * @en_US Check the label name field
   */
  columnLabel?: string;
  /**
   * @zh_CN 弹框标题
   * @en_US Bullet title
   */
  dialogTitle?: string;
  /**
   * @zh_CN 弹框宽度
   * @en_US Bullet frame width
   */
  dialogWidth?: string;
  /**
   * @zh_CN 弹框高度
   * @en_US Height of bullet frame
   */
  dialogHeight?: string;
  /**
   * @zh_CN 弹框显示，隐藏
   * @en_US Bullet box show, hide
   */
  dialogVisible?: boolean;
  /**
   * @zh_CN 弹框显示，隐藏
   * @en_US Bullet box show, hide
   */
  // dialogVisibleChange = new EventEmitter<boolean>();
  /**
   * @zh_CN 按钮居中
   * @en_US Button center
   */
  dialogButtonsCenter?: XBoolean;

  /**
   * @zh_CN 表格行数据
   * @en_US Table row data
   */
  tableData?: XData<XTableRow>;
  /**
   * @zh_CN 表格页码
   * @en_US Table page number
   */
  tableIndex?: number;
  /**
   * @zh_CN 表每页数据条数
   * @en_US Number of data items per page
   */
  tableSize?: number;
  /**
   * @zh_CN 表格数据总条数
   * @en_US Total number of table data
   */
  tableTotal?: number;
  /**
   * @zh_CN 页码变化的事件
   * @en_US Page number change event
   */
  // tableIndexChange = new EventEmitter<number>();
  /**
   * @zh_CN 每页显示条数变化的事件
   * @en_US Show the number of events on each page
   */
  // tableSizeChange = new EventEmitter<number>();
  /**
   * @zh_CN 排序点击的事件
   * @en_US Sort click events
   */
  // tableSortChange = new EventEmitter<XSort[]>();
  /**
   * @zh_CN 表格列参数
   * @en_US Table column parameters
   */
  tableColumns?: XTableColumn[];
  /**
   * @zh_CN 当前选中行数据
   * @en_US Currently selected row data
   */
  tableActivatedRow?: any;
  /**
   * @zh_CN 表格行点击事件
   * @en_US Table row click event
   */
  // tableRowEmit = new EventEmitter<any>();
  /**
   * @zh_CN 表格行点击事件
   * @en_US Table row click event
   */
  tableCheckedRow?: { [property: string]: any[] };
  /**
   * @zh_CN 是否启用加载 loading
   * @en_US Whether to enable loading
   */
  tableLoading?: XBoolean;
  /**
   * @zh_CN 表格开启虚拟滚动
   * @en_US Table opens virtual scrolling
   */
  tableVirtualScroll?: boolean;
  /**
   * @zh_CN 表格 body 数据高度
   * @en_US Table body data height
   */
  tableBodyHeight?: number;
  /**
   * @zh_CN 表格超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US The table exceeds the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  tableMinBufferPx?: number;
  /**
   * @zh_CN 表格渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US The pixels of the new data buffer for the table rendering, corresponding to the parameters in cdk scroll
   */
  tableMaxBufferPx?: number;
  /**
   * @zh_CN 表格自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   * @en_US Table adaptive height, table height is equal to the screen height minus the value set here
   */
  tableAdaptionHeight?: XNumber;
  /**
   * @zh_CN 表格文档高度百分比，弹窗百分比高度用到
   * @en_US Table document height percentage, used for pop-up window percentage height
   */
  tableDocPercent?: XNumber;
  /**
   * @zh_CN 表格行高度，单位 px
   * @en_US Table row height, unit px
   */
  tableRowHeight?: XNumber;

  /**
   * @zh_CN 树节点数据
   * @en_US Tree node data
   */
  treeData?: XData<XTreeNode>;
  /**
   * @zh_CN 树当前点击选中的节点变化的事件
   * @en_US The event of the tree currently clicked on the selected node change
   */
  // treeActivatedChange = new EventEmitter<XTreeNode>();
  /**
   * @zh_CN 树当前激活的节点 Id
   * @en_US Id of the currently active node of the tree
   */
  treeActivatedId?: any;
  /**
   * @zh_CN 树默认展开的层级
   * @en_US The level of the tree expanded by default
   */
  treeExpandedLevel?: XNumber;
  /**
   * @zh_CN 树 checkbox 选中的节点
   * @en_US Tree checkbox selected node
   */
  treeChecked?: any[];
  /**
   * @zh_CN 树显示多选框
   * @en_US Tree display checkbox
   */
  treeCheckbox?: XBoolean;
  /**
   * @zh_CN 树和表格同时存在的时候，树节点 id 对应表格的属性，用来做表格数据过滤
   * @en_US When the tree and the table exist at the same time, the tree node id corresponds to the attribute of the table, which is used to filter the table data
   */
  treeTableConnect?: any;
}
