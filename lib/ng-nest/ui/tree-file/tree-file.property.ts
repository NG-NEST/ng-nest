import { XProperty, XParentIdentityProperty, XDataConvert, XData } from '@ng-nest/ui/core';
import { Component, Input } from '@angular/core';
import { XTreeNode } from '@ng-nest/ui/tree';
import { SafeHtml } from '@angular/platform-browser';

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
export class XTreeFileProperty extends XProperty {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XTreeFileNode> = [];
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
   * 文件地址，配置了地址将从 url 中加载文件内容
   */
  url?: string;
  /**
   * 文件内容已经加载过
   */
  contentLoaded?: boolean;
}
