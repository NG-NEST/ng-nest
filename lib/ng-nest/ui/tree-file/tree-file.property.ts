import { XDataConvert, XData, XInputBoolean, XBoolean, XInputNumber, XNumber } from '@ng-nest/ui/core';
import { Component, Input } from '@angular/core';
import { XTreeNode, XTreeProperty } from '@ng-nest/ui/tree';
import { XCrumbNode } from '@ng-nest/ui/crumb';
import { XHighlightLines } from '@ng-nest/ui/highlight';

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
   * 文件绝对路径地址前缀，为空表示取当前运行的地址
   */
  @Input() domain: string = '';
  /**
   * 切换状态
   */
  @Input() @XInputBoolean() toggle: XBoolean = true;
  /**
   * 显示切换按钮
   */
  @Input() @XInputBoolean() showToggle: XBoolean = true;
  /**
   * 显示树，为 true 的时候隐藏切换按钮
   */
  @Input() @XInputBoolean() showTree: XBoolean = true;
  /**
   * 显示面包屑
   */
  @Input() @XInputBoolean() showCrumb: XBoolean = true;
  /**
   * 最大高度，单位 rem
   */
  @Input() @XInputNumber() maxHeight: XNumber = 37.5;
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
   * 文件分类
   */
  fileType?: XTreeFileType;
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
  /**
   * 行高亮着色
   */
  highlightLines?: XHighlightLines;
}

/**
 * 文件分类
 */
export type XTreeFileType = 'code' | 'img';

/**
 * 支持显示的图片格式
 */
export const XTreeFileImgs = ['webp', 'png', 'jpg', 'gif', 'jpeg', 'ico'];
