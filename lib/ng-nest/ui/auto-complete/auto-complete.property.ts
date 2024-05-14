import {
  XParentIdentityProperty,
  XData,
  XPositionTopBottom,
  XSize,
  XBoolean,
  XAlign,
  XJustify,
  XDirection,
  XTemplate,
  XToNumber,
  XNumber,
  XToBoolean,
  XToCssPixelValue
} from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model, output } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';

/**
 * AutoComplete
 * @selector x-auto-complete
 * @decorator component
 */
export const XAutoCompletePrefix = 'x-auto-complete';
const X_AUTOCOMPLETE_CONFIG_NAME = 'autoComplete';

/**
 * AutoComplete Property
 */
@Component({ selector: `${XAutoCompletePrefix}-property`, template: '' })
export class XAutoCompleteProperty extends XFormControlFunction(X_AUTOCOMPLETE_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XData<XAutoCompleteNode>>([]);
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  readonly debounceTime = input<number, XNumber>(this.config?.debounceTime ?? 200, { transform: XToNumber });
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  readonly placement = input<XPositionTopBottom>(this.config?.placement ?? 'bottom');
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  readonly bordered = input<boolean, XBoolean>(this.config?.bordered ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 匹配区分大小写
   * @en_US Case-sensitive
   */
  readonly caseSensitive = input<boolean, XBoolean>(this.config?.caseSensitive ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 只能是选择的值
   * @en_US Can only be the value of choice
   */
  readonly onlySelect = input<boolean, XBoolean>(this.config?.onlySelect ?? false, { transform: XToBoolean });
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
  override readonly readonly = input<boolean, XBoolean>(false, { transform: XToBoolean });
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
  override readonly pattern = input<RegExp | RegExp[] | any>([]);
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
   * @zh_CN 选择节点事件
   * @en_US Node click event
   */
  readonly nodeEmit = output<XAutoCompleteNode>();
}

/**
 * AutoComplete Option
 * @undocument true
 */
export interface XAutoCompleteOption extends XFormOption {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  data?: XData<XAutoCompleteNode>;
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  debounceTime?: number;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XPositionTopBottom;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 选择节点事件
   * @en_US Node click event
   */
  nodeClick?: (value: XAutoCompleteNode) => void;
}

/**
 * @zh_CN AutoComplete 数据对象
 * @en_US AutoComplete data object
 */
export interface XAutoCompleteNode extends XParentIdentityProperty<XAutoCompleteNode> {}

/**
 * AutoComplete Portal
 * @selector x-auto-complete-portal
 * @decorator component
 */
export const XAutoCompletePortalPrefix = 'x-auto-complete-portal';
