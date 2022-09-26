import {
  XParentIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XData,
  XBoolean,
  XWithConfig,
  XPositionTopBottom,
  XSize,
  XInputNumber,
  XNumber,
  XTemplate
} from '@ng-nest/ui/core';
import { Input, Component, TemplateRef } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Tree Select
 * @selector x-tree-select
 * @decorator component
 */
export const XTreeSelectPrefix = 'x-tree-select';
const X_CONFIG_NAME = 'treeSelect';

/**
 * Tree Select Property
 */
@Component({ template: '' })
export class XTreeSelectProperty extends XControlValueAccessor<any> {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XTreeSelectNode> = [];
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() clearable?: XBoolean;
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  @Input() @XInputBoolean() async?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XPositionTopBottom>(X_CONFIG_NAME, 'bottom') placement?: XPositionTopBottom;
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  @Input() @XInputBoolean() multiple?: XBoolean;
  /**
   * @zh_CN 多选添加全选功能
   * @en_US Multi choice to add full selection function
   */
  @Input() @XInputBoolean() selectAll?: XBoolean;
  /**
   * @zh_CN 全选的文字
   * @en_US Selected all text
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) selectAllText?: string;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size!: XSize;
  /**
   * @zh_CN 默认展开的层级
   * @en_US Default expanded level
   */
  @Input() @XInputNumber() expandedLevel: XNumber = -1;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 下拉框的最大高度
   * @en_US The biggest height of the drop-down box
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '12rem') portalMaxHeight!: string;
  /**
   * @zh_CN 输入搜索
   * @en_US Input search
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) search!: XBoolean;
  /**
   * @zh_CN 匹配区分大小写
   * @en_US Case-sensitive
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) caseSensitive!: XBoolean;
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 200) debounceTime?: number;
  /**
   * @zh_CN 多选时显示的选中数据个数，其它的在更多中显示，默认全部显示
   * @en_US Display the number of data in the maximum election, and the others are displayed in more of them
   */
  @Input() @XInputNumber() @XWithConfig<XNumber>(X_CONFIG_NAME) maxTagCount?: XNumber;
  /**
   * @zh_CN 多选时显示的个数超过指定个数，显示的文字模版
   * @en_US The number displayed when multiple choices exceeds the specified number, the displayed text template displayed
   * @default '更多{{surplus}}个选中'
   */
  @Input() @XWithConfig<XTemplate>(X_CONFIG_NAME) maxTagContent?: XTemplate;
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() virtualScroll!: XBoolean;
  /**
   * @zh_CN 显示的值展示路径 AA > BB > CC
   * @en_US Display value display path. AA > BB > CC
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) @XInputBoolean() showPath!: XBoolean;
  /**
   * @zh_CN 路径分隔符
   * @en_US Path separator
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, ' / ') separator?: string;
}

/**
 * Tree Select Option
 * @undocument true
 */
export interface XTreeSelectOption extends XFormOption {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  data?: XData<XTreeSelectNode>;
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  async?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XPositionTopBottom;
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  multiple?: XBoolean;
  /**
   * @zh_CN 多选添加全选功能
   * @en_US Multi choice to add full selection function
   */
  selectAll?: XBoolean;
  /**
   * @zh_CN 全选的文字
   * @en_US Selected all text
   */
  selectAllText?: string;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: XBoolean;
  /**
   * @zh_CN 下拉框的最大高度
   * @en_US The biggest height of the drop-down box
   */
  portalMaxHeight?: string;
  /**
   * @zh_CN 输入搜索
   * @en_US Input search
   */
  search?: XBoolean;
}

/**
 * @zh_CN Tree Select 数据对象
 * @en_US Tree Select data object
 */
export interface XTreeSelectNode extends XParentIdentityProperty<XTreeSelectNode> {
  /**
   * @zh_CN 当前节点路径名称
   * @en_US Current node path name
   */
  path?: string;
  /**
   * @zh_CN 自定义属性
   * @en_US Custom attribute
   */
  [property: string]: any;
}

/**
 * Tree Select Portal
 * @selector x-tree-select-portal
 * @decorator component
 */
export const XTreeSelectPortalPrefix = 'x-tree-select-portal';
