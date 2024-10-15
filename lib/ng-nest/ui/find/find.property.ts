import { XToBoolean, XToNumber, XToCssPixelValue, XToDataConvert } from '@ng-nest/ui/core';
import { Component, input, model, output } from '@angular/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { XTreeNode } from '@ng-nest/ui/tree';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XBoolean,
  XData,
  XNumber,
  XSort,
  XQuery,
  XFilter,
  XSize,
  XAlign,
  XJustify,
  XDirection
} from '@ng-nest/ui/core';

/**
 * Find
 * @selector x-find
 * @decorator component
 */
export const XFindPrefix = 'x-find';
const X_FIND_CONFIG_NAME = 'find';

/**
 * Find search option
 */
export interface XFindSearchOption extends XFilter {
  label?: string;
  button?: string;
}

/**
 * Find Property
 */
@Component({ selector: `${XFindPrefix}-property`, template: '' })
export class XFindProperty extends XFormControlFunction(X_FIND_CONFIG_NAME) {
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 多选
   * @en_US Multiple choice
   */
  readonly multiple = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 选中 label 名称字段
   * @en_US Check the label name field
   */
  readonly columnLabel = input<string>(this.config?.columnLabel ?? 'label');
  /**
   * @zh_CN 弹框标题
   * @en_US Bullet title
   */
  readonly dialogTitle = input<string>(this.config?.dialogTitle ?? '查找选择');
  /**
   * @zh_CN 弹框表格选择列头名称
   * @en_US Ball Form Select List Name
   */
  readonly dialogCheckboxLabel = input<string>(this.config?.dialogCheckboxLabel ?? '选择');
  /**
   * @zh_CN 弹框表格选择列宽
   * @en_US Ball Form Select List width
   */
  readonly dialogCheckboxWidth = input<string, XNumber>(this.config?.dialogCheckboxWidth ?? '60px', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 弹框选择数据为空的提示信息
   * @en_US Ball box selection data empty prompt information
   */
  readonly dialogEmptyContent = input<string>(this.config?.dialogEmptyContent ?? '请选择数据');
  /**
   * @zh_CN 弹框宽度
   * @en_US Bullet frame width
   */
  readonly dialogWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框高度
   * @en_US Height of bullet frame
   */
  readonly dialogHeight = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框显示，隐藏
   * @en_US Bullet box display, hide
   */
  readonly dialogVisible = model<boolean>(false);
  /**
   * @zh_CN 按钮居中
   * @en_US Button centered
   */
  readonly dialogButtonsCenter = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 表格行数据
   * @en_US Table row data
   */
  readonly tableData = input<XData<XTableRow>, XData<XTableRow>>([], { transform: XToDataConvert });
  /**
   * @zh_CN 表格页码
   * @en_US Table page number
   */
  readonly tableIndex = model<number>(this.config?.tableIndex ?? 1);
  /**
   * @zh_CN 表每页数据条数
   * @en_US Number of data items per page
   */
  readonly tableSize = model<number>(this.config?.tableSize ?? 10);
  /**
   * @zh_CN 表格查询条件
   * @en_US Number of data items per page
   */
  readonly tableQuery = model<XQuery>({});
  /**
   * @zh_CN 表格数据总条数
   * @en_US Total number of table data
   */
  readonly tableTotal = model<number>(0);
  /**
   * @zh_CN 排序点击的事件
   * @en_US Sort click events
   */
  readonly tableSortChange = output<XSort[]>();
  /**
   * @zh_CN 表格列参数
   * @en_US Table column parameters
   */
  readonly tableColumns = input<XTableColumn[]>([]);
  /**
   * @zh_CN 当前选中行数据
   * @en_US Currently selected row data
   */
  readonly tableActivatedRow = model<any>();
  /**
   * @zh_CN 表格行点击事件
   * @en_US Table row click event
   */
  readonly tableRowEmit = output<any>();
  /**
   * @zh_CN 表格行点击事件
   * @en_US Table row click event
   */
  readonly tableCheckedRow = model<{ [property: string]: any[] }>({});
  /**
   * @zh_CN 是否启用加载 loading
   * @en_US Whether to enable loading loading
   */
  readonly tableLoading = input<boolean, XBoolean>(this.config?.tableLoading ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 表格开启虚拟滚动
   * @en_US Table opens virtual scrolling
   */
  readonly tableVirtualScroll = input<boolean, XBoolean>(this.config?.tableVirtualScroll ?? false, {
    transform: XToBoolean
  });
  /**
   * @zh_CN 表格滚动区域高宽
   * @en_US table height and width of rolling area
   */
  readonly tableScroll = input<{ x: number; y: number }>();
  /**
   * @zh_CN 表格 body 数据高度
   * @en_US Table body data height
   */
  readonly tableBodyHeight = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 表格超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US The table exceeds the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  readonly tableMinBufferPx = input<number, XNumber>(100, { transform: XToNumber });
  /**
   * @zh_CN 表格渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US The pixels of the new data buffer for the table rendering, corresponding to the parameters in cdk scroll
   */
  readonly tableMaxBufferPx = input<number, XNumber>(200, { transform: XToNumber });
  /**
   * @zh_CN 表格自适应高度，table 高度等于屏幕高度减掉此处设置的数值
   * @en_US Table adaptive height, table height is equal to the screen height minus the value set here
   */
  readonly tableAdaptionHeight = input<number | null, XNumber>(null, { transform: XToNumber });
  /**
   * @zh_CN 表格文档高度百分比，弹窗百分比高度用到
   * @en_US Table document height percentage, used for pop-up window percentage height
   */
  readonly tableDocPercent = input<number, XNumber>(1, { transform: XToNumber });
  /**
   * @zh_CN 表格行高度，单位 px
   * @en_US Table row height, unit px
   */
  readonly tableRowHeight = input<number, XNumber>(this.config?.tableRowHeight ?? 42, { transform: XToNumber });
  /**
   * @zh_CN 树节点数据
   * @en_US Tree node data
   */
  readonly treeData = input<XData<XTreeNode>, XData<XTreeNode>>([], { transform: XToDataConvert });
  /**
   * @zh_CN 树当前激活的节点 Id
   * @en_US Id of the currently active node of the tree
   */
  readonly treeActivatedId = model<any>();
  /**
   * @zh_CN 树默认展开的层级
   * @en_US The level of the tree expanded by default
   */
  readonly treeExpandedLevel = input<number, XNumber>(this.config?.treeExpandedLevel ?? 0, { transform: XToNumber });
  /**
   * @zh_CN 树 checkbox 选中的节点
   * @en_US Tree checkbox selected node
   */
  readonly treeChecked = model<any[]>([]);
  /**
   * @zh_CN 树显示多选框
   * @en_US Tree display checkbox
   */
  readonly treeCheckbox = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 树和表格同时存在的时候，树节点 id 对应表格的属性，用来做表格数据过滤
   * @en_US When the tree and the table exist at the same time, the tree node id corresponds to the attribute of the table, which is used to filter the table data
   */
  readonly treeTableConnect = input<any>();
  /**
   * @zh_CN 数据查询过滤表单
   * @en_US form for data filter
   */
  readonly search = model<XFindSearchOption | null>(null);
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  override readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  override readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  override readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  override readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * Find Option
 */
export interface XFindOption extends XFormOption {
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: boolean;
  /**
   * @zh_CN 多选
   * @en_US Multiple choice
   */
  multiple?: boolean;
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
   * @zh_CN 弹框表格选择列头名称
   * @en_US Ball Form Select List Name
   */
  dialogCheckboxLabel?: string;
  /**
   * @zh_CN 弹框表格选择列宽
   * @en_US Ball Form Select List width
   */
  dialogCheckboxWidth?: string;
  /**
   * @zh_CN 弹框选择数据为空的提示信息
   * @en_US Ball box selection data empty prompt information
   */
  dialogEmptyContent?: string;
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
   * @en_US Bullet box display, hide
   */
  dialogVisible?: boolean;
  /**
   * @zh_CN 按钮居中
   * @en_US Button centered
   */
  dialogButtonsCenter?: boolean;
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
   * @zh_CN 表格查询条件
   * @en_US Number of data items per page
   */
  tableQuery?: XQuery;
  /**
   * @zh_CN 表格数据总条数
   * @en_US Total number of table data
   */
  tableTotal?: number;
  /**
   * @zh_CN 排序点击的事件
   * @en_US Sort click events
   */
  tableSortChange?: XSort[];
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
  tableRowEmit?: any;
  /**
   * @zh_CN 表格行点击事件
   * @en_US Table row click event
   */
  tableCheckedRow?: { [property: string]: any[] };
  /**
   * @zh_CN 是否启用加载 loading
   * @en_US Whether to enable loading loading
   */
  tableLoading?: boolean;
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
  tableAdaptionHeight?: number;
  /**
   * @zh_CN 表格文档高度百分比，弹窗百分比高度用到
   * @en_US Table document height percentage, used for pop-up window percentage height
   */
  tableDocPercent?: number;
  /**
   * @zh_CN 表格行高度，单位 px
   * @en_US Table row height, unit px
   */
  tableRowHeight?: number;
  /**
   * @zh_CN 树节点数据
   * @en_US Tree node data
   */
  treeData?: XData<XTreeNode>;
  /**
   * @zh_CN 树当前激活的节点 Id
   * @en_US Id of the currently active node of the tree
   */
  treeActivatedId?: any;
  /**
   * @zh_CN 树默认展开的层级
   * @en_US The level of the tree expanded by default
   */
  treeExpandedLevel?: number;
  /**
   * @zh_CN 树 checkbox 选中的节点
   * @en_US Tree checkbox selected node
   */
  treeChecked?: any[];
  /**
   * @zh_CN 树显示多选框
   * @en_US Tree display checkbox
   */
  treeCheckbox?: boolean;
  /**
   * @zh_CN 树和表格同时存在的时候，树节点 id 对应表格的属性，用来做表格数据过滤
   * @en_US When the tree and the table exist at the same time, the tree node id corresponds to the attribute of the table, which is used to filter the table data
   */
  treeTableConnect?: any;
  /**
   * @zh_CN 数据查询过滤表单
   * @en_US form for data filter
   */
  search?: XFindSearchOption;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  label?: string;
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  labelWidth?: string;
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  labelAlign?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  justify?: XJustify;
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  align?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  direction?: XDirection;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  required?: boolean;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  pattern?: RegExp | RegExp[];
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  message?: string | string[];
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  active?: boolean;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  inputValidator?: (value: any) => boolean;
}
