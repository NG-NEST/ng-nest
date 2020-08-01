import {
  XData,
  XParentIdentityProperty,
  XControlValueAccessor,
  XDataConvert,
  XInputNumber,
  XInputBoolean,
  XNumber,
  XBoolean
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * List
 * @selector x-list
 * @decorator component
 */
export const XListPrefix = 'x-list';

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
   * @zh_CN 多选个数
   * @en_US Multiple choice
   */
  @Input() @XInputNumber() multiple: XNumber = 1;
  /**
   * @zh_CN 选中
   * @en_US Selected
   */
  @Input() @XInputBoolean() checked: XBoolean;
  /**
   * @zh_CN 拖动
   * @en_US Drag
   */
  @Input() @XInputBoolean() drag: XBoolean;
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
   * hover
   */
  hover?: boolean;
}
