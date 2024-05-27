import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { XAlign, XBoolean, XDirection, XInputBoolean, XJustify, XProperty, XSize, XTemplate } from '@ng-nest/ui/core';

/**
 * 表单对象共有的参数
 */
@Component({ selector: 'x-form-prop', template: '' })
export class XFormProp extends XProperty {
  /**
   * 标签
   */
  @Input() label?: string = '';
  /**
   * 标签宽度
   */
  @Input() labelWidth?: string = '';
  /**
   * 标签文字对齐方式
   */
  @Input() labelAlign?: XAlign = 'start';
  /**
   * flex 布局下的子元素水平排列方式
   */
  @Input() justify?: XJustify = 'start';
  /**
   * flex 布局下的子元素垂直排列方式
   */
  @Input() align?: XAlign = 'start';
  /**
   * flex 布局下的子元素排列方向
   */
  @Input() direction?: XDirection = 'column';
  /**
   * 输入提示信息
   */
  @Input() placeholder?: string | string[] = '';
  /**
   * 禁用
   */
  @Input() @XInputBoolean() disabled: XBoolean = false;
  /**
   * 必填
   */
  @Input() @XInputBoolean() required: XBoolean = false;
  /**
   * 只读
   */
  @Input() @XInputBoolean() readonly: XBoolean = false;
  /**
   * @zh_CN 值模板
   * @en_US Node template
   */
  @Input() valueTpl?: TemplateRef<any>;
  /**
   * @zh_CN 值模板参数
   * @en_US Node template
   */
  @Input() valueTplContext: any;
  /**
   * @zh_CN 前置标签
   * @en_US Before label
   */
  @Input() before!: XTemplate;
  /**
   * @zh_CN 后置标签
   * @en_US After label
   */
  @Input() after!: XTemplate;
  /**
   * 正则验证规则
   */
  @Input() pattern?: any;
  /**
   * 验证不通过提示文字
   */
  @Input() message?: string | string[];
  /**
   * 激活状态
   */
  @Input() @XInputBoolean() active: XBoolean = false;
  /**
   * 输入框点击样式
   */
  @Input() @XInputBoolean() pointer: XBoolean = false;
  /**
   * 输入验证函数
   */
  @Input() inputValidator!: (value: any) => boolean;
  /**
   * 激活状态
   */
  @Output() activeChange = new EventEmitter<XBoolean>();
}

export interface XFormOption {
  /**
   * 标签
   */
  label?: any;
  /**
   * 标签宽度
   */
  labelWidth?: string;
  /**
   * 标签文字对齐方式
   */
  labelAlign?: XAlign;
  /**
   * flex 布局下的子元素水平排列方式
   */
  justify?: XJustify;
  /**
   * flex 布局下的子元素垂直排列方式
   */
  align?: XAlign;
  /**
   * flex 布局下的子元素排列方向
   */
  direction?: XDirection;
  /**
   * 尺寸
   */
  size?: XSize;
  /**
   * 输入提示信息
   */
  placeholder?: string | string[];
  /**
   * 禁用
   */
  disabled?: XBoolean;
  /**
   * 必填
   */
  required?: XBoolean;
  /**
   * 正则验证规则
   */
  pattern?: RegExp | RegExp[];
  /**
   * 验证不通过提示文字
   */
  message?: string | string[];
  /**
   * 激活状态
   */
  active?: XBoolean;
  /**
   * 输入框点击样式
   */
  pointer?: XBoolean;
  /**
   * 输入验证函数
   */
  inputValidator?: (value: any) => boolean;
}
