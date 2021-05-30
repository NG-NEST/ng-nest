import { XParentIdentityProperty, XDataConvert, XData, XCorner, XWithConfig } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Cascade
 * @selector x-cascade
 * @decorator component
 */
export const XCascadePrefix = 'x-cascade';
const X_CONFIG_NAME = 'cascade';

/**
 * Cascade Property
 */
@Component({ template: '' })
export class XCascadeProperty extends XControlValueAccessor<any> implements XCascadeOption {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XCascadeNode> = [];
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XCorner>(X_CONFIG_NAME, 'bottom-start') placement!: XCorner;
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  @Output() nodeEmit = new EventEmitter<XCascadeNode>();
}

/**
 * Cascade Option
 * @undocument true
 */
export interface XCascadeOption extends XFormOption {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  data?: XData<XCascadeNode>;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XCorner;
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  nodeClick?: (node: XCascadeNode) => void;
}

/**
 * @zh_CN Cascade 数据对象
 * @en_US Cascade data object
 */
export interface XCascadeNode extends XParentIdentityProperty<XCascadeNode> {}

/**
 * Cascade-Portal
 * @selector x-cascade-portal
 * @decorator component
 */
export const XCascadePortalPrefix = 'x-cascade-portal';
