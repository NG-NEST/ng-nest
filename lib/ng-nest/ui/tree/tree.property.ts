import { XProperty, XPropertyFunction, XToBoolean, XToNumber, XToCssPixelValue } from '@ng-nest/ui/core';
import { TemplateRef, Component, input, output, model } from '@angular/core';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import type { XData, XParentIdentityProperty, XNumber, XBoolean, XIdentityProperty, XAlign } from '@ng-nest/ui/core';

/**
 * Tree
 * @selector x-tree
 * @decorator component
 */
export const XTreePrefix = 'x-tree';
const X_TREE_CONFIG_NAME = 'tree';

/**
 * Tree Property
 */
@Component({ selector: `${XTreePrefix}-property`, template: '' })
export class XTreeProperty extends XPropertyFunction(X_TREE_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XData<XTreeNode>>([]);
  /**
   * @zh_CN 显示多选框
   * @en_US Show checkbox
   */
  readonly checkbox = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 开启懒加载节点，data 必须设置成函数类型
   * @en_US Open lazy loading node, data must be set to function type
   */
  readonly lazy = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 当前激活的节点 Id, 当 multiple 为 true 时，值为数组（默认是 Id 数组，objectArray 为 true，对象数组）
   * @en_US Currently active node Id. When Multiple is true, the value is the Id array
   */
  readonly activatedId = model<any>(null);
  /**
   * @zh_CN 展开的节点
   * @en_US Expanded node
   */
  readonly expanded = model<any[]>([]);
  /**
   * @zh_CN checkbox 选中的节点
   * @en_US Checkbox selected node
   */
  readonly checked = model<any[]>([]);
  /**
   * @zh_CN 展开所有节点
   * @en_US Expand all nodes
   */
  readonly expandedAll = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 默认展开的层级
   * @en_US Default expanded level
   */
  readonly expandedLevel = input<number, XNumber>(-1, { transform: XToNumber });
  /**
   * @zh_CN 点击节点就触发展开/收起的操作，请确保节点上没有其它操作（checkbox、自定义的操作按钮）
   * @en_US Click the node to trigger the expand/collapse operation, please make sure that there are no other operations on the node (checkbox, custom operation button)
   */
  readonly nodeOpen = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 单位间距，这个与层级的乘积算出节点的左边距
   * @en_US Unit spacing, the product of this and the level calculates the left margin of the node
   */
  readonly spacing = input<string, XNumber>(this.config?.spacing ?? '1.5rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签自定义模板
   * @en_US Label custom template
   */
  readonly labelTpl = input<TemplateRef<void>>();
  /**
   * @zh_CN 节点的高度, 默认是自适应高度
   * @en_US The height of the node
   */
  readonly nodeHeight = input<string, XNumber>(this.config?.nodeHeight ?? '', { transform: XToCssPixelValue });
  /**
   * @zh_CN 是否允许多次点击一个节点触发多次事件
   * @en_US Whether to allow multiple clicks on a node to trigger multiple events
   */
  readonly allowManyActivated = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 拖动节点
   * @en_US Drag node
   */
  readonly drag = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 当前点击选中的节点变化的事件
   * @en_US The event of the currently clicked node change
   */
  readonly activatedChange = output<XTreeNode>();
  /**
   * @zh_CN 使用 checkedbox 选中变化的事件
   * @en_US Use checkedbox to select changed events
   */
  readonly checkboxChange = output<XTreeNode>();
  /**
   * @zh_CN 如果 data 是函数类型，可以通过此参数控制请求，用于弹框中的表格，弹出后再请求
   * @en_US If data is a function type, you can use this parameter to control the request, which is often used in the form in the pop-up box, and then request it after it pops up
   */
  readonly manual = model<boolean>(true);
  /**
   * @zh_CN checkbox 状态改变触发层级检查
   * @en_US Checkbox status changes trigger level checks
   */
  readonly levelCheck = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 节点内容不换行显示省略号
   * @en_US Show ellipsis without wrapping
   */
  readonly nodeNowrap = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 节点垂直对齐方式
   * @en_US Show ellipsis without wrapping
   */
  readonly nodeAlignItems = input<XAlign>(this.config?.nodeAlignItems ?? 'center');
  /**
   * @zh_CN 树节点操作按钮
   * @en_US Tree node operation buttons
   */
  readonly actions = input<XTreeAction[]>([]);
  /**
   * @zh_CN 滚动区域元素
   * @en_US Rolling area element
   */
  readonly scrollElement = input<HTMLElement>();
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  readonly virtualScroll = input<boolean, XBoolean>(this.config?.virtualScroll ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 滚动区域高度，开启虚拟滚动的时候生效
   * @en_US Rolling area height
   */
  readonly virtualScrollHeight = input<string, XNumber>(this.config?.virtualScrollHeight ?? '400px', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 虚拟滚动高度自适应指定元素
   * @en_US virtual rolling height follows the specified object
   */
  readonly heightAdaption = input<HTMLElement>();
  /**
   * @zh_CN itemSize，对应 cdk scroll 中的参数，开启虚拟滚动才生效
   * @en_US itemSize，corresponding to the parameters in cdk scroll
   */
  readonly itemSize = input<number, XNumber>(this.config?.itemSize ?? 34, { transform: XToNumber });
  /**
   * @zh_CN 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数，开启虚拟滚动才生效
   * @en_US Exceed the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  readonly minBufferPx = input<number, XNumber>(100, { transform: XToNumber });
  /**
   * @zh_CN 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数，开启虚拟滚动才生效
   * @en_US Render the pixels of the new data buffer, corresponding to the parameters in cdk scroll
   */
  readonly maxBufferPx = input<number, XNumber>(200, { transform: XToNumber });
  /**
   * @zh_CN 多选功能，当前激活的节点可以是多个
   * @en_US Multiple choice
   */
  readonly multiple = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 当开启多选的时候，activatedId 的值为对象数组
   * @en_US When multiple selection is enabled, the value of activatedId is an array of objects
   */
  readonly objectArray = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 关键字高亮，针对下拉树搜索
   * @en_US Keyword highlighting
   */
  readonly keywordText = input<string | string[]>();
  /**
   * @zh_CN 匹配关键字区分大小写，针对下拉树搜索
   * @en_US Case-sensitive
   */
  readonly caseSensitive = input<boolean, XBoolean>(this.config?.caseSensitive ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 只能选择叶子节点
   * @en_US Only leaf nodes can be selected
   */
  readonly onlyLeaf = input<boolean, XBoolean>(this.config?.onlyLeaf ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 展开收起的图标自定义模版
   * @en_US Expand the folded icon custom template
   */
  readonly expandedIcon = input<TemplateRef<void>>();
  /**
   * @zh_CN 显示连接线
   * @en_US Show line
   */
  readonly showLine = input<boolean, XBoolean>(this.config?.showLine ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  readonly nodeClick = output<XTreeNode>();
  /**
   * @zh_CN 节点开始拖动事件
   * @en_US Node drag started
   */
  readonly nodeDragStarted = output<XTreeNodeDragEvent>();
  /**
   * @zh_CN 节点结束拖动事件
   * @en_US Node drag ended
   */
  readonly nodeDragEnded = output<XTreeNodeDragEvent>();
  /**
   * @zh_CN 节点正在拖动事件
   * @en_US Node drag moved
   */
  readonly nodeDragMoved = output<XTreeNodeDragEvent>();
}

/**
 * @zh_CN Tree 数据对象
 * @en_US Tree data object
 */
export interface XTreeNode extends XParentIdentityProperty<XTreeNode> {
  /**
   * @zh_CN 激活的
   * @en_US active
   */
  activated?: boolean;
  /**
   * @zh_CN 检查更新
   * @en_US Check for updates
   */
  change?: Function;
  /**
   * @zh_CN checkbox 是否选中
   * @en_US whether checkbox is selected
   */
  checked?: boolean;
  /**
   * @zh_CN 禁用checkbox
   * @en_US Disable checkbox
   */
  disabled?: boolean;
  /**
   * @zh_CN checkbox 子节点是否有选中的状态
   * @en_US Whether the child node of checkbox is selected
   */
  indeterminate?: boolean;
  /**
   * @zh_CN 节点高度，优先级高于 tree 参数
   * @en_US Node height, highest priority
   */
  height?: string;
  /**
   * @zh_CN 节点内容不换行显示省略号，优先级高于 tree 参数
   * @en_US Show ellipsis without wrapping, highest priority
   */
  nowrap?: boolean;
  /**
   * @zh_CN 节点垂直对齐方式，优先级高于 tree 参数
   * @en_US Show ellipsis without wrapping, highest priority
   */
  alignItems?: XAlign;
  /**
   * @zh_CN 节点懒加载中
   * @en_US Node lazy loading
   */
  loading?: boolean;
  /**
   * @zh_CN 显示拖动指示器
   * @en_US Show drag indicator
   */
  showDragIndicator?: boolean;
  /**
   * @zh_CN 自定义属性
   * @en_US Custom attributes
   */
  [property: string]: any;
}

/**
 * @zh_CN Tree 节点操作
 * @en_US Tree node operation
 */
export interface XTreeAction extends XIdentityProperty {
  /**
   * @zh_CN 操作
   * @en_US Operating
   */
  handler?: Function;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
}

/**
 * @zh_CN Tree 节点拖动事件
 * @en_US Tree node drag event
 */
export interface XTreeNodeDragEvent {
  /**
   * @zh_CN 对应 cdk 中的事件
   * @en_US drag cdk event
   */
  event?: CdkDragStart | CdkDragEnd | CdkDragMove<XTreeNode>;
  /**
   * @zh_CN 拖动的节点
   * @en_US drag node
   */
  from?: XTreeNode;
  /**
   * @zh_CN 要拖动到的位置对应的节点
   * @en_US Node corresponding to the position to drag
   */
  to?: XTreeNode;
  /**
   * @zh_CN 对应节点的前面还是后面
   * @en_US The front or back of the corresponding node
   */
  position?: -1 | 0 | 1;
}

/**
 * TreeNode
 * @selector x-tree-node
 * @decorator directive
 */
export const XTreeNodePrefix = 'x-tree-node';

/**
 * TreeNode Property
 */
@Component({ selector: `${XTreeNodePrefix}-property`, template: '' })
export class XTreeNodeProperty extends XProperty {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly node = input<XTreeNode>({});
  /**
   * @zh_CN 层级
   * @en_US Level
   */
  readonly level = model<number | undefined>(0);
  /**
   * @zh_CN 节点的高度
   * @en_US The height of the node
   */
  readonly nodeHeight = model<string>('');
  /**
   * @zh_CN 节点内容不换行显示省略号
   * @en_US Show ellipsis without wrapping
   */
  readonly nodeNowrap = model<boolean>(false);
  /**
   * @zh_CN 节点垂直对齐方式
   * @en_US Show ellipsis without wrapping
   */
  readonly nodeAlignItems = model<XAlign>('center');
  /**
   * @zh_CN 标记为虚拟滚动的节点
   * @en_US Mark as a node of virtual rolling
   */
  readonly virtualScroll = model<boolean | undefined>(false);
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  readonly disabled = model<boolean | undefined>(false);
  /**
   * @zh_CN id
   * @en_US Id
   */
  readonly id = model<any>();
  /**
   * @zh_CN pid
   * @en_US pId
   */
  readonly pid = model<any>();
  /**
   * @zh_CN 叶子节点
   * @en_US A leaf node
   */
  readonly leaf = model<boolean | undefined>(false);
  /**
   * @zh_CN 节点的高度
   * @en_US The height of the node
   */
  readonly height = model<string>('');
  /**
   * @zh_CN 节点垂直对齐方式
   * @en_US Show ellipsis without wrapping
   */
  readonly alignItems = model<XAlign>();
  /**
   * @zh_CN 节点垂直对齐方式
   * @en_US Show ellipsis without wrapping
   */
  readonly loading = model<boolean | undefined>(false);
  /**
   * @zh_CN 展开
   * @en_US open
   */
  readonly open = model<boolean | undefined>(false);
  /**
   * @zh_CN checkbox 是否选中
   * @en_US whether checkbox is selected
   */
  readonly checked = model<boolean | undefined>(false);
  /**
   * @zh_CN checkbox 子节点是否有选中的状态
   * @en_US Whether the child node of checkbox is selected
   */
  readonly indeterminate = model<boolean | undefined>(false);
  /**
   * @zh_CN 节点名称
   * @en_US The name of the node
   */
  readonly label = model<string | undefined>('');
  /**
   * @zh_CN 节点内容不换行显示省略号，优先级高于 tree 参数
   * @en_US Show ellipsis without wrapping, highest priority
   */
  readonly nowrap = model<boolean | undefined>(false);
  /**
   * @zh_CN 节点展开收起事件
   * @en_US Node expansion pack up
   */
  readonly toggle = output<XTreeNode>();
  /**
   * @zh_CN 树节点操作按钮
   * @en_US Tree node operation buttons
   */
  readonly actions = input<XTreeAction[]>([]);
}
