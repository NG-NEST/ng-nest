import { XClassMap, XJustify, XAlign, XDirection, XBoolean, XSize } from '../interfaces';
import { Input } from '@angular/core';
import { XInputBoolean } from './convert';

export class XProperty {
  classMap: XClassMap = {};
}

/**
 * 表单对象共有的参数
 */
export class XFormProp extends XProperty {
  /**
   * 标签
   */
  @Input() label: string = '';
  /**
   * 标签宽度
   */
  @Input('label-width') labelWidth: string = '';
  /**
   * 标签文字对齐方式
   */
  @Input('label-align') labelAlign: XAlign = 'start';
  /**
   * flex 布局下的子元素水平排列方式
   */
  @Input() justify: XJustify = 'start';
  /**
   * flex 布局下的子元素垂直排列方式
   */
  @Input() align: XAlign = 'start';
  /**
   * flex 布局下的子元素排列方向
   */
  @Input() direction: XDirection = 'column';
  /**
   * 尺寸
   */
  @Input() size: XSize = 'medium';
  /**
   * 输入提示信息
   */
  @Input() placeholder: string = '';
  /**
   * 禁用
   */
  @Input() @XInputBoolean() disabled: XBoolean = false;
  /**
   * 必填
   */
  @Input() @XInputBoolean() required: XBoolean = false;
  /**
   * 正则验证规则
   */
  @Input() pattern: RegExp | RegExp[];
  /**
   * 验证不通过提示文字
   */
  @Input() message: string | string[];
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
  placeholder?: string;
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
}
