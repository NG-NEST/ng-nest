import {
  XDataConvert,
  XProperty,
  XData,
  XInputBoolean,
  XParentIdentityProperty,
  XNumber,
  XBoolean,
  XInputNumber,
  XIdentityProperty
} from '@ng-nest/ui/core';
import { Input, TemplateRef, Output, EventEmitter, Component } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Tree
 * @selector x-tree
 * @decorator component
 */
export const XTreePrefix = 'x-tree';

/**
 * Tree Property
 */
@Component({ template: '' })
export class XTreeProperty extends XProperty {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XTreeNode> = [];
  /**
   * 显示多选框
   */
  @Input() @XInputBoolean() checkbox: XBoolean;
  /**
   * 开启懒加载节点，data 必须设置成函数类型
   */
  @Input() @XInputBoolean() lazy: XBoolean;
  /**
   * 当前激活的节点 Id
   */
  @Input() activatedId: any;
  /**
   * 展开的节点
   */
  @Input() expanded: any[] = [];
  /**
   * checkbox 选中的节点
   */
  @Input() checked: any[] = [];
  /**
   * 展开所有节点
   */
  @Input() @XInputBoolean() expandedAll: XBoolean;
  /**
   * 默认展开的层级
   */
  @Input() @XInputNumber() expandedLevel: XNumber = -1;
  /**
   * 点击节点就触发展开/收起的操作，请确保节点上没有其它操作（checkbox、自定义的操作按钮）
   */
  @Input() @XInputBoolean() nodeOpen: XBoolean;
  /**
   * 单位间距，这个与层级的乘积算出节点的左边距，单位 rem
   */
  @Input() @XInputNumber() spacing: XNumber = 0.875;
  /**
   * 标签自定义模板
   */
  @Input() labelTpl: TemplateRef<void>;
  /**
   * 节点的高度，单位 rem
   */
  @Input() @XInputNumber() nodeHeight: XNumber = 1.625;
  /**
   * 是否允许多次点击一个节点触发多次事件
   */
  @Input() @XInputBoolean() allowManyActivated: XBoolean;
  /**
   * 当前点击选中的节点变化的事件
   */
  @Output() activatedChange = new EventEmitter<XTreeNode>();
  /**
   * 使用 checkedbox 选中变化的事件
   */
  @Output() checkboxChange = new EventEmitter<XTreeNode>();
  /**
   * 如果 data 是函数类型，可以通过此参数控制请求，常用于弹框中的表格，弹出后再请求
   */
  @Input() @XInputBoolean() manual: boolean = true;
  /**
   * checkbox 状态改变触发层级检查
   */
  @Input() @XInputBoolean() levelCheck: XBoolean = true;
  /**
   * 树节点操作按钮
   */
  @Input() actions: XTreeAction[] = [];
  /**
   * 参数控制请求改变事件
   */
  @Output() manualChange = new EventEmitter<boolean>();
}

/**
 * Tree 数据对象
 */
export interface XTreeNode extends XParentIdentityProperty<XTreeNode> {
  /**
   * 展开
   */
  open?: boolean;
  /**
   * 激活的
   */
  activated?: boolean;
  /**
   * 检查更新
   */
  change?: Function;
  /**
   * 子节点已加载过
   */
  childrenLoaded?: boolean;
  /**
   * checkbox 是否选中
   */
  checked?: boolean;
  /**
   * 禁用checkbox
   */
  disabled?: boolean;
  /**
   * checkbox 子节点是否有选中的状态
   */
  indeterminate?: boolean;
  /**
   * 自定义属性
   */
  [property: string]: any;
}

/**
 * Tree 节点操作
 */
export interface XTreeAction extends XIdentityProperty {
  /**
   * 操作
   */
  handler?: Function;
  /**
   * 图标
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
export class XTreeNodeProperty {
  /**
   * 节点数据
   */
  @Input() node: XTreeNode = {};
  /**
   * 层级
   */
  @Input() level: XNumber;
  /**
   * 懒加载子节点
   */
  @Input() @XInputBoolean() lazy: XBoolean;
  /**
   * 节点的高度，单位 rem
   */
  @Input() @XInputNumber() nodeHeight: XNumber = 1.625;
  /**
   * 懒加载函数
   */
  @Input() lazyData: (pid?: any) => Observable<XTreeNode[]>;
}
