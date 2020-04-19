import { XClassMap, XJustify, XAlign, XDirection, XBoolean } from '../interfaces';
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
   * 输入提示信息
   */
  @Input() placeholder: string = '';
  /**
   * 禁用
   */
  @Input() @XInputBoolean() disabled: XBoolean;
  /**
   * 必填
   */
  @Input() @XInputBoolean() required: XBoolean;
}
