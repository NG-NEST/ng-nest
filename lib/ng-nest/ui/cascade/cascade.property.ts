import { XToBoolean, XToNumber, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model, output } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XParentIdentityProperty,
  XData,
  XCorner,
  XSize,
  XBoolean,
  XTrigger,
  XNumber,
  XAlign,
  XTemplate,
  XDirection,
  XJustify
} from '@ng-nest/ui/core';

/**
 * Cascade
 * @selector x-cascade
 * @decorator component
 */
export const XCascadePrefix = 'x-cascade';
const X_CASCADE_CONFIG_NAME = 'cascade';

/**
 * Cascade Property
 */
@Component({ selector: `${XCascadePrefix}-property`, template: '' })
export class XCascadeProperty extends XFormControlFunction(X_CASCADE_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XData<XCascadeNode>>([]);
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  readonly placement = input<XCorner>(this.config?.placement ?? 'bottom-start');
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  readonly clearable = input<boolean, XBoolean>(this.config?.clearable ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 路径分隔符
   * @en_US Path separator
   */
  readonly separator = input<string>(this.config?.separator ?? ' / ');
  /**
   * @zh_CN 下拉框的最大高度
   * @en_US The biggest height of the drop-down box
   */
  readonly portalMaxHeight = input<string, XNumber>(this.config?.portalMaxHeight ?? '12rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 下拉框的高度，启用虚拟滚动的时候必须设置一个高度
   * @en_US The biggest height of the drop-down box
   */
  readonly portalHeight = input<string, XNumber>('', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 下拉框的宽度
   * @en_US The width of the drop-down box
   */
  readonly portalWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 下拉框设置样式名
   * @en_US The style class name of the drop-down box
   */
  readonly portalClass = input<string | string[]>('');
  /**
   * @zh_CN 子节点触发方式
   * @en_US Sub node triggering method
   */
  readonly nodeTrigger = input<XCascadeNodeTrigger>(this.config?.nodeTrigger ?? 'click');
  /**
   * @zh_CN 子节点触发方式为 hover 时的延迟时间
   * @en_US Sub node triggering method
   */
  readonly nodeHoverDelay = input<number, XNumber>(this.config?.nodeHoverDelay ?? 200, { transform: XToNumber });
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  override readonly pointer = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  override readonly label = input<string>('');
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  override readonly labelAlign = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  override readonly justify = input<XJustify>('start');
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  override readonly align = input<XAlign>('start');
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  override readonly direction = input<XDirection>('column');
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  override readonly placeholder = input<string | string[]>('');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  override readonly readonly = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  override readonly valueTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  override readonly valueTplContext = input();
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  override readonly before = input<XTemplate>();
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  override readonly after = input<XTemplate>();
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  override readonly pattern = input<RegExp | RegExp[] | any>(null);
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  override readonly message = input<string | string[]>([]);
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  override readonly active = model<boolean>(false);
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  override readonly inputValidator = input<(value: any) => boolean>();
  /**
   * @zh_CN 节点点击的事件
   * @en_US Node click event
   */
  readonly nodeEmit = output<XCascadeNode>();
}

/**
 * Cascade Option
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
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: boolean;
  /**
   * @zh_CN 子节点触发方式
   * @en_US Sub node triggering method
   */
  nodeTrigger?: XCascadeNodeTrigger;
  /**
   * @zh_CN 子节点触发方式为 hover 时的延迟时间
   * @en_US Sub node triggering method
   */
  nodeHoverDelay?: number;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  pointer?: boolean;
  /**
   * @zh_CN 标签
   * @en_US Label
   */
  label?: string;
  /**
   * @zh_CN 标签宽度
   * @en_US Label width
   */
  labelWidth?: string;
  /**
   * @zh_CN 标签文字对齐方式
   * @en_US Label text alignment method
   */
  labelAlign?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素水平排列方式
   * @en_US The level of sub-element level arrangement under flex layout
   */
  justify?: XJustify;
  /**
   * @zh_CN flex 布局下的子元素垂直排列方式
   * @en_US sub-element vertical arrangement method under flex layout
   */
  align?: XAlign;
  /**
   * @zh_CN flex 布局下的子元素排列方向
   * @en_US The direction of the sub-element arrangement under flex layout
   */
  direction?: XDirection;
  /**
   * @zh_CN 输入提示信息
   * @en_US Enter prompt information
   */
  placeholder?: string;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  required?: boolean;
  /**
   * @zh_CN 只读
   * @en_US Readonly
   */
  readonly?: boolean;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  valueTplContext?: any;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  before?: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  after?: XTemplate;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular verification rules
   */
  pattern?: RegExp | RegExp[];
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verify not pass the prompt text
   */
  message?: string | string[];
  /**
   * @zh_CN 激活状态
   * @en_US Activation state
   */
  active?: boolean;
  /**
   * @zh_CN 输入验证函数
   * @en_US Enter the verification function
   */
  inputValidator?: (value: any) => boolean;
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  nodeEmit?: (node: XCascadeNode) => void;
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
