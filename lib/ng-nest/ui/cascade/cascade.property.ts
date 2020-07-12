import { XParentIdentityProperty, XDataConvert, XData, XControlValueAccessor, XCorner, XFormOption, XWithConfig } from '@ng-nest/ui/core';
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
export class XCascadeProperty extends XControlValueAccessor<any> implements XCascadeOption {
  /**
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XCascadeNode> = [];
  /**
   * 展示方位
   */
  @Input() @XWithConfig<XCorner>('bottom-start') placement: XCorner;
  /**
   * 节点点击的事件
   */
  @Output() nodeEmit = new EventEmitter<XCascadeNode>();
}

/**
 * Cascade Option
 * @undocument true
 */
export interface XCascadeOption extends XFormOption {
  /**
   * 节点数据
   */
  data?: XData<XCascadeNode>;
  /**
   * 展示方位
   */
  placement?: XCorner;
  /**
   * 节点点击的事件
   */
  nodeClick?: (node: XCascadeNode) => void;
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
