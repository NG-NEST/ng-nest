import { XPropertyFunction, XToBoolean, XToCssPixelValue, XToNumber } from '@ng-nest/ui/core';
import { Component, input, model } from '@angular/core';
import { XTreeNode } from '@ng-nest/ui/tree';
import { XCrumbNode } from '@ng-nest/ui/crumb';
import { XHighlightLines } from '@ng-nest/ui/highlight';
import type { XData, XBoolean, XNumber } from '@ng-nest/ui/core';

/**
 * TreeFile
 * @selector x-tree-file
 * @decorator component
 */
export const XTreeFilePrefix = 'x-tree-file';
const X_TREE_FILE_CONFIG_NAME = 'treeFile';

/**
 * TreeFile Property
 */
@Component({ selector: `${XTreeFilePrefix}-property`, template: '' })
export class XTreeFileProperty extends XPropertyFunction(X_TREE_FILE_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XData<XTreeFileNode>>([]);
  /**
   * @zh_CN 文件绝对路径地址前缀，为空表示取当前运行的地址
   * @en_US File absolute path address prefix, empty means to take the address of the current operation
   */
  readonly domain = input<string>('');
  /**
   * @zh_CN 切换状态
   * @en_US Switch state
   */
  readonly toggle = model<boolean>(true);
  /**
   * @zh_CN 显示切换按钮
   * @en_US Show toggle button
   */
  readonly showToggle = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 显示树，为 true 的时候隐藏切换按钮
   * @en_US Show the tree, hide the toggle button when true
   */
  readonly showTree = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 显示面包屑
   * @en_US Show breadcrumbs
   */
  readonly showCrumb = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 最大高度
   * @en_US Maximum height
   */
  readonly maxHeight = input<string, XNumber>(this.config?.maxHeight ?? '37.5rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 单位间距，这个与层级的乘积算出节点的左边距
   * @en_US Unit spacing, the product of this and the level calculates the left margin of the node
   */
  readonly spacing = input<string, XNumber>(this.config?.spacing ?? '1rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 当前激活的节点 Id, 当 multiple 为 true 时，值为数组（默认是 Id 数组，objectArray 为 true，对象数组）
   * @en_US Currently active node Id. When Multiple is true, the value is the Id array
   */
  readonly activatedId = model<any>();
  /**
   * @zh_CN 展开的节点
   * @en_US Expanded node
   */
  readonly expanded = input<any[]>([]);
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
}

/**
 * @zh_CN TreeFile 数据对象
 * @en_US TreeFile data object
 */
export interface XTreeFileNode extends XTreeNode {
  /**
   * @zh_CN 子节点
   * @en_US Child node
   */
  children?: XTreeFileNode[];
  /**
   * @zh_CN 文件内容
   * @en_US Document content
   */
  content?: string;
  /**
   * @zh_CN 文件类型
   * @en_US File type
   */
  type?: string;
  /**
   * @zh_CN 文件分类
   * @en_US File classification
   */
  fileType?: XTreeFileType;
  /**
   * @zh_CN 文件地址，配置了地址将从 url 中加载文件内容
   * @en_US File address, the configured address will load the file content from url
   */
  url?: string;
  /**
   * @zh_CN 文件的面包屑数据
   * @en_US Breadcrumb data
   */
  crumbData?: XCrumbNode[];
  /**
   * @zh_CN 文件内容已经加载过
   * @en_US File content has been loaded
   */
  contentLoaded?: boolean;
  /**
   * @zh_CN 行高亮着色
   * @en_US Line highlight coloring
   */
  highlightLines?: XHighlightLines;
}

/**
 * @zh_CN 文件分类
 * @en_US File classification
 */
export type XTreeFileType = 'code' | 'img';

/**
 * @zh_CN 支持显示的图片格式
 * @en_US Supported picture format
 */
export const XTreeFileImgs = ['webp', 'png', 'jpg', 'gif', 'jpeg', 'ico'];
