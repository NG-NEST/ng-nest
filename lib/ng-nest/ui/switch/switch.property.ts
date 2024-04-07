import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';
import { XAlign, XBoolean, XDirection, XInputBoolean, XJustify, XSize, XTemplate, XWithConfig } from '@ng-nest/ui/core';

/**
 * Switch
 * @selector x-switch
 * @decorator component
 */
export const XSwitchPrefix = 'x-switch';
const X_CONFIG_NAME = 'switch';

/**
 * Switch Property
 */
@Component({ selector: `${XSwitchPrefix}-property`, template: '' })
export class XSwitchProperty extends XControlValueAccessor<boolean> implements XSwitchOption {
  /**
   * @zh_CN 显示加载中
   * @en_US Show loading
   */
  @Input() @XInputBoolean() loading: XBoolean = false;
  /**
   * @zh_CN 手动控制
   * @en_US Manual control
   */
  @Input() @XInputBoolean() manual: XBoolean = false;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size!: XSize;
  /**
   * @zh_CN 显示文字或者自定义模版（开启状态）
   * @en_US Display text or custom template (open state)
   */
  @Input() checkedText?: XTemplate;
  /**
   * @zh_CN 显示文字或者自定义模版（关闭状态）
   * @en_US Display text or custom template (closed)
   */
  @Input() unCheckedText?: XTemplate;
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
 * Switch Option
 * @undocument true
 */
export interface XSwitchOption extends XFormOption {
  /**
   * @zh_CN 显示加载中
   * @en_US Show loading
   */
  loading?: XBoolean;
  /**
   * @zh_CN 手动控制
   * @en_US Manual control
   */
  manual?: XBoolean;
  /**
   * @zh_CN 显示文字或者自定义模版（开启状态）
   * @en_US Display text or custom template (open state)
   */
  checkedText?: XTemplate;
  /**
   * @zh_CN 显示文字或者自定义模版（关闭状态）
   * @en_US Display text or custom template (closed)
   */
  unCheckedText?: XTemplate;
}
