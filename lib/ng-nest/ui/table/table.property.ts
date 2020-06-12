import {
  XData,
  XQuery,
  XRepositoryAbstract,
  XIdentityProperty,
  XInputBoolean,
  XBoolean,
  XInputNumber,
  XNumber,
  XResultList
} from '@ng-nest/ui/core';
import { XButtonOption } from '@ng-nest/ui/button';
import { XPaginationProperty, XPaginationOption } from '@ng-nest/ui/pagination';
import { TemplateRef, Input, Output, EventEmitter, Component } from '@angular/core';

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
   * 数据
   */
  @Input() data: XResultList<any>;
  /**
   * 列集合
   */
  @Input() columns: XTableColumn[] = [];
  /**
   * 操作集合
   */
  @Input() actions: XTableAction[] = [];
  /**
   * 数据服务
   */
  @Input() service?: XRepositoryAbstract;
  /**
   * 查询条件
   */
  @Input() query: XQuery = {};
  /**
   * 隐藏表格列头
   */
  @Input('header-hidden') @XInputBoolean() headerHidden: XBoolean;
  /**
   * 隐藏表格分页
   */
  @Input('footer-hidden') @XInputBoolean() footerHidden: XBoolean;
  /**
   * 允许行点击选中
   */
  @Input('allow-select-row') @XInputBoolean() allowSelectRow: XBoolean;
  /**
   * 选中第一行数据，触发选中事件
   */
  @Input('first-row-selected') @XInputBoolean() firstRowSelected: XBoolean;
  /**
   * 行主键
   */
  @Input('row-primary') rowPrimary: string = 'id';
  /**
   * 当前选中行数据
   */
  @Input('activated-row') activatedRow?: any;
  /**
   * 显示搜索框
   */
  @Input('search-show') @XInputBoolean() searchShow: XBoolean;
  /**
   * 查找框提示信息
   */
  @Input('search-placeholder') searchPlaceholder: string = '查找';
  /**
   * 列头自定义模板
   */
  @Input('header-column-tpl') headerColumnTpl: XTableColumnTemplate = {};
  /**
   * 列内容自定义模板
   */
  @Input('body-column-tpl') bodyColumnTpl: XTableColumnTemplate = {};
  /**
   * 开启虚拟滚动
   */
  @Input('virtual-scroll') @XInputBoolean() virtualScroll: XBoolean = false;
  /**
   * 行高，对应 cdk scroll 中的参数
   */
  @Input('item-size') itemSize: number = 42;
  /**
   * 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   */
  @Input('min-buffer-px') minBufferPx: number = 100;
  /**
   * 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   */
  @Input('max-buffer-px') maxBufferPx: number = 200;
  /**
   * 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   */
  @Input('adaption-height') @XInputNumber() adaptionHeight: XNumber;
  /**
   * 文档高度百分比，弹窗百分比高度用到
   */
  @Input('doc-percent') @XInputNumber() docPercent: XNumber = 1;
  /**
   * body 数据高度
   */
  @Input('body-height') @XInputNumber() bodyHeight: number;
  /**
   * 横向滚动条出现的最小宽度
   */
  @Input('min-scroll-x') minScrollX: XNumber = '100%';
  /**
   * 操作按钮点击事件
   */
  @Output() actionEmit = new EventEmitter<XTableAction>();
  /**
   * 行点击事件
   */
  @Output() rowEmit = new EventEmitter<any>();
}

/**
 * Table Option
 * @undocument true
 */
export interface XTableOption extends XPaginationOption {
  /**
   * 数据
   */
  data?: XResultList<any>;
  /**
   * 列集合
   */
  columns?: XTableColumn[];
  /**
   * 操作集合
   */
  actions?: XTableAction[];
  /**
   * 数据服务
   */
  service?: XRepositoryAbstract;
  /**
   * 查询条件
   */
  query?: XQuery;
  /**
   * 隐藏表格列头
   */
  headerHidden?: XBoolean;
  /**
   * 隐藏表格分页
   */
  footerHidden?: XBoolean;
  /**
   * 允许行点击选中
   */
  allowSelectRow?: XBoolean;
  /**
   * 选中第一行数据，触发选中事件
   */
  firstRowSelected?: XBoolean;
  /**
   * 行主键
   */
  rowPrimary?: string;
  /**
   * 当前选中行数据
   */
  activatedRow?: any;
  /**
   * 显示搜索框
   */
  searchShow?: XBoolean;
  /**
   * 查找框提示信息
   */
  searchPlaceholder?: string;
  /**
   * 列头自定义模板
   */
  headerColumnTpl?: XTableColumnTemplate;
  /**
   * 列内容自定义模板
   */
  bodyColumnTpl?: XTableColumnTemplate;
  /**
   * 开启虚拟滚动
   */
  virtualScroll?: XBoolean;
  /**
   * 行高，对应 cdk scroll 中的参数
   */
  itemSize?: number;
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
  /**
   * body 数据高度
   */
  bodyHeight?: number;
  /**
   * 横向滚动条出现的最小宽度
   */
  minScrollX?: XNumber;
  /**
   * 操作按钮点击事件
   */
  actionClick?: (action: XTableAction) => void;
  /**
   * 行点击事件
   */
  rowClick?: (row: any) => void;
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
   * 自定义属性
   */
  [prop: string]: any;
}

/**
 * 操作参数
 */
export interface XTableAction extends XButtonOption {
  /**
   * 按钮名称
   */
  label?: string;
  /**
   * 操作按钮位置
   */
  actionLayoutType?: XTableActionLayoutType;
  /**
   * 事件
   * 触发的时候自动赋值返回
   */
  event?: Event;
  /**
   * 触发分组的功能
   */
  group?: string;
  /**
   * 操作类型
   */
  action?: XTableActionType;
  /**
   * 自定义数据
   */
  data?: { [prop: string]: any };
}

/**
 * 列类型
 */
export type XColumnType = 'label' | 'index';

/**
 * 表格操作类型
 */
export type XTableActionType = 'add' | 'edit' | 'delete';

/**
 * 操作按钮位置
 * @value "top-left" 顶部靠左（默认）
 * @value "top-right" 顶部靠右
 * @value "top-right-icon" 顶部靠右图标
 * @value "row-icon" 行中的操作按钮
 */
export type XTableActionLayoutType = 'top-left' | 'top-right' | 'top-right-icon' | 'row-icon';

export type XTableColumnTemplate = { [property: string]: TemplateRef<any> };
