import {
  XProperty,
  XPropertyFunction,
  XToCssPixelValue,
  XToBoolean,
  XToNumber,
  XToDataConvert
} from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model, output } from '@angular/core';
import { XPaginationSizeData } from '@ng-nest/ui/pagination';
import { XSelectNode } from '@ng-nest/ui/select';
import type {
  XNumber,
  XSort,
  XBoolean,
  XData,
  XTextAlign,
  XSize,
  XParentIdentityProperty,
  XIdentityProperty,
  XTemplate,
  XQuery,
  XDataArray
} from '@ng-nest/ui/core';

/**
 * Table
 * @selector x-table
 * @decorator component
 */
export const XTablePrefix = 'x-table';
const X_TABLE_CONFIG_NAME = 'table';

/**
 * Table Property
 */
@Component({ selector: `${XTablePrefix}-property`, template: '' })
export class XTableProperty extends XPropertyFunction(X_TABLE_CONFIG_NAME) {
  /**
   * @zh_CN 行数据
   * @en_US Row data
   */
  readonly data = input<XData<XTableRow>, XData<XTableRow>>([], { transform: XToDataConvert });
  /**
   * @zh_CN 列集合
   * @en_US Column set
   */
  readonly columns = input<XTableColumn[]>([]);
  /**
   * @zh_CN 表头和行高，单位 px
   * @en_US Header and row height, unit px
   */
  readonly rowHeight = input<number, XNumber>(this.config?.rowHeight ?? 42, { transform: XToNumber });
  /**
   * @zh_CN 是否启用加载 loading
   * @en_US Whether to enable loading
   */
  readonly loading = input<boolean, XBoolean>(this.config?.loading ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 是否展示列边框
   * @en_US Whether to show column borders
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 是否显示列头
   * @en_US Whether to display the column headers
   */
  readonly showHeader = input<boolean, XBoolean>(this.config?.showHeader ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 列头显示位置
   * @en_US Whether to display the column headers
   */
  readonly headerPosition = input<XTableHeaderPosition>(this.config?.headerPosition ?? 'top');
  /**
   * @zh_CN 当前选中行数据
   * @en_US Currently selected row data
   */
  readonly activatedRow = model<XTableRow>();
  /**
   * @zh_CN 列头自定义模板，通过 key-value 的方式指定每列的模版
   * @en_US Column header custom template
   */
  readonly headColumnTpl = input<XTableTemplate>({});
  /**
   * @zh_CN 列内容自定义模板，通过 key-value 的方式指定每列的模版
   * @en_US Column content custom template
   */
  readonly bodyColumnTpl = input<XTableTemplate>({});
  /**
   * @zh_CN 单元格的自定义模板，优先级低于列内容自定义模板
   * @en_US Custom template of cells
   */
  readonly bodyTdTpl = input<XTemplate>();
  /**
   * @zh_CN 行条件样式
   * @en_US Row condition class
   */
  readonly rowClass = input<(row: XTableRow, index: number) => { [className: string]: boolean }>();
  /**
   * @zh_CN 列头搜索自定义模板
   * @en_US Line head search custom template
   */
  readonly headSearchTpl = input<XTemplate>();
  /**
   * @zh_CN 排序点击的事件
   * @en_US Sort click events
   */
  readonly sortChange = output<XSort[]>();
  /**
   * @zh_CN 列头 checkbox 事件
   * @en_US head checkbox event
   */
  readonly headCheckboxChange = output<XTableHeadCheckbox>();
  /**
   * @zh_CN body checkbox 事件
   * @en_US head checkbox event
   */
  readonly bodyCheckboxChange = output<XTableRow>();
  /**
   * @zh_CN 允许行点击选中当前行
   * @en_US Allow row click to select
   */
  readonly allowSelectRow = input<boolean, XBoolean>(this.config?.allowSelectRow ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 允许行点击选中 checkbox
   * @en_US Allow lines to click checkbox
   */
  readonly allowCheckRow = input<boolean, XBoolean>(this.config?.allowCheckRow ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  readonly virtualScroll = input<boolean, XBoolean>(this.config?.virtualScroll ?? false, { transform: XToBoolean });
  /**
   * @zh_CN body 数据高度
   * @en_US body data height
   */
  readonly bodyHeight = input<number | undefined, XNumber>(undefined, { transform: XToNumber });
  /**
   * @zh_CN itemSize，对应 cdk scroll 中的参数
   * @en_US itemSize，corresponding to the parameters in cdk scroll
   */
  readonly itemSize = input<number, XNumber>(this.config?.itemSize ?? 42, { transform: XToNumber });
  /**
   * @zh_CN 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US Exceed the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  readonly minBufferPx = input<number, XNumber>(100, { transform: XToNumber });
  /**
   * @zh_CN 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US Render the pixels of the new data buffer, corresponding to the parameters in cdk scroll
   */
  readonly maxBufferPx = input<number, XNumber>(200, { transform: XToNumber });
  /**
   * @zh_CN 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   * @en_US Adaptive height, table height is equal to the screen height minus the value set here
   */
  readonly adaptionHeight = input<number | undefined, XNumber>(undefined, { transform: XToNumber });
  /**
   * @zh_CN 文档高度百分比，弹窗百分比高度用到
   * @en_US Document height percentage, used by pop-up window percentage height
   */
  readonly docPercent = input<number, XNumber>(1, { transform: XToNumber });
  /**
   * @zh_CN checkbox 列初始选中的数据，列中激活 checkbox
   * @en_US Checkbox column initially selected data, checkbox is activated in column
   */
  readonly checkedRow = input<{ [property: string]: any[] }>({});
  /**
   * @zh_CN 如果 data 是函数类型，可以通过此参数控制请求，常用于弹框中的表格，弹出后再请求
   * @en_US If data is a function type, you can use this parameter to control the request, which is often used in the form in the pop-up box, and then request it after it pops up
   */
  readonly manual = model<boolean>(true);
  /**
   * @zh_CN 滚动区域高宽
   * @en_US Height and width of rolling area
   */
  readonly scroll = input<{ x: number; y: number }>();
  /**
   * @zh_CN 表格页头
   * @en_US Table header
   */
  readonly header = input<XTemplate>();
  /**
   * @zh_CN 表格页尾
   * @en_US Table footer
   */
  readonly footer = input<XTemplate>();
  /**
   * @zh_CN 单元格配置
   * @en_US Cell config
   */
  readonly cellConfig = input<XTableCellConfig>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly rowSize = input<XSize>(this.config?.rowSize ?? 'medium');
  /**
   * @zh_CN 分页器位置
   * @en_US Pagination position
   */
  readonly paginationPosition = input<XPaginationPosition>('bottom-left');
  /**
   * @zh_CN 隐藏表格外边框
   * @en_US Hidden table wrap border
   */
  readonly hiddenWrapBorder = input<boolean, XBoolean>(this.config?.hiddenWrapBorder ?? false, {
    transform: XToBoolean
  });
  /**
   * @zh_CN 隐藏分页器按钮边框
   * @en_US Hidden pagination button border
   */
  readonly hiddenPaginationBorder = input<boolean, XBoolean>(this.config?.hiddenPaginationBorder ?? false, {
    transform: XToBoolean
  });
  /**
   * @zh_CN 显示分页器
   * @en_US Pagination position
   */
  readonly showPagination = input<boolean, XBoolean>(this.config?.showPagination ?? true, {
    transform: XToBoolean
  });
  /**
   * @zh_CN 树形表格
   * @en_US Tree table
   */
  readonly treeTable = input<boolean, XBoolean>(this.config?.treeTable ?? true, {
    transform: XToBoolean
  });
  /**
   * @zh_CN 树形表格展开所有节点
   * @en_US Tree table
   */
  readonly expandedAll = input<boolean, XBoolean>(this.config?.expandedAll ?? false, {
    transform: XToBoolean
  });
  /**
   * @zh_CN 默认展开的层级，-1 不展开
   * @en_US Default expanded level
   */
  readonly expandedLevel = input<number, XNumber>(this.config?.expandedLevel ?? -1, {
    transform: XToNumber
  });
  /**
   * @zh_CN 展开的节点
   * @en_US Expanded node
   */
  readonly expanded = input<any[]>([]);
  /**
   * @zh_CN 自定义展开内容
   * @en_US Customized expansion content
   */
  readonly expandTpl = input<XTemplate>();
  /**
   * @zh_CN 显示数据为空的提示
   * @en_US Display a prompt with empty data
   */
  readonly showEmpty = input<boolean, XBoolean>(this.config?.showEmpty ?? true, {
    transform: XToBoolean
  });
  /**
   * @zh_CN 数据为空的提示图片地址或自定义模板
   * @en_US Picture address or custom template
   */
  readonly emptyImg = input<XTemplate | undefined>(this.config?.emptyImg ?? undefined);
  /**
   * @zh_CN 数据为空的提示内容或自定义模板
   * @en_US Content or custom template
   */
  readonly emptyContent = input<XTemplate | undefined>(this.config?.emptyContent ?? undefined);
  /**
   * @zh_CN 当前页码
   * @en_US Current page number
   */
  readonly index = model<number>(this.config?.index ?? 1);
  /**
   * @zh_CN 每页显示条数
   * @en_US Number of items displayed per page
   */
  readonly size = model<number>(this.config?.size ?? 10);
  /**
   * @zh_CN 总数
   * @en_US Total
   */
  readonly total = model<number>(0);
  /**
   * @zh_CN 查询条件
   * @en_US Query conditions
   */
  readonly query = model<XQuery>({});
  /**
   * @zh_CN 最多显示的分页数量
   * @en_US The largest number of pages display
   */
  readonly pageLinkSize = input<number, XNumber>(this.config?.pageLinkSize ?? 5, { transform: XToNumber });
  /**
   * @zh_CN 显示首尾页跳转
   * @en_US Display the first and last page
   */
  readonly showEllipsis = input<boolean, XBoolean>(this.config?.showEllipsis ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 显示总条数
   * @en_US Display the total
   */
  readonly showTotal = input<boolean, XBoolean>(this.config?.showTotal ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 按钮间距
   * @en_US Button spacing
   */
  readonly space = input<string, XNumber>(this.config?.space ?? '0.25rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 添加背景色
   * @en_US Show background
   */
  readonly showBackground = input<boolean, XBoolean>(this.config?.showBackground ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 显示分页条数
   * @en_US Show size
   */
  readonly showSize = input<boolean, XBoolean>(this.config?.showSize ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 分页条数选择框的宽度
   * @en_US size with select
   */
  readonly sizeWidth = input<string, XNumber>(this.config?.sizeWidth ?? '6.875rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 显示输入分页条数（不能跟下拉选项同时使用）
   * @en_US Display the number of input page breaks (cannot exist with the drop-down options of page breaks)
   */
  readonly showInputSize = input<boolean, XBoolean>(this.config?.showInputSize ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 分页条数输入框的宽度
   * @en_US size with input
   */
  readonly inputSizeWidth = input<string, XNumber>(this.config?.sizeWidth ?? '3.125rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 分页选择的数据项
   * @en_US Paging choose items of data
   */
  readonly sizeData = input<XDataArray<XSelectNode>>(this.config?.sizeData ?? XPaginationSizeData);
  /**
   * @zh_CN 禁用整个分页
   * @en_US disabled
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 显示跳转输入框
   * @en_US Show size
   */
  readonly showJump = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 跳转页的宽度
   * @en_US size with
   */
  readonly jumpWidth = input<string, XNumber>(this.config?.jumpWidth ?? '3.125rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 总数自定义模板
   * @en_US Total template
   */
  readonly totalTpl = input<XTemplate>();
  /**
   * @zh_CN 简单分页
   * @en_US Simple
   */
  readonly simple = input<boolean, XBoolean>(this.config?.simple ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 简单分页输入框宽度
   * @en_US Simple index with
   */
  readonly simpleIndexWidth = input<string, XNumber>(this.config?.simpleIndexWidth ?? '8.125rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 列头拖动开始事件，返回拖动的列
   * @en_US Column Header Drag End Event
   */
  readonly columnDragStarted = output<XTableColumn>();
  /**
   * @zh_CN 列头拖动结束事件，返回拖动的列
   * @en_US The column header is dragging, and the event is triggered when the order is changed
   */
  readonly columnDragEnded = output<XTableColumn>();
  /**
   * @zh_CN 当用户把一个条目投放进该容器时就会触发，拖动放开的事件，返回拖动排序后的列数据
   * @en_US The column header is dragging, and the event is triggered when the order is changed
   */
  readonly columnDropListDropped = output<XTableColumn[]>();
  /**
   * @zh_CN 开始拖动列宽的事件
   * @en_US Event to started drag column width
   */
  readonly columnDragWidthStarted = output<XTableDragWidthEvent>();
  /**
   * @zh_CN 正在拖动列宽时的事件
   * @en_US Event to moved drag column width
   */
  readonly columnDragWidthMoved = output<XTableDragWidthEvent>();
  /**
   * @zh_CN 结束拖动列宽的事件
   * @en_US Event to ended drag column width
   */
  readonly columnDragWidthEnded = output<XTableDragWidthEvent>();
}

/**
 * @zh_CN 行数据
 * @en_US Row data
 */
export interface XTableRow extends XParentIdentityProperty<XTableRow> {
  /**
   * @zh_CN 展开
   * @en_US Unfold
   */
  expanded?: boolean;
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
   * @zh_CN 固定列，距离右边的距离
   * @en_US Fixed column, distance from right
   */
  right?: number;
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
   * @zh_CN type 为 expand 时绑定行点击展开事件
   * @en_US Bind row click selection event when type is expand
   */
  rowExpand?: boolean;
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
   * @zh_CN 正在拖动列宽
   * @en_US Dragging width
   */
  draggingWidth?: boolean;
  /**
   * @zh_CN 开始拖动列宽的事件
   * @en_US Event to started drag column width
   */
  dragWidthStarted?: (event: XTableDragWidthEvent) => void;
  /**
   * @zh_CN 正在拖动列宽时的事件
   * @en_US Event to moved drag column width
   */
  dragWidthMoved?: (event: XTableDragWidthEvent) => void;
  /**
   * @zh_CN 结束拖动列宽的事件
   * @en_US Event to ended drag column width
   */
  dragWidthEnded?: (event: XTableDragWidthEvent) => void;
  /**
   * @zh_CN 拖动列
   * @en_US Drag the column
   */
  dragColumn?: boolean;
  /**
   * @zh_CN 正在拖动列
   * @en_US Dragging column
   */
  dragging?: boolean;
  /**
   * @zh_CN 头部显示 checkbox
   * @en_US Head shows checkbox
   */
  headChecked?: boolean;
  /**
   * @zh_CN 头部显示 expand
   * @en_US Head shows expand
   */
  headExpand?: boolean;
  /**
   * @zh_CN 自定义属性
   * @en_US Custom attributes
   */
  [property: string]: any;
}

/**
 * @zh_CN 列头宽度拖动事件
 * @en_US Column header width drag event
 */
export interface XTableDragWidthEvent {
  /**
   * @zh_CN 拖动的列
   * @en_US Dragged column
   */
  column: XTableColumn;
  /**
   * @zh_CN 列位置，正在拖动的时候指偏移位置
   * @en_US The column position refers to the offset position when dragging
   */
  position: { x: number; y: number };
}

/**
 * @zh_CN 列头 checkbox 事件数据
 * @en_US Column header checkbox event data
 */
export interface XTableHeadCheckbox {
  /**
   * @zh_CN 行数据
   * @en_US Row data
   */
  rows: XTableRow[];
  /**
   * @zh_CN checkbox 数据
   * @en_US Checkbox data
   */
  checkbox: { [property: string]: boolean };
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
   * @zh_CN 固定列，距离右边的距离
   * @en_US Fixed column, distance from right
   */
  right?: number;
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
export type XColumnType = 'label' | 'index' | 'checkbox' | 'expand';

/**
 * @zh_CN 列头显示位置
 * @en_US Line head display position
 */
export type XTableHeaderPosition = 'top' | 'bottom' | 'top-bottom';

/**
 * @zh_CN 分页器位置
 * @en_US Paging position
 */
export type XPaginationPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

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
@Component({ selector: `${XTableHeadPrefix}-property`, template: '' })
export class XTableHeadProperty extends XProperty {
  /**
   * @zh_CN 列集合
   * @en_US Column set
   */
  readonly columns = input<XTableColumn[]>([]);
  /**
   * @zh_CN 高度，单位 px
   * @en_US Height in px
   */
  readonly rowHeight = input<number, XNumber>(42, { transform: XToNumber });
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  readonly columnTpl = input<XTableTemplate>({});
  /**
   * @zh_CN 竖向滚动条宽度
   * @en_US Vertical scroll bar width
   */
  readonly scrollYWidth = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 横向滚动条宽度
   * @en_US Horizontal scroll bar width
   */
  readonly scrollXWidth = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 单元格配置
   * @en_US Cell merge rules
   */
  readonly cellConfig = input<XTableCellConfigRule>();
  /**
   * @zh_CN 显示的位置
   * @en_US Display position
   */
  readonly position = input<string>();
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
@Component({ selector: `${XTableBodyPrefix}-property`, template: '' })
export class XTableBodyProperty extends XProperty {
  /**
   * @zh_CN 行数据
   * @en_US Row data
   */
  readonly data = input<XTableRow[]>([]);
  /**
   * @zh_CN 列集合
   * @en_US Column set
   */
  readonly columns = input<XTableColumn[]>([]);
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  readonly columnTpl = input<XTableTemplate>({});
  /**
   * @zh_CN 当前选中行数据
   * @en_US Currently selected row data
   */
  readonly activatedRow = model<XTableRow>();
  /**
   * @zh_CN 高度，单位 px。设置为 0 表示行高自适应内容高度。
   * @en_US Height in px. set to 0 means that the row height is adaptive to the content height
   */
  readonly rowHeight = input<number, XNumber>(42, { transform: XToNumber });
  /**
   * @zh_CN body 数据高度
   * @en_US body data height
   */
  readonly bodyHeight = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 允许行点击选中
   * @en_US Allow row click to select
   */
  readonly allowSelectRow = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  readonly virtualScroll = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN itemSize，对应 cdk scroll 中的参数
   * @en_US itemSize，corresponding to the parameters in cdk scroll
   */
  readonly itemSize = input<number, XNumber>(42, { transform: XToNumber });
  /**
   * @zh_CN 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US Exceed the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  readonly minBufferPx = input<number, XNumber>(100, { transform: XToNumber });
  /**
   * @zh_CN 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US Render the pixels of the new data buffer, corresponding to the parameters in cdk scroll
   */
  readonly maxBufferPx = input<number, XNumber>(200, { transform: XToNumber });
  /**
   * @zh_CN 自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   * @en_US Adaptive height, table height is equal to the screen height minus the value set here
   */
  readonly adaptionHeight = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 文档高度百分比，弹窗百分比高度用到
   * @en_US Document height percentage, used by pop-up window percentage height
   */
  readonly docPercent = input<number, XNumber>(1, { transform: XToNumber });
  /**
   * @zh_CN 滚动区域高宽
   * @en_US Height and width of rolling area
   */
  readonly scroll = input<{ x: number; y: number }>();
  /**
   * @zh_CN 单元格配置规则
   * @en_US Cell config rules
   */
  readonly cellConfig = input<XTableCellConfigRule>();
  /**
   * @zh_CN 行条件样式
   * @en_US Row condition class
   */
  readonly rowClass = input<(row: XTableRow, index: number) => { [className: string]: boolean }>();
  /**
   * @zh_CN 树形表格下的层级
   * @en_US The level under the tree table
   */
  readonly level = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 树形表格展开所有节点
   * @en_US Tree table
   */
  readonly expandedAll = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 自定义展开内容
   * @en_US Customized expansion content
   */
  readonly expandTpl = input<XTemplate>();
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
@Component({ selector: `${XTableFootPrefix}-property`, template: '' })
export class XTableFootProperty extends XProperty {
  /**
   * @zh_CN 表格页尾
   * @en_US Table footer
   */
  readonly footer = input<XTemplate>();
  /**
   * @zh_CN 表头和行高，单位 px
   * @en_US Header and row height, unit px
   */
  readonly rowHeight = input<number | null, XNumber>(null, { transform: XToNumber });
}
