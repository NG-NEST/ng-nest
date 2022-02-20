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
  XWithConfig,
  XTextAlign,
  XSize
} from '@ng-nest/ui/core';
import { Input, Component, EventEmitter, TemplateRef, Output } from '@angular/core';
import { XPaginationProperty, XPaginationOption } from '@ng-nest/ui/pagination';

/**
 * Table
 * @selector x-table
 * @decorator component
 */
export const XTablePrefix = 'x-table';
const X_CONFIG_NAME = 'table';

/**
 * Table Property
 */
@Component({ template: '' })
export class XTableProperty extends XPaginationProperty implements XTableOption {
  /**
   * @zh_CN 行数据
   * @en_US Row data
   */
  @Input() data: XData<XTableRow> = [];
  /**
   * @zh_CN 列集合
   * @en_US Column set
   */
  @Input() columns: XTableColumn[] = [];
  /**
   * @zh_CN 表头和行高，单位 px
   * @en_US Header and row height, unit px
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 42) @XInputNumber() rowHeight!: number;
  /**
   * @zh_CN 是否启用加载 loading
   * @en_US Whether to enable loading
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() loading!: XBoolean;
  /**
   * @zh_CN 是否展示列边框
   * @en_US Whether to show column borders
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() bordered!: XBoolean;
  /**
   * @zh_CN 是否显示列头
   * @en_US Whether to display the column headers
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() showHeader!: XBoolean;
  /**
   * @zh_CN 当前选中行数据
   * @en_US Currently selected row data
   */
  @Input() activatedRow?: XTableRow;
  /**
   * @zh_CN 当前选中行改变
   * @en_US The currently selected row changes
   */
  @Output() activatedRowChange = new EventEmitter<XTableRow>();
  /**
   * @zh_CN 列头自定义模板
   * @en_US Column header custom template
   */
  @Input() headColumnTpl: XTableTemplate = {};
  /**
   * @zh_CN 列内容自定义模板
   * @en_US Column content custom template
   */
  @Input() bodyColumnTpl: XTableTemplate = {};
  /**
   * @zh_CN 行条件样式
   * @en_US Row condition class
   */
  @Input() rowClass?: (row: XTableRow, index: number) => { [className: string]: boolean };
  /**
   * @zh_CN 排序点击的事件
   * @en_US Sort click events
   */
  @Output() sortChange = new EventEmitter<XSort[]>();
  /**
   * @zh_CN 允许行点击选中
   * @en_US Allow row click to select
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() allowSelectRow!: XBoolean;
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() virtualScroll!: XBoolean;
  /**
   * @zh_CN body 数据高度
   * @en_US body data height
   */
  @Input() @XInputNumber() bodyHeight?: number;
  /**
   * @zh_CN itemSize，对应 cdk scroll 中的参数
   * @en_US itemSize，corresponding to the parameters in cdk scroll
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 42) @XInputNumber() itemSize!: number;
  /**
   * @zh_CN 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US Exceed the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  @Input() minBufferPx: number = 100;
  /**
   * @zh_CN 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US Render the pixels of the new data buffer, corresponding to the parameters in cdk scroll
   */
  @Input() maxBufferPx: number = 200;
  /**
   * @zh_CN 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   * @en_US Adaptive height, table height is equal to the screen height minus the value set here
   */
  @Input() @XInputNumber() adaptionHeight?: XNumber;
  /**
   * @zh_CN 文档高度百分比，弹窗百分比高度用到
   * @en_US Document height percentage, used by pop-up window percentage height
   */
  @Input() @XInputNumber() docPercent: XNumber = 1;
  /**
   * @zh_CN checkbox 列初始选中的数据，列中激活 checkbox
   * @en_US Checkbox column initially selected data, checkbox is activated in column
   */
  @Input() checkedRow: { [property: string]: any[] } = {};
  /**
   * @zh_CN 如果 data 是函数类型，可以通过此参数控制请求，常用于弹框中的表格，弹出后再请求
   * @en_US If data is a function type, you can use this parameter to control the request, which is often used in the form in the pop-up box, and then request it after it pops up
   */
  @Input() @XInputBoolean() manual: XBoolean = true;
  /**
   * @zh_CN 滚动区域高宽
   * @en_US Height and width of rolling area
   */
  @Input() scroll?: { x: number; y: number };
  /**
   * @zh_CN 参数控制请求改变事件
   * @en_US Parameter control request change event
   */
  @Output() manualChange = new EventEmitter<boolean>();
  /**
   * @zh_CN 单元格配置
   * @en_US Cell config
   */
  @Input() cellConfig?: XTableCellConfig;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') rowSize?: XSize;
}

