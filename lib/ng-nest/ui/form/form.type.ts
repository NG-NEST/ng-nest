import { XIdentityInput, XIdentity } from "@ng-nest/ui/core";
import { XInputInput } from "@ng-nest/ui/input";

/**
 * Form 组件名
 * @selector x-form
 * @decorator component
 */
export const FormPrefix = "x-form";

/**
 * Form @Input
 */
export interface XFormInput {
  /**
   * 表单名称
   */
  title?: string;
  /**
   * 表单控件
   */
  controls?: XControl<any>[] | XFormRow[];
}

/**
 * 控件对象
 */
export interface XControlOption<T> extends XIdentityInput {
  /**
   * 值
   */
  value?: T;
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
export class XControl<T> extends XIdentity {
  /**
   * 值
   */
  value?: T;
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
  constructor(option: XControlOption<T> = {}) {
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
  controls?: XControl<any>[];
  /**
   * 隐藏
   */
  hidden?: boolean;
}

export interface XInputControlOption extends XControlOption<string | number>, XInputInput {}

export class XInputControl extends XControl<string | number> {
  controlType: XControlType = "input";
  constructor(option: XInputControlOption = {}) {
    super(option);
    if (typeof this.value == "undefined") this.value = "";
  }
}

export type XControlType = "input" | "select";
