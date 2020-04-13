import { XData, XPlace, XProperty, XDataConvert, XInputBoolean } from '@ng-nest/ui/core';
import { XListNode } from '@ng-nest/ui/list';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Dropdown
 * @selector x-dropdown
 * @decorator component
 */
export const XDropdownPrefix = 'x-dropdown';

/**
 * Dropdown Property
 */
@Component({ template: '' })
export class XDropdownProperty extends XProperty {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XDropdownNode> = [];
  /**
   * 触发方式
   */
  @Input() trigger: XDropdownTrigger = 'hover';
  /**
   * 展示位置
   */
  @Input() placement: XPlace = 'bottom-start';
  /**
   * 禁用
   */
  @Input() @XInputBoolean() disabled: boolean;
  /**
   * 节点中已经包含子节点数据
   */
  @Input() @XInputBoolean() children: boolean;
  /**
   * 节点点击事件
   */
  @Output() nodeClick = new EventEmitter<XDropdownNode>();
}

/**
 * Dropdown 数据对象
 */
export interface XDropdownNode extends XListNode {}

/**
 * 显示方式
 */
export type XDropdownTrigger = 'hover' | 'click';

/**
 * Dropdown Portal
 * @selector x-dropdown-portal
 * @decorator component
 */
export const XDropdownPortalPrefix = 'x-dropdown-portal';
