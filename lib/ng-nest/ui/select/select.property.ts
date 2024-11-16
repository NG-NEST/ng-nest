import { XToBoolean, XToCssPixelValue, XToDataConvert, XToNumber } from '@ng-nest/ui/core';
import { Component, TemplateRef, input, model } from '@angular/core';
import { XFormControlFunction, XFormOption } from '@ng-nest/ui/base-form';
import type {
  XParentIdentityProperty,
  XData,
  XBoolean,
  XSize,
  XNumber,
  XTemplate,
  XPlacement,
  XDirection,
  XAlign,
  XJustify
} from '@ng-nest/ui/core';

/**
 * Select
 * @selector x-select
 * @decorator component
 */
export const XSelectPrefix = 'x-select';
const X_SELECT_CONFIG_NAME = 'select';

/**
 * Select Property
 */
@Component({ selector: `${XSelectPrefix}-property`, template: '' })
export class XSelectProperty extends XFormControlFunction(X_SELECT_CONFIG_NAME) {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  readonly data = input<XData<XSelectNode>, XData<XSelectNode>>([], { transform: XToDataConvert });
  /**
   * @zh_CN 宽度
   * @en_US width
   */
  readonly width = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  readonly clearable = input<boolean, XBoolean>(this.config?.clearable ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  readonly async = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  readonly placement = input<XPlacement>(this.config?.placement ?? 'bottom');
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  readonly multiple = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 多选添加全选功能
   * @en_US Multi choice to add full selection function
   */
  readonly selectAll = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 全选的文字
   * @en_US Selected all text
   */
  readonly selectAllText = input<string>(this.config?.selectAllText ?? '');
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
   * @zh_CN 输入搜索
   * @en_US Input search
   */
  readonly search = input<boolean, XBoolean>(this.config?.search ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 匹配区分大小写
   * @en_US Case-sensitive
   */
  readonly caseSensitive = input<boolean, XBoolean>(this.config?.caseSensitive ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  readonly debounceTime = input<number, XNumber>(this.config?.debounceTime ?? 200, { transform: XToNumber });
  /**
   * @zh_CN 多选时显示的选中数据个数，其它的在更多中显示，默认全部显示
   * @en_US Display the number of data in the maximum election, and the others are displayed in more of them
   * @default 显示所有
   */
  readonly maxTagCount = input<number, XNumber>(this.config?.maxTagCount ?? -1, { transform: XToNumber });
  /**
   * @zh_CN 多选时显示的个数超过指定个数，显示的文字模版
   * @en_US The number displayed when multiple choices exceeds the specified number, the displayed text template displayed
   * @default '更多{{surplus}}个选中'
   */
  readonly maxTagContent = input<XTemplate>(this.config?.maxTagContent ?? '');
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  readonly virtualScroll = input<boolean, XBoolean>(this.config?.virtualScroll ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 搜索时允许选择输入的值
   * @en_US Allow the value of the input when searching for
   */
  readonly allowInput = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 输入框点击样式
   * @en_US Input pointer
   */
  override readonly pointer = input<boolean, XBoolean>(true, { transform: XToBoolean });
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
}

/**
 * Select Option
 */
export interface XSelectOption extends XFormOption {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  data?: XData<XSelectNode>;
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  clearable?: boolean;
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  async?: boolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XPlacement;
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  multiple?: boolean;
  /**
   * @zh_CN 多选添加全选功能
   * @en_US Multi choice to add full selection function
   */
  selectAll?: boolean;
  /**
   * @zh_CN 全选的文字
   * @en_US Selected all text
   */
  selectAllText?: string;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: boolean;
  /**
   * @zh_CN 下拉框的最大高度
   * @en_US The biggest height of the drop-down box
   */
  portalMaxHeight?: string;
  /**
   * @zh_CN 下拉框的宽度
   * @en_US The width of the drop-down box
   */
  portalWidth?: string;
  /**
   * @zh_CN 输入搜索
   * @en_US Input search
   */
  search?: boolean;
  /**
   * @zh_CN 匹配区分大小写
   * @en_US Case-sensitive
   */
  caseSensitive?: boolean;
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  debounceTime?: number;
  /**
   * @zh_CN 多选时显示的选中数据个数，其它的在更多中显示，默认全部显示
   * @en_US Display the number of data in the maximum election, and the others are displayed in more of them
   * @default 显示所有
   */
  maxTagCount?: number;
  /**
   * @zh_CN 多选时显示的个数超过指定个数，显示的文字模版
   * @en_US The number displayed when multiple choices exceeds the specified number, the displayed text template displayed
   * @default '更多{{surplus}}个选中'
   */
  maxTagContent?: XTemplate;
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  virtualScroll?: boolean;
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
}

/**
 * @zh_CN Select 数据对象
 * @en_US Select data object
 */
export interface XSelectNode extends XParentIdentityProperty<XSelectNode> {}

/**
 * Select Portal
 * @selector x-select-portal
 * @decorator component
 */
export const XSelectPortalPrefix = 'x-select-portal';
