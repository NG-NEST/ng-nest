import { XIdentity, XIdentityProperty, XBoolean, XIsEmpty } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
import { XInputOption, XInputComponent } from '@ng-nest/ui/input';
import { XSelectOption, XSelectComponent } from '@ng-nest/ui/select';
import { XCascadeOption, XCascadeComponent } from '@ng-nest/ui/cascade';
import { XCheckboxOption, XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XColorPickerOption, XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XDatePickerOption, XDatePickerComponent } from '@ng-nest/ui/date-picker';
import { XInputNumberOption, XInputNumberComponent } from '@ng-nest/ui/input-number';

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
    if (XIsEmpty(this.value)) this.value = '';
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
  | XColorPickerControlOption
  | XDatePickerControlOption
  | XInputNumberControlOption;

export type XFormControlType =
  | XInputComponent
  | XSelectComponent
  | XCascadeComponent
  | XCheckboxComponent
  | XColorPickerComponent
  | XDatePickerComponent
  | XInputNumberComponent;

export type XControlType = 'input' | 'select' | 'cascade' | 'checkbox' | 'color-picker' | 'date-picker' | 'input-number';

/**
 * Input Control
 */
export interface XInputControlOption extends XControlOption, XInputOption {}
export class XInputControl extends XControl {
  controlType: XControlType = 'input';
  constructor(option: XInputControlOption = {}) {
    super(option);
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
  }
}

/**
 * DatePicker Control
 */
export interface XDatePickerControlOption extends XControlOption, XDatePickerOption {}
export class XDatePickerControl extends XControl {
  controlType: XControlType = 'date-picker';
  constructor(option: XDatePickerControlOption = {}) {
    super(option);
  }
}

/**
 * InputNumber Control
 */
export interface XInputNumberControlOption extends XControlOption, XInputNumberOption {}
export class XInputNumberControl extends XControl {
  controlType: XControlType = 'input-number';
  constructor(option: XInputNumberControlOption = {}) {
    super(option);
  }
}
