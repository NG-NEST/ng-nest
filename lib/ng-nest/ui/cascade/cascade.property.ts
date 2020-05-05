import { XParentIdentityProperty, XDataConvert, XData, XControlValueAccessor, XCorner } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Cascade
 * @selector x-cascade
 * @decorator component
 */
export const XCascadePrefix = 'x-cascade';

/**
 * Cascade Property
 */
@Component({ template: '' })
export class XCascadeProperty extends XControlValueAccessor<any> {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XCascadeNode> = [];
  /**
   * 节点点击的事件
   */
  @Output() nodeClick = new EventEmitter<XCascadeNode>();
  /**
   * 展示方位
   */
  @Input() placement: XCorner = 'bottom-start';
}

/**
 * Cascade 数据对象
 */
export interface XCascadeNode extends XParentIdentityProperty<XCascadeNode> {}

/**
 * Cascade-Portal
 * @selector x-cascade-portal
 * @decorator component
 */
export const XCascadePortalPrefix = 'x-cascade-portal';
