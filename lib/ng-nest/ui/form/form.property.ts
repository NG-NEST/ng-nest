import {
  XIdentity,
  XIdentityProperty,
  XBoolean,
  XIsEmpty,
  XNumber,
  XInputNumber,
  XInputBoolean,
  XWithConfig,
} from '@ng-nest/ui/core';
import { Input, Component, TemplateRef } from '@angular/core';
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
import { XTextareaOption, XTextareaComponent } from '@ng-nest/ui/textarea';
import { XFindOption, XFindComponent } from '@ng-nest/ui/find';
import { XFormOption, XFormProp } from '@ng-nest/ui/base-form';

/**
 * Form
 * @selector x-form
 * @decorator component
 */
export const XFormPrefix = 'x-form';
const X_CONFIG_NAME = 'form';

/**
 * @zh_CN 模板
 * @en_US Template
 */
export type XFormTemplate = { [property: string]: TemplateRef<any> };
/**
 * Form Property
 */
@Component({ template: '' })
export class XFormProperty extends XFormProp {
  /**
   * @zh_CN 表单 FormGroup
   * @en_US Form FormGroup
   */
  @Input() formGroup: FormGroup = new FormGroup({});
  /**
   * @zh_CN 表单名称
   * @en_US Form name
   */
  @Input() title!: string;
  /**
   * @zh_CN 控件间距，单位rem
   * @en_US Control spacing, unit rem
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 1) @XInputNumber() space!: XNumber;
  /**
   * @zh_CN 控件宽度，24栅格
   * @en_US Control width, 24 grid
   */
  @Input() @XInputNumber() span!: XNumber;
  /**
   * @zh_CN 标签后缀
   * @en_US Label suffix
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, '') labelSuffix!: string;
  /**
   * @zh_CN 表单控件
   * @en_US Form control
   */
  @Input() controls: XFormControlOption[] | XFormRow[] = [];
  /**
   * @zh_CN 表单宽度
   * @en_US Form width
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '100%') width: string = '100%';
  /**
   * @zh_CN 表单禁用
   * @en_US Form disabled
   */
  @Input() @XInputBoolean() disabled!: XBoolean;
  /**
   * @zh_CN 自定义模板
   * @en_US Custom template
   */
  @Input() controlTpl: XFormTemplate = {};
}

/**
 * @zh_CN 控件对象
 * @en_US Control object
 */
export interface XControlOption extends XIdentityProperty {
  /**
   * @zh_CN 值
   * @en_US Value
   */
  value?: any;
  /**
   * @zh_CN 控件类型
   * @en_US Control type
   */
  control?: XControlType;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: XBoolean;
  /**
   * @zh_CN 只读
   * @en_US Read only
   */
  readonly?: XBoolean;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  required?: XBoolean;
  /**
   * @zh_CN 隐藏
   * @en_US Hide
   */
  hidden?: XBoolean;
  /**
   * @zh_CN 列宽
   * @en_US Column width
   */
  span?: number;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular validation rules
   */
  pattern?: RegExp | RegExp[];
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verification failed prompt text
   */
  message?: string | string[];
  /**
   * @zh_CN 外部改变事件
   * @en_US External change event
   */
  change?: () => void;
  /**
   * @zh_CN 自定义属性
   * @en_US Custom attributes
   */
  [property: string]: any;
}

/**
 * @zh_CN 控件对象
 * @en_US Control object
 */
export class XControl extends XIdentity implements XControlOption {
  /**
   * @zh_CN 值
   * @en_US Value
   */
  value?: any;
  /**
   * @zh_CN 控件类型
   * @en_US Control type
   */
  control?: XControlType;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: XBoolean;
  /**
   * @zh_CN 只读
   * @en_US Read only
   */
  readonly?: XBoolean;
  /**
   * @zh_CN 必填
   * @en_US Required
   */
  required?: XBoolean;
  /**
   * @zh_CN 隐藏
   * @en_US Hide
   */
  hidden?: XBoolean;
  /**
   * @zh_CN 列宽
   * @en_US Column width
   */
  span?: number;
  /**
   * @zh_CN 正则验证规则
   * @en_US Regular validation rules
   */
  pattern?: RegExp | RegExp[];
  /**
   * @zh_CN 验证不通过提示文字
   * @en_US Verification failed prompt text
   */
  message?: string | string[];
  /**
   * @zh_CN 外部改变事件
   * @en_US External change event
   */
  change?: () => void;
  /**
   * @zh_CN 自定义属性
   * @en_US Custom attributes
   */
  [property: string]: any;

  constructor(option: XControlOption = {}) {
    super();
    if (XIsEmpty(this.value)) this.value = '';
    Object.assign(this, option);
  }
}

/**
 * @zh_CN 表单行对象
 * @en_US Form row object
 */
export interface XFormRow {
  /**
   * @zh_CN 行标题
   * @en_US Row header
   */
  title?: string;
  /**
   * @zh_CN 行图标
   * @en_US Row icon
   */
  icon?: string;
  /**
   * @zh_CN 行中的控件
   * @en_US Control in row
   */
  controls: XFormControlOption[];
  /**
   * @zh_CN 隐藏
   * @en_US Hidden
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
   * @zh_CN 控件对象
   * @en_US Control object
   */
  @Input() option!: XControlOption;
}

export class XFormControl extends FormControl {
  /**
   * @zh_CN 提示信息
   * @en_US Prompt information
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
  | XTimePickerControlOption
  | XFindControlOption
  | XTemplateControlOption
  ;

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
  | XTimePickerComponent
  | XTextareaComponent
  | XFindComponent;

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
  | XTimePickerControl
  | XTextareaControl
  | XFindControl;

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
  | 'time-picker'
  | 'textarea'
  | 'find'
  | 'template';

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

/**
 * Textarea Control
 */
export interface XTextareaControlOption extends XControlOption, XTextareaOption {}
export class XTextareaControl extends XControl {
  constructor(option: XTextareaControlOption = {}) {
    super(option);
  }
}

/**
 * Find Control
 */
export interface XFindControlOption extends XControlOption, XFindOption {}
export class XFindControl extends XControl {
  constructor(option: XFindControlOption = {}) {
    super(option);
  }
}

/**
 * Template Control
 */
export interface XTemplateControlOption extends XControlOption, XFormOption {
}