/**
 * Table Option
 * @undocument true
 */
export interface XTableOption extends XPaginationOption {
  /**
   * @zh_CN 行数据
   * @en_US Row data
   */
  data?: XData<XTableRow>;
  /**
   * @zh_CN 列集合
   * @en_US Column set
   */
  columns?: XTableColumn[];
  /**
   * @zh_CN 表头和行高，单位 px
   * @en_US Header and row height, unit px
   */
  rowHeight?: number;
  /**
   * @zh_CN 是否启用加载 loading
   * @en_US Whether to enable loading
   */
  loading?: XBoolean;
  /**
   * @zh_CN 当前选中行数据
   * @en_US Currently selected row data
   */
  activatedRow?: XTableRow;
  /**
   * @zh_CN 列头自定义模板
   * @en_US Column header custom template
   */
  headColumnTpl?: XTableTemplate;
  /**
   * @zh_CN 列内容自定义模板
   * @en_US Column content custom template
   */
  bodyColumnTpl?: XTableTemplate;
  /**
   * @zh_CN 行条件样式
   * @en_US Row condition class
   */
  rowClass?: (row: XTableRow, index: number) => { [className: string]: boolean };
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  virtualScroll?: XBoolean;
  /**
   * @zh_CN body 数据高度
   * @en_US body data height
   */
  bodyHeight?: number;
  /**
   * @zh_CN 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US Exceed the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  minBufferPx?: number;
  /**
   * @zh_CN 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US Render the pixels of the new data buffer, corresponding to the parameters in cdk scroll
   */
  maxBufferPx?: number;
  /**
   * @zh_CN 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   * @en_US Adaptive height, table height is equal to the screen height minus the value set here
   */
  adaptionHeight?: XNumber;
  /**
   * @zh_CN 文档高度百分比，弹窗百分比高度用到
   * @en_US Document height percentage, used by pop-up window percentage height
   */
  docPercent?: XNumber;
  /**
   * @zh_CN 单元格配置
   * @en_US Cell config
   */
  cellConfig?: XTableCellConfig;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  rowSize?: XSize;
}

/**
 * @zh_CN 数据
 * @en_US Data
 */
export interface XTableRow extends XId {
  /**
   * @zh_CN 自定义属性
   * @en_US Custom attributes
   */
  [property: string]: any;
}

/**
 * @zh_CN 列参数
 * @en_US Column parameter
 */
export interface XTableColumn extends XIdentityProperty {
  /**
   * @zh_CN 类型
   * @en_US Types of
   */
  type?: XColumnType;
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  width?: number;
  /**
   * @zh_CN flex 布局宽度
   * @en_US Flex layout width
   */
  flex?: number;
  /**
   * @zh_CN 查询字段
   * @en_US Query field
   */
  search?: boolean;
  /**
   * @zh_CN 排序字段
   * @en_US Sort field
   */
  sort?: boolean;
  /**
   * @zh_CN 固定列，距离左边的距离
   * @en_US Fixed column, distance from left
   */
  left?: number;
  /**
   * @zh_CN 操作按钮
   * @en_US Operation button
   */
  action?: boolean;
  /**
   * @zh_CN type 为 checkbox 时绑定行点击选中事件
   * @en_US Bind row click selection event when type is checkbox
   */
  rowChecked?: boolean;
  /**
   * @zh_CN 文字对齐方式
   * @en_US Text alignment
   */
  textAlign?: XTextAlign;
  /**
   * @zh_CN 拖动列宽，需要设置列的初始宽度 width
   * @en_US Drag the column width, you need to set the initial width of the column width
   */
  dragWidth?: boolean;
  /**
   * @zh_CN 头部显示 checkbox
   * @en_US Head shows checkbox
   */
  headChecked?: boolean;
  /**
   * @zh_CN 自定义属性
   * @en_US Custom attributes
   */
  [property: string]: any;
}

/**
 * @zh_CN 单元格配置
 * @en_US Cell config
 */
export interface XTableCellConfig {
  /**
   * @zh_CN 列单元格配置
   * @en_US Column cell config
   */
  thead?: XTableCellConfigRule;
  /**
   * @zh_CN 行单元格配置
   * @en_US Row config
   */
  tbody?: XTableCellConfigRule;
}

/**
 * @zh_CN 单元格配置规则
 * @en_US Cell config rules
 */
export interface XTableCellConfigRule {
  /**
   * @zh_CN grid 布局下定义列宽度
   * @en_US Define column width under grid layout
   */
  gridTemplateColumns?: string;
  /**
   * @zh_CN 单元格配置
   * @en_US Cell merge rules
   */
  cells?: XTableCell[];
}

