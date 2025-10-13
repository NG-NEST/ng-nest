import {
  XData,
  XParentIdentityProperty,
  XNumber,
  XBoolean,
  XTemplate,
  XSize,
  XToNumber,
  XToBoolean,
  XStyle
} from '@ng-nest/ui/core';
import { Component, TemplateRef, ElementRef, input, output, model } from '@angular/core';
import { XFormControlFunction } from '@ng-nest/ui/base-form';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { XListOptionComponent } from './list-option.component';

/**
 * List
 * @selector x-list
 * @decorator component
 */
export const XListPrefix = 'x-list';
const X_LIST_CONFIG_NAME = 'list';

/**
 * List Property
 */
@Component({ selector: `${XListPrefix}-property`, template: '' })
export class XListProperty extends XFormControlFunction(X_LIST_CONFIG_NAME) {
  /**
   * @zh_CN 列表数据
   * @en_US List data
   */
  readonly data = input<XData<XListNode>>([]);
  /**
   * @zh_CN 多选个数，设置为0，不限制选择个数
   * @en_US Multiple choice
   */
  readonly multiple = input<number, XNumber>(1, { transform: XToNumber });
  /**
   * @zh_CN 多选添加全选功能，适用于 multiple=0
   * @en_US Multi choice to add full selection function
   */
  readonly selectAll = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 全选的文字
   * @en_US Selected all text
   * @default '全选'
   */
  readonly selectAllText = input<string>(this.config?.selectAllText ?? '');
  /**
   * @zh_CN 选中
   * @en_US Selected
   */
  readonly checked = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 拖动
   * @en_US Drag
   */
  readonly drag = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 当开启多选的时候，ngModel 的值为对象数组
   * @en_US When multiple selection is enabled, the value of ngmodel is an array of objects
   */
  readonly objectArray = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 节点样式
   * @en_US Node style
   */
  readonly nodeStyle = input<XStyle>();
  /**
   * @zh_CN 分组模板
   * @en_US Group template
   */
  readonly groupTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 列表头部
   * @en_US List header
   */
  readonly header = input<XTemplate>();
  /**
   * @zh_CN 列表底部
   * @en_US List footer
   */
  readonly footer = input<XTemplate>();
  /**
   * @zh_CN 滚动区域元素
   * @en_US Rolling area element
   */
  readonly scrollElement = input<HTMLElement>();
  /**
   * @zh_CN 是否使用键盘控制
   * @en_US Whether to use keyboard control
   */
  readonly isKeyboardControlled = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 加载更多
   * @en_US load more
   */
  readonly loadMore = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 加载更多的文字
   * @en_US Load more text
   * @default '加载更多'
   */
  readonly loadMoreText = input<string>(this.config?.loadMoreText ?? '');
  /**
   * @zh_CN 正在加载中的文字
   * @en_US Loading
   * @default '正在加载中'
   */
  readonly loadingMoreText = input<string>(this.config?.loadingMoreText ?? '');
  /**
   * @zh_CN 开启虚拟滚动，不支持节点拖动功能
   * @en_US Turn on virtual scrolling
   */
  readonly virtualScroll = input<boolean, XBoolean>(this.config?.virtualScroll ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 虚拟滚动高度, 实际会去掉头尾、全选、更多的高度
   * @en_US The virtual rolling height will actually remove the head and end, the full selection, more height
   */
  readonly scrollHeight = input<number, XNumber>(this.config?.scrollHeight ?? 400, { transform: XToNumber });
  /**
   * @zh_CN 虚拟滚动高度自适应指定元素
   * @en_US virtual rolling height follows the specified object
   */
  readonly heightAdaption = input<ElementRef<HTMLElement> | HTMLElement>();
  /**
   * @zh_CN 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US Exceed the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  readonly minBufferPx = input<number, XNumber>(100, { transform: XToNumber });
  /**
   * @zh_CN 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US Render the pixels of the new data buffer, corresponding to the parameters in cdk scroll
   */
  readonly maxBufferPx = input<number, XNumber>(200, { transform: XToNumber });
  /**
   * @zh_CN 关键字高亮
   * @en_US Keyword highlighting
   */
  readonly keywordText = input<string | string[]>();
  /**
   * @zh_CN 匹配关键字区分大小写
   * @en_US Case-sensitive
   */
  readonly caseSensitive = input<boolean, XBoolean>(this.config?.caseSensitive ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 在弹框中选择时的样式，根据尺寸来决定
   * @en_US The style selected in the pop-up box is determined by size
   */
  readonly inPortal = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN Full event
   * @en_US 全选事件
   */
  readonly onSelectAll = output<boolean>();
  /**
   * @zh_CN 节点 mouseenter 事件
   * @en_US Node mouseenter event
   */
  readonly nodeMouseenter = output<XListNode>();
  /**
   * @zh_CN 节点 mouseleave 事件
   * @en_US Node mouseleave event
   */
  readonly nodeMouseleave = output<XListNode>();
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  readonly nodeClick = output<XListNode>();
  /**
   * @zh_CN 拖动结束事件
   * @en_US Drag the end
   */
  readonly dropListDropped = output<XListDragDrop>();
  /**
   * @zh_CN Tab out 事件
   * @en_US Tab Out event
   */
  readonly keyManagerTabOut = output<void>();
  /**
   * @zh_CN Tab out 事件
   * @en_US Tab Out event
   */
  readonly keyManagerChange = output<number>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
}

/**
 * @zh_CN List 数据对象
 * @en_US List data object
 */
export interface XListNode extends XParentIdentityProperty<XListNode> {
  /**
   * @zh_CN 图标
   * @en_US Iicon
   */
  icon?: string;
  /**
   * @zh_CN 分割线
   * @en_US Split line
   */
  divided?: boolean;
  /**
   * @zh_CN 事件
   * @en_US Event
   */
  event?: Event;
  /**
   * @zh_CN 悬停
   * @en_US Hover
   */
  hover?: boolean;
  /**
   * @zh_CN 节点样式
   * @en_US Node style
   */
  style?: XStyle;
  /**
   * @zh_CN 打开弹框
   * @en_US open portal
   */
  openPortal?: boolean;
  /**
   * @zh_CN 激活
   * @en_US Active
   */
  active?: boolean;
  /**
   * @zh_CN 检查更新
   * @en_US Check for updates
   */
  change?: Function;
  /**
   * @zh_CN 分组名称
   * @en_US Group name
   */
  group?: boolean;
  /**
   * @zh_CN 是否是分组节点
   * @en_US Group node
   */
  groupable?: boolean;
  /**
   * @zh_CN 对应的节点组件
   * @en_US List option component
   */
  component?: XListOptionComponent;
}

/**
 * List Option
 * @selector x-list-option
 * @decorator component
 */
export const XListOptionPrefix = 'x-list-option';

/**
 * List Option Property
 */
@Component({ selector: `${XListOptionPrefix}-property`, template: '' })
export class XListOptionProperty {
  /**
   * @zh_CN 节点参数
   * @en_US Node param
   */
  readonly node = input<XListNode>();
  /**
   * @zh_CN 选中
   * @en_US Selected
   */
  readonly checked = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 节点样式
   * @en_US Node style
   */
  readonly nodeStyle = input<XStyle>();
  /**
   * @zh_CN 分组模板
   * @en_US Group template
   */
  readonly groupTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 选中
   * @en_US selected
   */
  readonly selected = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 分组节点
   * @en_US Group node
   */
  readonly groupable = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 禁用
   * @en_US forbidden
   */
  readonly forbidden = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 激活
   * @en_US active
   */
  readonly active = model<boolean>(false);
  /**
   * @zh_CN 打开弹框
   * @en_US open portal
   */
  readonly openPortal = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 自定义数据对象样式
   * @en_US Customize data object styles
   */
  readonly optionClass = input<(node: XListNode) => { [className: string]: boolean }>();
  /**
   * @zh_CN 图标
   * @en_US icon
   */
  readonly icon = input<string>();
  /**
   * @zh_CN 分割线
   * @en_US Split line
   */
  readonly divided = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标签
   * @en_US label
   */
  readonly label = input<string>();
  /**
   * @zh_CN 叶子节点
   * @en_US leaf
   */
  readonly leaf = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>('medium');
  /**
   * @zh_CN 关键字高亮
   * @en_US Keyword highlighting
   */
  readonly keywordText = input<string | string[]>();
  /**
   * @zh_CN 匹配关键字区分大小写
   * @en_US Case-sensitive
   */
  readonly caseSensitive = input<boolean, XBoolean>(true, { transform: XToBoolean });
}

/**
 * @zh_CN 拖动相关的数据
 * @en_US Drag related data
 */
export type XListDragDrop = {
  /**
   * @zh_CN 节点数据集合
   * @en_US Node data collection
   */
  data: XListNode[];
  /**
   * @zh_CN 当前拖动节点
   * @en_US The current drag nodes
   */
  current: XListNode;
  /**
   * @zh_CN 当前拖动节点的索引
   * @en_US The current drag index of the node
   */
  currentIndex: number;
  /**
   * @zh_CN 当前拖动节点事件
   * @en_US The current drag nodes event
   */
  event: CdkDragDrop<XListNode[]>;
};
