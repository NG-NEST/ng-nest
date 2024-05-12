import { XToDataConvert, XToBoolean, XToNumber, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XParentIdentityProperty,
  XData,
  XBoolean,
  XPositionTopBottom,
  XSize,
  XNumber,
  XTemplate,
  XDirection,
  XAlign,
  XJustify
} from '@ng-nest/ui/core';

/**
 * Tree Select
 * @selector x-tree-select
 * @decorator component
 */
export const XTreeSelectPrefix = 'x-tree-select';
const X_TREE_SELECT_CONFIG_NAME = 'treeSelect';

/**
 * Tree Select Property
 */
@Component({ selector: `${XTreeSelectPrefix}-property`, template: '' })
export class XTreeSelectProperty extends XFormControlFunction(X_TREE_SELECT_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XData<XTreeSelectNode>, XData<XTreeSelectNode>>([], { transform: XToDataConvert });
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  readonly clearable = input<boolean, XBoolean>(this.config?.clearable ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  readonly async = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  readonly placement = input<XPositionTopBottom>(this.config?.placement ?? 'bottom');
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  readonly multiple = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 多选添加全选功能
   * @en_US Multi choice to add full selection function
   */
  readonly selectAll = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 全选的文字
   * @en_US Selected all text
   */
  readonly selectAllText = input<string>(this.config?.selectAllText ?? '');
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 默认展开的层级
   * @en_US Default expanded level
   */
  readonly expandedLevel = input<number, XNumber>(-1, { transform: XToNumber });
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 下拉框的最大高度
   * @en_US The biggest height of the drop-down box
   */
  readonly portalMaxHeight = input<string, XNumber>(this.config?.portalMaxHeight ?? '12rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 输入搜索
   * @en_US Input search
   */
  readonly search = input<boolean, XBoolean>(this.config?.search ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 匹配区分大小写
   * @en_US Case-sensitive
   */
  readonly caseSensitive = input<boolean, XBoolean>(this.config?.caseSensitive ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  readonly debounceTime = input<number, XNumber>(this.config?.debounceTime ?? 200, { transform: XToNumber });
  /**
   * @zh_CN 多选时显示的选中数据个数，其它的在更多中显示，默认全部显示
   * @en_US Display the number of data in the maximum election, and the others are displayed in more of them
   */
  readonly maxTagCount = input<number, XNumber>(this.config?.maxTagCount ?? -1, {
    transform: XToNumber
  });
  /**
   * @zh_CN 多选时显示的个数超过指定个数，显示的文字模版
   * @en_US The number displayed when multiple choices exceeds the specified number, the displayed text template displayed
   * @default '更多{{surplus}}个选中'
   */
  readonly maxTagContent = input<XTemplate | undefined>(this.config?.maxTagContent ?? undefined);
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  readonly virtualScroll = input<boolean, XBoolean>(this.config?.virtualScroll ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 显示的值展示路径 AA > BB > CC
   * @en_US Display value display path. AA > BB > CC
   */
  readonly showPath = input<boolean, XBoolean>(this.config?.showPath ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 路径分隔符
   * @en_US Path separator
   */
  readonly separator = input<string>(this.config?.separator ?? ' / ');
  /**
   * @zh_CN 只能选择叶子节点
   * @en_US Only leaf nodes can be selected
   */
  readonly onlyLeaf = input<boolean, XBoolean>(this.config?.onlyLeaf ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  override readonly pointer = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  override readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  override readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  override readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  override readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  override readonly placeholder = input<string | string[]>('');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  override readonly readonly = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  override readonly valueTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  override readonly valueTplContext = input();
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  override readonly before = input<XTemplate>();
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  override readonly after = input<XTemplate>();
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  override readonly pattern = input<any>();
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  override readonly message = input<string | string[]>('');
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  override readonly active = model<boolean>(false);
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
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