/**
 * @zh_CN 单元格合并配置
 * @en_US Cell merge rules
 */
export interface XTableCell {
  /**
   * @zh_CN 使用 grid 布局来合并单元格
   * @en_US Use grid layout to merge cells
   */
  gridArea?: string;
  /**
   * @zh_CN 名称
   * @en_US Name
   */
  label?: string;
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  width?: number;
  /**
   * @zh_CN 固定列，距离左边的距离
   * @en_US Fixed column, distance from left
   */
  left?: number;
  /**
   * @zh_CN 对应列的 id
   * @en_US The id of the corresponding column
   */
  id?: string;
  /**
   * @zh_CN 拖动列宽
   * @en_US Drag the column width
   */
  dragWidth?: boolean;
  /**
   * @zh_CN 自定义属性
   * @en_US Custom attributes
   */
  [property: string]: any;
}

/**
 * @zh_CN 列类型
 * @en_US Column type
 */
export type XColumnType = 'label' | 'index' | 'checkbox';

/**
 * @zh_CN 模板
 * @en_US Template
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
   * @zh_CN 列集合
   * @en_US Column set
   */
  @Input() columns: XTableColumn[] = [];
  /**
   * @zh_CN 高度，单位 px
   * @en_US Height in px
   */
  @Input() @XInputNumber() rowHeight: XNumber = 42;
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  @Input() columnTpl: XTableTemplate = {};
  /**
   * @zh_CN 竖向滚动条宽度
   * @en_US Vertical scroll bar width
   */
  @Input() scrollYWidth?: number;
  /**
   * @zh_CN 横向滚动条宽度
   * @en_US Horizontal scroll bar width
   */
  @Input() scrollXWidth?: number | null;
  /**
   * @zh_CN 单元格配置
   * @en_US Cell merge rules
   */
  @Input() cellConfig?: XTableCellConfigRule;
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
   * @zh_CN 行数据
   * @en_US Row data
   */
  @Input() data: XTableRow[] = [];
  /**
   * @zh_CN 列集合
   * @en_US Column set
   */
  @Input() columns: XTableColumn[] = [];
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  @Input() columnTpl: XTableTemplate = {};
  /**
   * @zh_CN 当前选中行数据
   * @en_US Currently selected row data
   */
  @Input() activatedRow?: XTableRow;
  /**
   * @zh_CN 当前选中行改变
   * @en_US The currently selected row changes
   */
  @Output() activatedRowChange = new EventEmitter<XTableRow>();
  /**
   * @zh_CN 高度，单位 px。设置为 0 表示行高自适应内容高度。
   * @en_US Height in px. set to 0 means that the row height is adaptive to the content height
   */
  @Input() @XInputNumber() rowHeight: XNumber = 42;
  /**
   * @zh_CN body 数据高度
   * @en_US body data height
   */
  @Input() @XInputNumber() bodyHeight?: number;
  /**
   * @zh_CN 允许行点击选中
   * @en_US Allow row click to select
   */
  @Input() @XInputBoolean() allowSelectRow: XBoolean = true;
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  @Input() @XInputBoolean() virtualScroll: XBoolean = false;
  /**
   * @zh_CN itemSize，对应 cdk scroll 中的参数
   * @en_US itemSize，corresponding to the parameters in cdk scroll
   */
  @Input() @XInputNumber() itemSize: number = 42;
  /**
   * @zh_CN 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US Exceed the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  @Input() minBufferPx: number = 100;
  /**
   * @zh_CN 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US Render the pixels of the new data buffer, corresponding to the parameters in cdk scroll
   */
  @Input() maxBufferPx: number = 200;
  /**
   * @zh_CN 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   * @en_US Adaptive height, table height is equal to the screen height minus the value set here
   */
  @Input() @XInputNumber() adaptionHeight?: XNumber;
  /**
   * @zh_CN 文档高度百分比，弹窗百分比高度用到
   * @en_US Document height percentage, used by pop-up window percentage height
   */
  @Input() @XInputNumber() docPercent: XNumber = 1;
  /**
   * @zh_CN 滚动区域高宽
   * @en_US Height and width of rolling area
   */
  @Input() scroll?: { x: number; y: number };
  /**
   * @zh_CN 单元格配置规则
   * @en_US Cell config rules
   */
  @Input() cellConfig?: XTableCellConfigRule;
  /**
   * @zh_CN 行条件样式
   * @en_US Row condition class
   */
  @Input() rowClass?: (row: XTableRow, index: number) => { [className: string]: boolean };
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
export class XTableFootProperty extends XProperty {}
