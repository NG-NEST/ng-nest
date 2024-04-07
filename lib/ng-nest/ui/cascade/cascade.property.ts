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
  XNumber,
  XAlign,
  XTemplate,
  XDirection,
  XJustify
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
@Component({ selector: `${XCascadePrefix}-property`, template: '' })
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
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size!: XSize;
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
   * @zh_CN 标签
   * @en_US Label
   */
  @Input() override label?: string = '';
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  @Input() override labelWidth?: string = '';
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  @Input() override labelAlign?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  @Input() override justify?: XJustify = 'start';
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  @Input() override align?: XAlign = 'start';
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  @Input() override direction?: XDirection = 'column';
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  @Input() override placeholder?: string | string[] = '';
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() override disabled: XBoolean = false;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  @Input() @XInputBoolean() override required: XBoolean = false;
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  @Input() @XInputBoolean() override readonly: XBoolean = false;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  @Input() override valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  @Input() override valueTplContext: any;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  @Input() override before!: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  @Input() override after!: XTemplate;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  @Input() override pattern?: any;
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  @Input() override message?: string | string[];
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  @Input() @XInputBoolean() override active: XBoolean = false;
  /**
   * @zh_CN 输入框点击样式
   * @en_US Enter box click style
   */
  @Input() @XInputBoolean() override pointer: XBoolean = false;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  @Input() override inputValidator!: (value: any) => boolean;
  /**
   * @zh_CN 激活状态事件
   * @en_US Activation state event
   */
  @Output() override activeChange = new EventEmitter<XBoolean>();
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
