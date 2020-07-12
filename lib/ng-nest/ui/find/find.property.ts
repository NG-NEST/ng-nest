import {
  XControlValueAccessor,
  XFormOption,
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

/**
 * Find
 * @selector x-find
 * @decorator component
 */
export const XFindPrefix = 'x-find';

/**
 * Find Property
 */
@Component({ template: '' })
export class XFindProperty extends XControlValueAccessor<any | any[]> implements XFindOption {
  /**
   * 多选
   */
  @Input() @XInputBoolean() multiple: XBoolean = false;
  /**
   * 选中 label 名称字段
   */
  @Input() @XWithConfig<string>('label') columnLabel: string;
  /**
   * 弹框标题
   */
  @Input() @XWithConfig<string>('查找选择') dialogTitle: string;
  /**
   * 弹框宽度
   */
  @Input() dialogWidth: string;
  /**
   * 弹框高度
   */
  @Input() dialogHeight: string;
  /**
   * 弹框显示，隐藏
   */
  @Input() @XInputBoolean() dialogVisible: boolean = false;
  /**
   * 弹框显示，隐藏
   */
  @Output() dialogVisibleChange = new EventEmitter<boolean>();
  /**
   * 按钮居中
   */
  @Input() @XWithConfig<XBoolean>() @XInputBoolean() dialogButtonsCenter: XBoolean;

  /**
   * 表格行数据
   */
  @Input() tableData: XData<XTableRow> = [];
  /**
   * 表格页码
   */
  @Input() @XWithConfig<number>(1) tableIndex: number;
  /**
   * 表每页数据条数
   */
  @Input() @XWithConfig<number>(10) tableSize: number;
  /**
   * 表每页数据条数
   */
  @Input() tableQuery: XQuery = {};
  /**
   * 表格数据总条数
   */
  @Input() tableTotal: number = 0;
  /**
   * 页码变化的事件
   */
  @Output() tableIndexChange = new EventEmitter<number>();
  /**
   * 每页显示条数变化的事件
   */
  @Output() tableSizeChange = new EventEmitter<number>();
  /**
   * 排序点击的事件
   */
  @Output() tableSortChange = new EventEmitter<XSort[]>();
  /**
   * 表格列参数
   */
  @Input() tableColumns: XTableColumn[] = [];
  /**
   * 当前选中行数据
   */
  @Input() tableActivatedRow?: any;
  /**
   * 表格行点击事件
   */
  @Output() tableRowEmit = new EventEmitter<any>();
  /**
   * 表格行点击事件
   */
  @Input() tableCheckedRow: { [prop: string]: any[] } = {};
  /**
   * 是否启用加载 loading
   */
  @Input() @XWithConfig<XBoolean>(false) @XInputBoolean() tableLoading: XBoolean;
  /**
   * 表格开启虚拟滚动
   */
  @Input() @XWithConfig<boolean>(false) @XInputBoolean() tableVirtualScroll: boolean;
  /**
   * 表格 body 数据高度
   */
  @Input() @XInputNumber() tableBodyHeight: number;
  /**
   * 表格超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   */
  @Input() tableMinBufferPx: number = 100;
  /**
   * 表格渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   */
  @Input() tableMaxBufferPx: number = 200;
  /**
   * 表格自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   */
  @Input() @XInputNumber() tableAdaptionHeight: XNumber;
  /**
   * 表格文档高度百分比，弹窗百分比高度用到
   */
  @Input() @XInputNumber() tableDocPercent: XNumber = 1;
  /**
   * 表格行高度，单位 px
   */
  @Input() @XWithConfig<XNumber>(42) @XInputNumber() tableRowHeight: XNumber;
  /**
   * 树节点数据
   */
  @Input() @XDataConvert() treeData: XData<XTreeNode> = [];
  /**
   * 树当前点击选中的节点变化的事件
   */
  @Output() treeActivatedChange = new EventEmitter<XTreeNode>();
  /**
   * 树当前激活的节点 Id
   */
  @Input() treeActivatedId: any;
  /**
   * 树默认展开的层级
   */
  @Input() @XWithConfig<XNumber>(0) @XInputNumber() treeExpandedLevel: XNumber;
  /**
   * 树 checkbox 选中的节点
   */
  @Input() treeChecked: any[] = [];
  /**
   * 树显示多选框
   */
  @Input() @XInputBoolean() treeCheckbox: XBoolean;
  /**
   * 树和表格同时存在的时候，树节点 id 对应表格的属性，用来做表格数据过滤
   */
  @Input() treeTableConnect: any;
}

/**
 * Find Option
 * @undocument true
 */
export interface XFindOption extends XFormOption {
  /**
   * 多选
   */
  multiple?: XBoolean;
  /**
   * 选中 label 名称字段
   */
  columnLabel?: string;
  /**
   * 弹框标题
   */
  dialogTitle?: string;
  /**
   * 弹框宽度
   */
  dialogWidth?: string;
  /**
   * 弹框高度
   */
  dialogHeight?: string;
  /**
   * 弹框显示，隐藏
   */
  dialogVisible?: boolean;
  /**
   * 弹框显示，隐藏
   */
  // dialogVisibleChange = new EventEmitter<boolean>();
  /**
   * 按钮居中
   */
  dialogButtonsCenter?: XBoolean;

  /**
   * 表格行数据
   */
  tableData?: XData<XTableRow>;
  /**
   * 表格页码
   */
  tableIndex?: number;
  /**
   * 表每页数据条数
   */
  tableSize?: number;
  /**
   * 表格数据总条数
   */
  tableTotal?: number;
  /**
   * 页码变化的事件
   */
  // tableIndexChange = new EventEmitter<number>();
  /**
   * 每页显示条数变化的事件
   */
  // tableSizeChange = new EventEmitter<number>();
  /**
   * 排序点击的事件
   */
  // tableSortChange = new EventEmitter<XSort[]>();
  /**
   * 表格列参数
   */
  tableColumns?: XTableColumn[];
  /**
   * 当前选中行数据
   */
  tableActivatedRow?: any;
  /**
   * 表格行点击事件
   */
  // tableRowEmit = new EventEmitter<any>();
  /**
   * 表格行点击事件
   */
  tableCheckedRow?: { [prop: string]: any[] };
  /**
   * 是否启用加载 loading
   */
  tableLoading?: XBoolean;
  /**
   * 表格开启虚拟滚动
   */
  tableVirtualScroll?: boolean;
  /**
   * 表格 body 数据高度
   */
  tableBodyHeight?: number;
  /**
   * 表格超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   */
  tableMinBufferPx?: number;
  /**
   * 表格渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   */
  tableMaxBufferPx?: number;
  /**
   * 表格自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   */
  tableAdaptionHeight?: XNumber;
  /**
   * 表格文档高度百分比，弹窗百分比高度用到
   */
  tableDocPercent?: XNumber;
  /**
   * 表格行高度，单位 px
   */
  tableRowHeight?: XNumber;

  /**
   * 树节点数据
   */
  treeData?: XData<XTreeNode>;
  /**
   * 树当前点击选中的节点变化的事件
   */
  // treeActivatedChange = new EventEmitter<XTreeNode>();
  /**
   * 树当前激活的节点 Id
   */
  treeActivatedId?: any;
  /**
   * 树默认展开的层级
   */
  treeExpandedLevel?: XNumber;
  /**
   * 树 checkbox 选中的节点
   */
  treeChecked?: any[];
  /**
   * 树显示多选框
   */
  treeCheckbox?: XBoolean;
  /**
   * 树和表格同时存在的时候，树节点 id 对应表格的属性，用来做表格数据过滤
   */
  treeTableConnect?: any;
}
