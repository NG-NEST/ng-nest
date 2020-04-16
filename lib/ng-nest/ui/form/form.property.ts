import { XIdentity, XIdentityProperty } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Form
 * @selector x-form
 * @decorator component
 */
export const XFormPrefix = 'x-form';

/**
 * Form Property
 */
@Component({ template: '' })
export class XFormProperty {
  /**
   * 表单名称
   */
  @Input() title: string;
  /**
   * 表单控件
   */
  @Input() controls: XControl[] | XFormRow[] = [];
}

/**
 * 控件对象
 */
export interface XControlOption extends XIdentityProperty {
  /**
   * 值
   */
  value?: any;
  /**
   * 控件类型
   * @default "input"
   */
  controlType?: XControlType;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 只读
   */
  readonly?: boolean;
  /**
   * 必填
   */
  required?: boolean;
  /**
   * 隐藏
   */
  hidden?: boolean;
  /**
   * 列宽
   */
  span?: number;
}

/**
 * 控件对象
 */
export class XControl extends XIdentity {
  /**
   * 值
   */
  value?: any;
  /**
   * 控件类型
   * @default "input"
   */
  controlType?: XControlType;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 只读
   */
  readonly?: boolean;
  /**
   * 必填
   */
  required?: boolean;
  /**
   * 隐藏
   */
  hidden?: boolean;
  /**
   * 列宽
   */
  span?: number;

  constructor(option: XControlOption = {}) {
    super();
    Object.assign(this, option);
  }
}

/**
 * 表单行对象
 */
export interface XFormRow {
  /**
   * 行标题
   */
  title?: string;
  /**
   * 行图标
   */
  icon?: string;
  /**
   * 行中的控件
   */
  controls: XControl[];
  /**
   * 隐藏
   */
  hidden?: boolean;
}

/**
 * Control
 * @selector x-control
 * @decorator component
 */
export const XControlPrefix = 'x-control';

/**
 * Control Property
 */
@Component({ template: '' })
export class XControlProperty {
  /**
   * 控件对象
   */
  @Input() option: XControlOption;
}

export interface XInputControlOption extends XControlOption {}

export class XInputControl extends XControl {
  controlType: XControlType = 'input';
  constructor(option: XInputControlOption = {}) {
    super(option);
    if (typeof this.value == 'undefined') this.value = '';
  }
}

export type XControlType = 'input' | 'select';
