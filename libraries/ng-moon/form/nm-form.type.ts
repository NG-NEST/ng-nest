import { NmIdentityOption, NmIdentity } from "ng-moon/core";
import { NmInputOption } from "ng-moon/input";

/**
 * Form 组件名
 * @selector nm-form
 * @decorator component
 */
export const FormPrefix = "nm-form";

/**
 * Form 参数对象
 */
export interface NmFormOption {
  /**
   * 表单名称
   */
  nmTitle?: string;
  /**
   * 表单控件
   */
  nmControls?: NmControl<any>[] | NmFormRow[];
}

/**
 * 控件对象
 */
export interface NmControlOption<T> extends NmIdentityOption {
  /**
   * 值
   */
  nmValue?: T;
  /**
   * 控件类型
   * @default "input"
   */
  nmControlType?: NmControlType;
  /**
   * 禁用
   */
  nmDisabled?: boolean;
  /**
   * 只读
   */
  nmReadonly?: boolean;
  /**
   * 必填
   */
  nmRequired?: boolean;
  /**
   * 隐藏
   */
  nmHidden?: boolean;
  /**
   * 列宽
   */
  nmSpan?: number;
}

/**
 * 控件对象
 */
export class NmControl<T> extends NmIdentity {
  /**
   * 值
   */
  nmValue?: T;
  /**
   * 控件类型
   * @default "input"
   */
  nmControlType?: NmControlType;
  /**
   * 禁用
   */
  nmDisabled?: boolean;
  /**
   * 只读
   */
  nmReadonly?: boolean;
  /**
   * 必填
   */
  nmRequired?: boolean;
  /**
   * 隐藏
   */
  nmHidden?: boolean;
  /**
   * 列宽
   */
  nmSpan?: number;
  constructor(option: NmControlOption<T> = {}) {
    super();
    Object.assign(this, option);
  }
}

/**
 * 表单行对象
 */
export interface NmFormRow {
  /**
   * 行标题
   */
  nmTitle?: string;
  /**
   * 行图标
   */
  nmIcon?: string;
  /**
   * 行中的控件
   */
  nmControls?: NmControl<any>[];
  /**
   * 隐藏
   */
  nmHidden?: boolean;
}

export interface NmInputControlOption
  extends NmControlOption<string | number>,
    NmInputOption {}

export class NmInputControl extends NmControl<string | number> {
  nmControlType: NmControlType = "input";
  constructor(option: NmInputControlOption = {}) {
    super(option);
    if (typeof this.nmValue == "undefined") this.nmValue = "";
  }
}

export type NmControlType = "input" | "select";
