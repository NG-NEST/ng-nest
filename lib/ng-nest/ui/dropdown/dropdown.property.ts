import { XData, XProperty, XDataConvert, XInputBoolean, XBoolean, XPlacement, XWithConfig, XTrigger } from '@ng-nest/ui/core';
import { XListNode } from '@ng-nest/ui/list';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Dropdown
 * @selector x-dropdown
 * @decorator component
 */
export const XDropdownPrefix = 'x-dropdown';
const X_CONFIG_NAME = 'dropdown';

/**
 * Dropdown Property
 */
@Component({ template: '' })
export class XDropdownProperty extends XProperty {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XDropdownNode> = [];
  /**
   * @zh_CN 触发方式
   * @en_US Trigger method
   */
  @Input() @XWithConfig<XDropdownTrigger>(X_CONFIG_NAME, 'hover') trigger!: XDropdownTrigger;
  /**
   * @zh_CN 展示位置
   * @en_US Placement
   */
  @Input() @XWithConfig<XPlacement>(X_CONFIG_NAME, 'bottom-start') placement!: XPlacement;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() disabled!: XBoolean;
  /**
   * @zh_CN 节点中已经包含子节点数据
   * @en_US The node already contains child node data
   */
  @Input() @XInputBoolean() children!: XBoolean;
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  @Output() nodeClick = new EventEmitter<XDropdownNode>();
}

/**
 * @zh_CN Dropdown 数据对象
 * @en_US Dropdown data object
 */
export interface XDropdownNode extends XListNode {}

/**
 * @zh_CN 显示方式
 * @en_US Display method
 */
export type XDropdownTrigger = XTrigger;

/**
 * Dropdown Portal
 * @selector x-dropdown-portal
 * @decorator component
 */
export const XDropdownPortalPrefix = 'x-dropdown-portal';
