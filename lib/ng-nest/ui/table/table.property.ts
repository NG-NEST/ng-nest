import {
  XProperty,
  XNumber,
  XInputNumber,
  XIdentityProperty,
  XId,
  XSort,
  XInputBoolean,
  XBoolean,
  XData,
  XWithConfig
} from '@ng-nest/ui/core';
import { Input, Component, EventEmitter, TemplateRef, Output } from '@angular/core';
import { XPaginationProperty, XPaginationOption } from '@ng-nest/ui/pagination';

/**
 * Table
 * @selector x-table
 * @decorator component
 */
export const XTablePrefix = 'x-table';

/**
 * Table Property
 */
@Component({ template: '' })
export class XTableProperty extends XPaginationProperty implements XTableOption {
  /**
   * 行数据
   */
  @Input() data: XData<XTableRow> = [];
  /**
   * 列集合
   */
  @Input() columns: XTableColumn[] = [];
  /**
   * 表头和行高，单位 px
   */
  @Input() @XWithConfig<number>(42) @XInputNumber() rowHeight: number;
  /**
   * 是否启用加载 loading
   */
  @Input() @XWithConfig<XBoolean>(false) @XInputBoolean() loading: XBoolean;
  /**
   * 当前选中行数据
   */
  @Input() activatedRow?: XTableRow;
  /**
   * 当前选中行改变
   */
  @Output() activatedRowChange = new EventEmitter<XTableRow>();
  /**
   * 列头自定义模板
   */
  @Input() headColumnTpl: XTableTemplate = {};
  /**
   * 列内容自定义模板
   */
  @Input() bodyColumnTpl: XTableTemplate = {};
  /**
   * 排序点击的事件
   */
  @Output() sortChange = new EventEmitter<XSort[]>();
  /**
   * 允许行点击选中
   */
  @Input() @XWithConfig<XBoolean>(true) @XInputBoolean() allowSelectRow: XBoolean;
  /**
   * 开启虚拟滚动
   */
  @Input() @XWithConfig<XBoolean>() @XInputBoolean() virtualScroll: XBoolean;
  /**
   * body 数据高度
   */
  @Input() @XInputNumber() bodyHeight: number;
  /**
   * 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   */
  @Input() minBufferPx: number = 100;
  /**
   * 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   */
  @Input() maxBufferPx: number = 200;
  /**
   * 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   */
  @Input() @XInputNumber() adaptionHeight: XNumber;
  /**
   * 文档高度百分比，弹窗百分比高度用到
   */
  @Input() @XInputNumber() docPercent: XNumber = 1;
  /**
   * checkbox 列初始选中的数据，列中激活 checkbox
   */
  @Input() checkedRow: { [prop: string]: any[] } = {};
  /**
   * 如果 data 是函数类型，可以通过此参数控制请求，常用于弹框中的表格，弹出后再请求
   */
  @Input() @XInputBoolean() manual: XBoolean = true;
  /**
   * 参数控制请求改变事件
   */
  @Output() manualChange = new EventEmitter<boolean>();
}

/**
 * Table Option
 * @undocument true
 */
export interface XTableOption extends XPaginationOption {
  /**
   * 行数据
   */
  data?: XData<XTableRow>;
  /**
   * 列集合
   */
  columns?: XTableColumn[];
  /**
   * 表头和行高，单位 px
   */
  rowHeight?: number;
  /**
   * 是否启用加载 loading
   */
  loading?: XBoolean;
  /**
   * 当前选中行数据
   */
  activatedRow?: XTableRow;
  /**
   * 列头自定义模板
   */
  headColumnTpl?: XTableTemplate;
  /**
   * 列内容自定义模板
   */
  bodyColumnTpl?: XTableTemplate;
  /**
   * 开启虚拟滚动
   */
  virtualScroll?: XBoolean;
  /**
   * body 数据高度
   */
  bodyHeight?: number;
  /**
   * 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   */
  minBufferPx?: number;
  /**
   * 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   */
  maxBufferPx?: number;
  /**
   * 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   */
  adaptionHeight?: XNumber;
  /**
   * 文档高度百分比，弹窗百分比高度用到
   */
  docPercent?: XNumber;
}

