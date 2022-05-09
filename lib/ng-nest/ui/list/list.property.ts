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
import { Input, Output, EventEmitter, Component, TemplateRef } from '@angular/core';
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
   * @zh_CN 有子节点
   * @en_US leaf
   */
  @Output() activeChange = new EventEmitter<boolean>();
}
