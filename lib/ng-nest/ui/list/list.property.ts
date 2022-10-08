import {
  XData,
  XParentIdentityProperty,
  XDataConvert,
  XInputNumber,
  XInputBoolean,
  XNumber,
  XBoolean,
  XTemplate,
  XWithConfig,
  XSize
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component, TemplateRef, ElementRef } from '@angular/core';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';

/**
 * List
 * @selector x-list
 * @decorator component
 */
export const XListPrefix = 'x-list';
const X_CONFIG_NAME = 'list';

/**
 * List Property
 */
@Component({ template: '' })
export class XListProperty extends XControlValueAccessor<any> {
  /**
   * @zh_CN 列表数据
   * @en_US List data
   */
  @Input() @XDataConvert() data: XData<XListNode> = [];
  /**
   * @zh_CN 多选个数，设置为0，不限制选择个数
   * @en_US Multiple choice
   */
  @Input() @XInputNumber() multiple: XNumber = 1;
  /**
   * @zh_CN 多选添加全选功能，适用于 multiple=0
   * @en_US Multi choice to add full selection function
   */
  @Input() @XInputBoolean() selectAll?: XBoolean;
  /**
   * @zh_CN 全选的文字
   * @en_US Selected all text
   * @default '全选'
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) selectAllText?: string;
  /**
   * @zh_CN 选中
   * @en_US Selected
   */
  @Input() @XInputBoolean() checked?: XBoolean;
  /**
   * @zh_CN 拖动
   * @en_US Drag
   */
  @Input() @XInputBoolean() drag?: XBoolean;
  /**
   * @zh_CN 当开启多选的时候，ngModel 的值为对象数组
   * @en_US When multiple selection is enabled, the value of ngmodel is an array of objects
   */
  @Input() @XInputBoolean() objectArray?: XBoolean;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 列表头部
   * @en_US List header
   */
  @Input() header?: XTemplate;
  /**
   * @zh_CN 列表底部
   * @en_US List footer
   */
  @Input() footer?: XTemplate;
  /**
   * @zh_CN 滚动区域元素
   * @en_US Rolling area element
   */
  @Input() scrollElement?: HTMLElement;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size!: XSize;
  /**
   * @zh_CN 加载更多
   * @en_US load more
   */
  @Input() @XInputBoolean() loadMore!: XBoolean;
  /**
   * @zh_CN 加载更多的文字
   * @en_US Load more text
   * @default '加载更多'
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) loadMoreText?: string;
  /**
   * @zh_CN 正在加载中的文字
   * @en_US Loading
   * @default '正在加载中'
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) loadingMoreText?: string;
  /**
   * @zh_CN 开启虚拟滚动，不支持节点拖动功能
   * @en_US Turn on virtual scrolling
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() virtualScroll!: XBoolean;
  /**
   * @zh_CN 虚拟滚动高度, 实际会去掉头尾、全选、更多的高度
   * @en_US The virtual rolling height will actually remove the head and end, the full selection, more height
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 400) @XInputNumber() scrollHeight!: XNumber;
  /**
   * @zh_CN 虚拟滚动高度自适应指定元素
   * @en_US virtual rolling height follows the specified object
   */
  @Input() heightAdaption!: ElementRef<HTMLElement> | HTMLElement;
  /**
   * @zh_CN 超出可视窗口缓冲区的最小值，对应 cdk scroll 中的参数
   * @en_US Exceed the minimum value of the visible window buffer, corresponding to the parameters in cdk scroll
   */
  @Input() minBufferPx: number = 100;
  /**
   * @zh_CN 渲染新数据缓冲区的像素，对应 cdk scroll 中的参数
   * @en_US Render the pixels of the new data buffer, corresponding to the parameters in cdk scroll
   */
  @Input() maxBufferPx: number = 200;
  /**
   * @zh_CN 关键字高亮
   * @en_US Keyword highlighting
   */
  @Input() keywordText!: string | string[];
  /**
   * @zh_CN 匹配关键字区分大小写
   * @en_US Case-sensitive
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) caseSensitive!: XBoolean;
  /**
   * @zh_CN Full event
   * @en_US 全选事件
   */
  @Output() onSelectAll = new EventEmitter<boolean>();
  /**
   * @zh_CN 节点 mouseenter 事件
   * @en_US Node mouseenter event
   */
  @Output() nodeMouseenter = new EventEmitter<XListNode>();
  /**
   * @zh_CN 节点 mouseleave 事件
   * @en_US Node mouseleave event
   */
  @Output() nodeMouseleave = new EventEmitter<XListNode>();
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  @Output() nodeClick = new EventEmitter<XListNode>();
  /**
   * @zh_CN 拖动结束事件
   * @en_US Drag the end
   */
  @Output() dropListDropped = new EventEmitter<XListDragDrop>();
  /**
   * @zh_CN Tab out 事件
   * @en_US Tab Out event
   */
  @Output() keyManagerTabOut = new EventEmitter<void>();
  /**
   * @zh_CN Tab out 事件
   * @en_US Tab Out event
   */
  @Output() keyManagerChange = new EventEmitter<number>();
}

/**
 * @zh_CN List 数据对象
 * @en_US List data object
 */
export interface XListNode extends XParentIdentityProperty<any> {
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
   * @zh_CN 激活
   * @en_US Active
   */
  active?: boolean;
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
@Component({ template: '' })
export class XListOptionProperty {
  /**
   * @zh_CN 节点参数
   * @en_US Node param
   */
  @Input() node?: XListNode;
  /**
   * @zh_CN 选中
   * @en_US Selected
   */
  @Input() @XInputBoolean() checked?: XBoolean;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 选中
   * @en_US selected
   */
  @Input() @XInputBoolean() selected?: boolean;
  /**
   * @zh_CN 禁用
   * @en_US disabled
   */
  @Input() @XInputBoolean() disabled?: boolean;
  /**
   * @zh_CN 激活
   * @en_US active
   */
  @Input() @XInputBoolean() active?: boolean;
  /**
   * @zh_CN 图标
   * @en_US icon
   */
  @Input() icon?: string;
  /**
   * @zh_CN 分割线
   * @en_US Split line
   */
  @Input() divided?: boolean;
  /**
   * @zh_CN 标签
   * @en_US label
   */
  @Input() label?: string;
  /**
   * @zh_CN 有子节点
   * @en_US leaf
   */
  @Input() @XInputBoolean() leaf?: boolean;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size!: XSize;
  /**
   * @zh_CN 关键字高亮
   * @en_US Keyword highlighting
   */
  @Input() keywordText!: string | string[];
  /**
   * @zh_CN 匹配关键字区分大小写
   * @en_US Case-sensitive
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) caseSensitive!: XBoolean;
  /**
   * @zh_CN 有子节点
   * @en_US leaf
   */
  @Output() activeChange = new EventEmitter<boolean>();
}

/**
 * @zh_CN 拖动相关的数据
 * @en_US Drag related data
 */
export type XListDragDrop = { data: XListNode[]; current: XListNode; currentIndex: number };
