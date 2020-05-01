import { XDataConvert, XProperty, XData, XInputBoolean, XParentIdentityProperty, XNumber, XBoolean, XInputNumber } from '@ng-nest/ui/core';
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
   * 当前激活的节点 Id
   */
  @Input('activated-id') activatedId: any;
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
  @Input('expanded-all') @XInputBoolean() expandedAll: XBoolean;
  /**
   * 默认展开的层级
   */
  @Input('expanded-level') @XInputNumber() expandedLevel: XNumber = -1;
  /**
   * 点击节点就触发展开/收起的操作，请确保节点上没有其它操作（checkbox、自定义的操作按钮）
   */
  @Input('node-open') @XInputBoolean() nodeOpen: XBoolean;
  /**
   * 单位间距，这个与层级的乘积算出节点的左边距，单位 rem
   */
  @Input() @XInputNumber() spacing: XNumber = 0.875;
  /**
   * 标签自定义模板
   */
  @Input() labelTpl: TemplateRef<void>;
  /**
   * 当前点击选中的节点变化的事件
   */
  @Output() activatedChange = new EventEmitter<XTreeNode>();
  /**
   * 使用 checkedbox 选中变化的事件
   */
  @Output() selectedChange = new EventEmitter<XTreeNode[]>();
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
   * 懒加载函数
   */
  @Input() lazyData: (pid?: any) => Observable<XTreeNode[]>;
}