/**
 * 数据
 */
export interface XTableRow extends XId {
  /**
   * 自定义属性
   */
  [property: string]: any;
}

/**
 * 列参数
 */
export interface XTableColumn extends XIdentityProperty {
  type?: XColumnType;
  /**
   * 宽度
   */
  width?: number;
  /**
   * flex 布局宽度
   */
  flex?: number;
  /**
   * 查询字段
   */
  search?: boolean;
  /**
   * 排序字段
   */
  sort?: boolean;
  /**
   * 固定列，距离左边的距离
   */
  left?: number;
  /**
   * 操作按钮
   */
  action?: boolean;
  /**
   * type 为 checkbox 时绑定行点击选中事件
   */
  rowChecked?: boolean;
  /**
   * 自定义属性
   */
  [prop: string]: any;
}

/**
 * 列类型
 */
export type XColumnType = 'label' | 'index' | 'checkbox';

/**
 * 模板
 */
export type XTableTemplate = { [property: string]: TemplateRef<any> };

/**
 * Table Head
 * @selector x-table-head
 * @decorator component
 */
export const XTableHeadPrefix = 'x-table-head';

/**
 * Table Head Property
 */
@Component({ template: '' })
export class XTableHeadProperty extends XProperty {
  /**
   * 列集合
   */
  @Input() columns: XTableColumn[] = [];
  /**
   * 高度，单位 px
   */
  @Input() @XInputNumber() rowHeight: XNumber = 42;
  /**
   * 自定义模板
   */
  @Input() columnTpl: XTableTemplate = {};
  /**
   * 竖向滚动条宽度
   */
  @Input() scrollYWidth: number;
  /**
   * 横向滚动条宽度
   */
  @Input() scrollXWidth: number | null;
}

/**
 * Table Body
 * @selector x-table-body
 * @decorator component
 */
export const XTableBodyPrefix = 'x-table-body';

/**
 * Table Body Property
 */
@Component({ template: '' })
export class XTableBodyProperty extends XProperty {
  /**
   * 行数据
   */
  @Input() data: XTableRow[] = [];
  /**
   * 列集合
   */
  @Input() columns: XTableColumn[] = [];
  /**
   * 自定义模板
   */
  @Input() columnTpl: XTableTemplate = {};
  /**
   * 当前选中行数据
   */
  @Input() activatedRow?: XTableRow;
  /**
   * 当前选中行改变
   */
  @Output() activatedRowChange = new EventEmitter<XTableRow>();
  /**
   * 高度，单位 px
   */
  @Input() @XInputNumber() rowHeight: XNumber = 42;
  /**
   * body 数据高度
   */
  @Input() @XInputNumber() bodyHeight: number;
  /**
   * 允许行点击选中
   */
  @Input() @XInputBoolean() allowSelectRow: XBoolean = true;
  /**
   * 开启虚拟滚动
   */
  @Input() @XInputBoolean() virtualScroll: boolean = false;
  /**
   * 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   */
  @Input() minBufferPx: number = 100;
  /**
   * 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   */
  @Input() maxBufferPx: number = 200;
  /**
   * 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   */
  @Input() @XInputNumber() adaptionHeight: XNumber;
  /**
   * 文档高度百分比，弹窗百分比高度用到
   */
  @Input() @XInputNumber() docPercent: XNumber = 1;
}

/**
 * Table Foot
 * @selector x-table-foot
 * @decorator component
 */
export const XTableFootPrefix = 'x-table-foot';

/**
 * Table Foot Property
 */
@Component({ template: '' })
export class XTableFootProperty {}
