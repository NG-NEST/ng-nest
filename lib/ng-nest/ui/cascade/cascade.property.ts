import {
  XParentIdentityProperty,
  XDataConvert,
  XData,
  XCorner,
  XWithConfig,
  XSize,
  XInputBoolean,
  XBoolean,
  XTrigger,
  XNumber
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component, TemplateRef } from '@angular/core';
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
  @Input() @XWithConfig<XCorner>(X_CONFIG_NAME, 'bottom-start') placement?: XCorner;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 子节点触发方式
   * @en_US Sub node triggering method
   */
  @Input() @XWithConfig<XCascadeNodeTrigger>(X_CONFIG_NAME, 'click') nodeTrigger?: XCascadeNodeTrigger;
  /**
   * @zh_CN 子节点触发方式为 hover 时的延迟时间
   * @en_US Sub node triggering method
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 200) nodeHoverDelay?: XNumber;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl?: TemplateRef<any>;
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
 * @zh_CN 子节点触发方式
 * @en_US Sub node triggering method
 */
export type XCascadeNodeTrigger = XTrigger;

/**
 * Cascade-Portal
 * @selector x-cascade-portal
 * @decorator component
 */
export const XCascadePortalPrefix = 'x-cascade-portal';
