import {
  XParentIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XData,
  XBoolean,
  XWithConfig,
  XSize,
  XInputNumber,
  XNumber,
  XTemplate,
  XPlacement,
  XDirection,
  XAlign,
  XJustify
} from '@ng-nest/ui/core';
import { Input, Component, TemplateRef, Output, EventEmitter } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * Select
 * @selector x-select
 * @decorator component
 */
export const XSelectPrefix = 'x-select';
const X_CONFIG_NAME = 'select';

/**
 * Select Property
 */
@Component({ selector: `${XSelectPrefix}-property`, template: '' })
export class XSelectProperty extends XControlValueAccessor<any> {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XSelectNode> = [];
  /**
   * @zh_CN 清除按钮
   * @en_US Clear button
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() clearable?: XBoolean;
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  @Input() @XInputBoolean() async?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XPlacement>(X_CONFIG_NAME, 'bottom') placement!: XPlacement;
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  @Input() @XInputBoolean() multiple?: XBoolean;
  /**
   * @zh_CN 多选添加全选功能
   * @en_US Multi choice to add full selection function
   */
  @Input() @XInputBoolean() selectAll?: XBoolean;
  /**
   * @zh_CN 全选的文字
   * @en_US Selected all text
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) selectAllText?: string;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl?: TemplateRef<any>;
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
   * @zh_CN 下拉框的最大高度
   * @en_US The biggest height of the drop-down box
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '12rem') portalMaxHeight!: string;
  /**
   * @zh_CN 下拉框的宽度
   * @en_US The width of the drop-down box
   */
  @Input() portalWidth!: string;
  /**
   * @zh_CN 输入搜索
   * @en_US Input search
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) search!: XBoolean;
  /**
   * @zh_CN 匹配区分大小写
   * @en_US Case-sensitive
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) caseSensitive!: XBoolean;
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 200) debounceTime?: number;
  /**
   * @zh_CN 多选时显示的选中数据个数，其它的在更多中显示，默认全部显示
   * @en_US Display the number of data in the maximum election, and the others are displayed in more of them
   */
  @Input() @XInputNumber() @XWithConfig<XNumber>(X_CONFIG_NAME) maxTagCount?: XNumber;
  /**
   * @zh_CN 多选时显示的个数超过指定个数，显示的文字模版
   * @en_US The number displayed when multiple choices exceeds the specified number, the displayed text template displayed
   * @default '更多{{surplus}}个选中'
   */
  @Input() @XWithConfig<XTemplate>(X_CONFIG_NAME) maxTagContent?: XTemplate;
  /**
   * @zh_CN 开启虚拟滚动
   * @en_US Turn on virtual scrolling
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() virtualScroll!: XBoolean;
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
}

/**
 * Select Option
 * @undocument true
 */
export interface XSelectOption extends XFormOption {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  data?: XData<XSelectNode>;
  /**
   * @zh_CN 异步加载
   * @en_US Asynchronous loading
   */
  async?: XBoolean;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XPlacement;
  /**
   * @zh_CN 多选功能
   * @en_US Multiple choice
   */
  multiple?: XBoolean;
  /**
   * @zh_CN 多选添加全选功能
   * @en_US Multi choice to add full selection function
   */
  selectAll?: XBoolean;
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
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  bordered?: XBoolean;
  /**
   * @zh_CN 下拉框的最大高度
   * @en_US The biggest height of the drop-down box
   */
  portalMaxHeight?: string;
  /**
   * @zh_CN 输入搜索
   * @en_US Input search
   */
  search?: XBoolean;
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
