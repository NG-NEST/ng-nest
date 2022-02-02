import {
  XDataConvert,
  XProperty,
  XData,
  XInputBoolean,
  XParentIdentityProperty,
  XNumber,
  XBoolean,
  XInputNumber,
  XIdentityProperty,
  XWithConfig,
  XAlign
} from '@ng-nest/ui/core';
import { Input, TemplateRef, Output, EventEmitter, Component } from '@angular/core';

/**
 * Tree
 * @selector x-tree
 * @decorator component
 */
export const XTreePrefix = 'x-tree';
const X_CONFIG_NAME = 'tree';

/**
 * Tree Property
 */
@Component({ template: '' })
export class XTreeProperty extends XProperty {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XTreeNode> = [];
  /**
   * @zh_CN 显示多选框
   * @en_US Show checkbox
   */
  @Input() @XInputBoolean() checkbox?: XBoolean;
  /**
   * @zh_CN 开启懒加载节点，data 必须设置成函数类型
   * @en_US Open lazy loading node, data must be set to function type
   */
  @Input() @XInputBoolean() lazy?: XBoolean;
  /**
   * @zh_CN 当前激活的节点 Id
   * @en_US Currently active node Id
   */
  @Input() activatedId: any;
  /**
   * @zh_CN 展开的节点
   * @en_US Expanded node
   */
  @Input() expanded: any[] = [];
  /**
   * @zh_CN checkbox 选中的节点
   * @en_US Checkbox selected node
   */
  @Input() checked: any[] = [];
  /**
   * @zh_CN 展开所有节点
   * @en_US Expand all nodes
   */
  @Input() @XInputBoolean() expandedAll?: XBoolean;
  /**
   * @zh_CN 默认展开的层级
   * @en_US Default expanded level
   */
  @Input() @XInputNumber() expandedLevel: XNumber = -1;
  /**
   * @zh_CN 点击节点就触发展开/收起的操作，请确保节点上没有其它操作（checkbox、自定义的操作按钮）
   * @en_US Click the node to trigger the expand/collapse operation, please make sure that there are no other operations on the node (checkbox, custom operation button)
   */
  @Input() @XInputBoolean() nodeOpen?: XBoolean;
  /**
   * @zh_CN 单位间距，这个与层级的乘积算出节点的左边距，单位 rem
   * @en_US Unit spacing, the product of this and the level calculates the left margin of the node, the unit is rem
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 0.875) @XInputNumber() spacing?: XNumber;
  /**
   * @zh_CN 标签自定义模板
   * @en_US Label custom template
   */
  @Input() labelTpl?: TemplateRef<void>;
  /**
   * @zh_CN 节点的高度，单位 rem, 默认 0 是自适应高度
   * @en_US The height of the node in rem
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 0) @XInputNumber() nodeHeight!: XNumber;
  /**
   * @zh_CN 是否允许多次点击一个节点触发多次事件
   * @en_US Whether to allow multiple clicks on a node to trigger multiple events
   */
  @Input() @XInputBoolean() allowManyActivated?: XBoolean;
  /**
   * @zh_CN 当前点击选中的节点变化的事件
   * @en_US The event of the currently clicked node change
   */
  @Output() activatedChange = new EventEmitter<XTreeNode>();
  /**
   * @zh_CN 使用 checkedbox 选中变化的事件
   * @en_US Use checkedbox to select changed events
   */
  @Output() checkboxChange = new EventEmitter<XTreeNode>();
  /**
   * @zh_CN 如果 data 是函数类型，可以通过此参数控制请求，常用于弹框中的表格，弹出后再请求
   * @en_US If data is a function type, you can use this parameter to control the request, which is often used in the form in the pop-up box, and then request it after it pops up
   */
  @Input() @XInputBoolean() manual: boolean = true;
  /**
   * @zh_CN checkbox 状态改变触发层级检查
   * @en_US Checkbox status changes trigger level checks
   */
  @Input() @XInputBoolean() levelCheck: XBoolean = true;
  /**
   * @zh_CN 节点内容不换行显示省略号
   * @en_US Show ellipsis without wrapping
   */
  @Input() @XInputBoolean() nodeNowrap: XBoolean = true;
  /**
   * @zh_CN 节点垂直对齐方式
   * @en_US Show ellipsis without wrapping
   */
  @Input() @XWithConfig<XAlign>(X_CONFIG_NAME, 'center') nodeAlignItems!: XAlign;
  /**
   * @zh_CN 树节点操作按钮
   * @en_US Tree node operation buttons
   */
  @Input() actions: XTreeAction[] = [];
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() virtualScroll!: XBoolean;
  /**
   * @zh_CN 参数控制请求改变事件
   * @en_US Parameter control request change event
   */
  @Output() manualChange = new EventEmitter<boolean>();
}

/**
 * @zh_CN Tree 数据对象
 * @en_US Tree data object
 */
export interface XTreeNode extends XParentIdentityProperty<XTreeNode> {
  /**
   * @zh_CN 展开
   * @en_US Unfold
   */
  open?: boolean;
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
   * @zh_CN 子节点已加载过
   * @en_US Child node has been loaded
   */
  childrenLoaded?: boolean;
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
   * @zh_CN 节点高度，优先级高于 tree 参数，单位 rem
   * @en_US Node height in rem, highest priority
   */
  height?: number;
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
 * TreeNode
 * @selector x-tree-node
 * @decorator directive
 */
export const XTreeNodePrefix = 'x-tree-node';

/**
 * TreeNode Property
 */
@Component({ template: '' })
export class XTreeNodeProperty extends XProperty {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() node: XTreeNode = {};
  /**
   * @zh_CN 层级
   * @en_US Level
   */
  @Input() level?: XNumber;
  /**
   * @zh_CN 懒加载子节点
   * @en_US Lazy loading of child nodes
   */
  @Input() @XInputBoolean() lazy?: XBoolean;
  /**
   * @zh_CN 节点的高度，单位 rem
   * @en_US The height of the node in rem
   */
  @Input() @XInputNumber() nodeHeight: XNumber = 0;
  /**
   * @zh_CN 节点内容不换行显示省略号
   * @en_US Show ellipsis without wrapping
   */
  @Input() @XInputBoolean() nodeNowrap?: XBoolean;
  /**
   * @zh_CN 节点垂直对齐方式
   * @en_US Show ellipsis without wrapping
   */
  @Input() nodeAlignItems: XAlign = 'center';
  /**
   * @zh_CN 懒加载函数
   * @en_US Lazy loading function
   */
  @Input() lazyData!: XData<XTreeNode[]>;
}
