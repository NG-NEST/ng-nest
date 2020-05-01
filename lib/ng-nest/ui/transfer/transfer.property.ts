import { XData, XControlValueAccessor, XDataConvert, XInputBoolean, XParentIdentityProperty, XBoolean } from '@ng-nest/ui/core';
import { TemplateRef, Input, Component } from '@angular/core';

/**
 * Transfer
 * @selector x-transfer
 * @decorator component
 */
export const XTransferPrefix = 'x-transfer';

/**
 * Transfer Property
 */
@Component({ template: '' })
export class XTransferProperty extends XControlValueAccessor<any[]> {
  /**
   * 数据对象
   */
  @Input() @XDataConvert() data: XData<XTransferNode> = [];
  /**
   * 标题
   */
  @Input() titles: string[] = ['列表 1', '列表 2'];
  /**
   * 是否能拖动
   */
  @Input() @XInputBoolean() drag: XBoolean;
  /**
   * 是否显示搜索
   */
  @Input() @XInputBoolean() search: XBoolean;
  /**
   * 数据自定义模板
   */
  @Input() nodeTpl: TemplateRef<any>;
  /**
   * 标题自定义模板
   */
  @Input() titleTpl: TemplateRef<any>;
}

/**
 * Transfer
 */
export interface XTransferNode extends XParentIdentityProperty<XTransferNode> {
  /**
   * checkbox 是否选中
   */
  checked?: boolean;
  /**
   * 序号
   */
  index?: number;
}

export interface XTransferSource {
  /**
   * 标题
   */
  title?: string;
  /**
   * 搜索的数据
   */
  searchInput?: string;
  /**
   * 全选
   */
  checkedAll?: boolean;
  /**
   * 选中的数量
   */
  checkedCount?: number;
  /**
   * 不确定状态的样式
   */
  indeterminate?: boolean;
  /**
   * 列表数据
   */
  list?: XTransferNode[];
  /**
   * 搜索数据，用来还原
   */
  searchList?: XTransferNode[];
  /**
   * 按钮禁用
   */
  disabledButton?: boolean;
}
