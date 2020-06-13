import { XControlValueAccessor, XFormOption, XRepositoryAbstract, XInputBoolean, XBoolean } from '@ng-nest/ui/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { XTableOption, XTableColumn, XTableAction } from '@ng-nest/ui/table';
import { XDialogOption } from '@ng-nest/ui/dialog';

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
export class XFindProperty extends XControlValueAccessor<any> implements XFindOption {
  /**
   * 选中 label 名称字段
   */
  @Input() columnLabel: string = 'label';
  /**
   * 弹框标题
   */
  @Input() dialogTitle: string = '查找';
  /**
   * 弹框宽度
   */
  @Input() dialogWidth: string = '50rem';
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
  @Input() tableColumn: XTableColumn[] = [];
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
