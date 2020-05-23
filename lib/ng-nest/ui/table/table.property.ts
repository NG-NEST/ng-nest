import { XData, XQuery, XRepositoryAbstract, XIdentityProperty, XInputBoolean, XBoolean, XInputNumber } from '@ng-nest/ui/core';
import { XButtonOption } from '@ng-nest/ui/button';
import { XPaginationProperty } from '@ng-nest/ui/pagination';
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
export class XTableProperty extends XPaginationProperty {
  /**
   * 数据
   */
  @Input() data: XData<any> = [];
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
   * 查找框提示信息
   */
  @Input('search-placeholder') searchPlaceholder: string = '查找';
  /**
   * 隐藏序号列
   */
  @Input('serial-number-hidden') @XInputBoolean() serialNumberHidden: XBoolean;
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
  @Input('item-size') itemSize = 42;
  /**
   * 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   */
  @Input('min-buffer-px') minBufferPx = 100;
  /**
   * 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   */
  @Input('max-buffer-px') maxBufferPx = 200;
  /**
   * body 数据高度
   */
  @Input('body-height') @XInputNumber() bodyHeight: number;
  /**
   * 操作按钮点击事件
   */
  @Output() actionClick = new EventEmitter<XTableAction>();
  /**
   * 行点击事件
   */
  @Output() rowClick = new EventEmitter<any>();
}

/**
 * 列参数
 */
export interface XTableColumn extends XIdentityProperty {
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
}

/**
 * 操作按钮位置
 * @value "top-left" 顶部靠左（默认）
 * @value "top-right" 顶部靠右
 * @value "top-right-icon" 顶部靠右图标
 * @value "row-icon" 行中的操作按钮
 */
export type XTableActionLayoutType = 'top-left' | 'top-right' | 'top-right-icon' | 'row-icon';

export type XTableColumnTemplate = { [property: string]: TemplateRef<any> };
