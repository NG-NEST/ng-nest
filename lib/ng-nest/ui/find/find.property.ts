import {
  XControlValueAccessor,
  XFormOption,
  XRepositoryAbstract,
  XInputBoolean,
  XBoolean,
  XDataConvert,
  XData,
  XInputNumber,
  XNumber
} from '@ng-nest/ui/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { XTableOption, XTableColumn, XTableAction } from '@ng-nest/ui/table';
import { XDialogOption } from '@ng-nest/ui/dialog';
import { XTreeNode } from '@ng-nest/ui/tree';

/**
 * Find
 * @selector x-find
 * @decorator component
 */
export const XFindPrefix = 'x-find';

/**
 * Find Property
 */
@Component({ template: '' })
export class XFindProperty extends XControlValueAccessor<any | any[]> implements XFindOption {
  /**
   * 多选
   */
  @Input() @XInputBoolean() multiple: XBoolean = false;
  /**
   * 选中 label 名称字段
   */
  @Input() columnLabel: string = 'label';
  /**
   * 弹框标题
   */
  @Input() dialogTitle: string = '查找选择';
  /**
   * 弹框宽度
   */
  @Input() dialogWidth: string;
  /**
   * 弹框高度
   */
  @Input() dialogHeight: string;
  /**
   * 弹框显示，隐藏
   */
  @Input() @XInputBoolean() dialogVisible: boolean = false;
  /**
   * 按钮居中
   */
  @Input() @XInputBoolean() dialogButtonsCenter: XBoolean;
  /**
   * 表格列参数
   */
  @Input() tableColumns: XTableColumn[] = [];
  /**
   * 表格操作按钮
   */
  @Input() tableActions: XTableAction[] = [];
  /**
   * 表格服务
   */
  @Input() tableService?: XRepositoryAbstract;
  /**
   * 当前选中行数据
   */
  @Input() tableActivatedRow?: any;
  /**
   * 表格显示查询
   */
  @Input() @XInputBoolean() tableSearchShow: XBoolean = true;
  /**
   * 表格允许行点击选中
   */
  @Input() @XInputBoolean() tableAllowSelectRow: XBoolean = true;
  /**
   * 表格操作按钮点击事件
   */
  @Output() tableActionEmit = new EventEmitter<XTableAction>();
  /**
   * 表格行点击事件
   */
  @Output() tableRowEmit = new EventEmitter<any>();

  /**
   * 树节点数据
   */
  @Input() @XDataConvert() treeData: XData<XTreeNode> = [];
  /**
   * 树当前点击选中的节点变化的事件
   */
  @Output() treeActivatedChange = new EventEmitter<XTreeNode>();
  /**
   * 树当前激活的节点 Id
   */
  @Input() treeActivatedId: any;
  /**
   * 默认展开的层级
   */
  @Input() @XInputNumber() treeExpandedLevel: XNumber = 0;
  /**
   * checkbox 选中的节点
   */
  @Input() treeChecked: any[] = [];
  /**
   * 显示多选框
   */
  @Input() @XInputBoolean() treeCheckbox: XBoolean;
}

/**
 * Find Option
 * @undocument true
 */
export interface XFindOption extends XFormOption {
  /**
   * 弹框参数
   */
  dialog?: XDialogOption;
  /**
   * 表格参数
   */
  table?: XTableOption;
}
