import { XDataConvert, XData, XInputBoolean, XBoolean, XInputNumber, XNumber } from '@ng-nest/ui/core';
import { Component, Input } from '@angular/core';
import { XTreeNode, XTreeProperty } from '@ng-nest/ui/tree';
import { XCrumbNode } from '@ng-nest/ui/crumb';

/**
 * TreeFile
 * @selector x-tree-file
 * @decorator component
 */
export const XTreeFilePrefix = 'x-tree-file';

/**
 * TreeFile Property
 */
@Component({ template: '' })
export class XTreeFileProperty extends XTreeProperty {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XTreeFileNode> = [];
  /**
   * 隐藏树
   */
  @Input('hidden-tree') @XInputBoolean() hiddenTree: XBoolean;
  /**
   * 单位间距，这个与层级的乘积算出节点的左边距，单位 rem
   */
  @Input() @XInputNumber() spacing: XNumber = 0.5;
}

/**
 * TreeFile 数据对象
 */
export interface XTreeFileNode extends XTreeNode {
  /**
   * 子节点
   */
  children?: XTreeFileNode[];
  /**
   * 文件内容
   */
  content?: string;
  /**
   * 文件类型
   */
  type?: string;
  /**
   * 文件地址，配置了地址将从 url 中加载文件内容
   */
  url?: string;
  /**
   * 文件的面包屑数据
   */
  crumbData?: XCrumbNode[];
  /**
   * 文件内容已经加载过
   */
  contentLoaded?: boolean;
}
