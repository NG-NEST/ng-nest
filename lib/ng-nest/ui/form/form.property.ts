import { XIdentity, XIdentityProperty, XBoolean, XIsEmpty, XFormProp, XNumber, XInputNumber } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { XInputOption, XInputComponent } from '@ng-nest/ui/input';
import { XSelectOption, XSelectComponent } from '@ng-nest/ui/select';
import { XCascadeOption, XCascadeComponent } from '@ng-nest/ui/cascade';
import { XCheckboxOption, XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XColorPickerOption, XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XDatePickerOption, XDatePickerComponent } from '@ng-nest/ui/date-picker';
import { XInputNumberOption, XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XRadioOption, XRadioComponent } from '@ng-nest/ui/radio';
import { XRateOption, XRateComponent } from '@ng-nest/ui/rate';
import { XSliderSelectOption, XSliderSelectComponent } from '@ng-nest/ui/slider-select';
import { XSwitchOption, XSwitchComponent } from '@ng-nest/ui/switch';
import { XTimePickerOption, XTimePickerComponent } from '@ng-nest/ui/time-picker';

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
export class XFormProperty extends XFormProp {
  /**
   * 表单FormGroup
   */
  @Input() formGroup: FormGroup = new FormGroup({});
  /**
   * 表单名称
   */
  @Input() title: string;
  /**
   * 控件间距，单位rem
   */
  @Input() @XInputNumber() space: XNumber = 1;
  /**
   * 控件宽度，24栅格
   */
  @Input() @XInputNumber() span: XNumber;
  /**
   * 标签后缀
   */
  @Input('label-suffix') labelSuffix: string = '';
  /**
   * 表单控件
   */
  @Input() controls: XFormControlOption[] | XFormRow[] = [];
  /**
   * 表单宽度
   */
  @Input() width: string = '100%';
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
  control?: XControlType;
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
   * 正则验证规则
   */
  pattern?: RegExp | RegExp[];
  /**
   * 验证不通过提示文字
   */
  message?: string | string[];
  /**
   * 自定义属性
   */
  [prop: string]: any;
}

/**
 * 控件对象
 */
export class XControl extends XIdentity implements XControlOption {
  /**
   * 值
   */
  value?: any;
  /**
   * 控件类型
   */
  control?: XControlType;
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
   * 正则验证规则
   */
  pattern?: RegExp | RegExp[];
  /**
   * 验证不通过提示文字
   */
  message?: string | string[];
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
  controls: XFormControlOption[];
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

export class XFormControl extends FormControl {
  /**
   * 提示信息
   */
  messages?: string[] = [];
}

export type XFormControlOption =
  | XInputControlOption
  | XSelectControlOption
  | XCascadeControlOption
  | XCheckboxControlOption
  | XColorPickerControlOption
  | XDatePickerControlOption
  | XInputNumberControlOption
  | XRadioControlOption
  | XRateControlOption
  | XSliderSelectControlOption
  | XSwitchControlOption
  | XTimePickerControlOption;

export type XFormControlComponent =
  | XInputComponent
  | XSelectComponent
  | XCascadeComponent
  | XCheckboxComponent
  | XColorPickerComponent
  | XDatePickerComponent
  | XInputNumberComponent
  | XRadioComponent
  | XRateComponent
  | XSliderSelectComponent
  | XSwitchComponent
  | XTimePickerComponent;

export type XFormControlType =
  | XInputControl
  | XSelectControl
  | XCascadeControl
  | XCheckboxControl
  | XColorPickerControl
  | XDatePickerControl
  | XInputNumberControl
  | XRadioControl
  | XRateControl
  | XSliderSelectControl
  | XSwitchControl
  | XTimePickerControl;

export type XControlType =
  | 'input'
  | 'select'
  | 'cascade'
  | 'checkbox'
  | 'color-picker'
  | 'date-picker'
  | 'input-number'
  | 'radio'
  | 'rate'
  | 'slider-select'
  | 'switch'
  | 'time-picker';

/**
 * Input Control
 */
export interface XInputControlOption extends XControlOption, XInputOption {}
export class XInputControl extends XControl {
  constructor(option: XInputControlOption = {}) {
    super(option);
  }
}

/**
 * Select Control
 */
export interface XSelectControlOption extends XControlOption, XSelectOption {}
export class XSelectControl extends XControl {
  constructor(option: XSelectControlOption = {}) {
    super(option);
  }
}

/**
 * Cascade Control
 */
export interface XCascadeControlOption extends XControlOption, XCascadeOption {}
export class XCascadeControl extends XControl {
  constructor(option: XCascadeControlOption = {}) {
    super(option);
  }
}

/**
 * Checkbox Control
 */
export interface XCheckboxControlOption extends XControlOption, XCheckboxOption {}
export class XCheckboxControl extends XControl {
  constructor(option: XCheckboxControlOption = {}) {
    super(option);
  }
}

/**
 * ColorPicker Control
 */
export interface XColorPickerControlOption extends XControlOption, XColorPickerOption {}
export class XColorPickerControl extends XControl {
  constructor(option: XColorPickerControlOption = {}) {
    super(option);
  }
}

/**
 * DatePicker Control
 */
export interface XDatePickerControlOption extends XControlOption, XDatePickerOption {}
export class XDatePickerControl extends XControl {
  constructor(option: XDatePickerControlOption = {}) {
    super(option);
  }
}

/**
 * InputNumber Control
 */
export interface XInputNumberControlOption extends XControlOption, XInputNumberOption {}
export class XInputNumberControl extends XControl {
  constructor(option: XInputNumberControlOption = {}) {
    super(option);
  }
}

/**
 * Radio Control
 */
export interface XRadioControlOption extends XControlOption, XRadioOption {}
export class XRadioControl extends XControl {
  constructor(option: XRadioControlOption = {}) {
    super(option);
  }
}

/**
 * Rate Control
 */
export interface XRateControlOption extends XControlOption, XRateOption {}
export class XRateControl extends XControl {
  constructor(option: XRateControlOption = {}) {
    super(option);
  }
}

/**
 * SliderSelect Control
 */
export interface XSliderSelectControlOption extends XControlOption, XSliderSelectOption {}
export class XSliderSelectControl extends XControl {
  constructor(option: XSliderSelectControlOption = {}) {
    super(option);
  }
}

/**
 * Switch Control
 */
export interface XSwitchControlOption extends XControlOption, XSwitchOption {}
export class XSwitchControl extends XControl {
  constructor(option: XSwitchControlOption = {}) {
    super(option);
  }
}

/**
 * TimePicker Control
 */
export interface XTimePickerControlOption extends XControlOption, XTimePickerOption {}
export class XTimePickerControl extends XControl {
  constructor(option: XTimePickerControlOption = {}) {
    super(option);
  }
}
