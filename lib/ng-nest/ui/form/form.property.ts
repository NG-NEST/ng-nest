import { XIdentity, XIdentityProperty, XBoolean, XIsEmpty } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
import { XInputOption, XInputComponent } from '@ng-nest/ui/input';
import { XSelectOption, XSelectComponent } from '@ng-nest/ui/select';
import { XCascadeOption, XCascadeComponent } from '@ng-nest/ui/cascade';
import { XCheckboxOption, XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XColorPickerOption, XColorPickerComponent } from '@ng-nest/ui/color-picker';

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
   */
  controlType?: XControlType;
  /**
   * 禁用
   */
  disabled?: XBoolean;
  /**
   * 只读
   */
  readonly?: XBoolean;
  /**
   * 必填
   */
  required?: XBoolean;
  /**
   * 隐藏
   */
  hidden?: XBoolean;
  /**
   * 列宽
   */
  span?: number;
  /**
   * 自定义属性
   */
  [prop: string]: any;
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
   */
  controlType?: XControlType;
  /**
   * 禁用
   */
  disabled?: XBoolean;
  /**
   * 只读
   */
  readonly?: XBoolean;
  /**
   * 必填
   */
  required?: XBoolean;
  /**
   * 隐藏
   */
  hidden?: XBoolean;
  /**
   * 列宽
   */
  span?: number;
  /**
   * 自定义属性
   */
  [prop: string]: any;

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
  hidden?: XBoolean;
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

export type XFormControlOption =
  | XInputControlOption
  | XSelectControlOption
  | XCascadeControlOption
  | XCheckboxControlOption
  | XColorPickerControlOption;

export type XFormControlType = XInputComponent | XSelectComponent | XCascadeComponent | XCheckboxComponent | XColorPickerComponent;

export type XControlType = 'input' | 'select' | 'cascade' | 'checkbox' | 'color-picker';

/**
 * Input Control
 */
export interface XInputControlOption extends XControlOption, XInputOption {}
export class XInputControl extends XControl {
  controlType: XControlType = 'input';
  constructor(option: XInputControlOption = {}) {
    super(option);
    if (XIsEmpty(this.value)) this.value = '';
    Object.assign(this, option);
  }
}

/**
 * Select Control
 */
export interface XSelectControlOption extends XControlOption, XSelectOption {}
export class XSelectControl extends XControl {
  controlType: XControlType = 'select';
  constructor(option: XSelectControlOption = {}) {
    super(option);
    if (XIsEmpty(this.value)) this.value = '';
    Object.assign(this, option);
  }
}

/**
 * Cascade Control
 */
export interface XCascadeControlOption extends XControlOption, XCascadeOption {}
export class XCascadeControl extends XControl {
  controlType: XControlType = 'cascade';
  constructor(option: XCascadeControlOption = {}) {
    super(option);
    if (XIsEmpty(this.value)) this.value = '';
    Object.assign(this, option);
  }
}

/**
 * Checkbox Control
 */
export interface XCheckboxControlOption extends XControlOption, XCheckboxOption {}
export class XCheckboxControl extends XControl {
  controlType: XControlType = 'checkbox';
  constructor(option: XCheckboxControlOption = {}) {
    super(option);
    if (XIsEmpty(this.value)) this.value = '';
    Object.assign(this, option);
  }
}

/**
 * ColorPicker Control
 */
export interface XColorPickerControlOption extends XControlOption, XColorPickerOption {}
export class XColorPickerControl extends XControl {
  controlType: XControlType = 'color-picker';
  constructor(option: XColorPickerControlOption = {}) {
    super(option);
    if (XIsEmpty(this.value)) this.value = '';
    Object.assign(this, option);
  }
}
