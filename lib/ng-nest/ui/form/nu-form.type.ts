import { NuIdentityOption, NuIdentity } from "@ng-nest/ui/core";
import { NuInputOption } from "@ng-nest/ui/input";

/**
 * Form 组件名
 * @selector nu-form
 * @decorator component
 */
export const FormPrefix = "nu-form";

/**
 * Form 参数对象
 */
export interface NuFormOption {
  /**
   * 表单名称
   */
  nuTitle?: string;
  /**
   * 表单控件
   */
  nuControls?: NuControl<any>[] | NuFormRow[];
}

/**
 * 控件对象
 */
export interface NuControlOption<T> extends NuIdentityOption {
  /**
   * 值
   */
  nuValue?: T;
  /**
   * 控件类型
   * @default "input"
   */
  nuControlType?: NuControlType;
  /**
   * 禁用
   */
  nuDisabled?: boolean;
  /**
   * 只读
   */
  nuReadonly?: boolean;
  /**
   * 必填
   */
  nuRequired?: boolean;
  /**
   * 隐藏
   */
  nuHidden?: boolean;
  /**
   * 列宽
   */
  nuSpan?: number;
}

/**
 * 控件对象
 */
export class NuControl<T> extends NuIdentity {
  /**
   * 值
   */
  nuValue?: T;
  /**
   * 控件类型
   * @default "input"
   */
  nuControlType?: NuControlType;
  /**
   * 禁用
   */
  nuDisabled?: boolean;
  /**
   * 只读
   */
  nuReadonly?: boolean;
  /**
   * 必填
   */
  nuRequired?: boolean;
  /**
   * 隐藏
   */
  nuHidden?: boolean;
  /**
   * 列宽
   */
  nuSpan?: number;
  constructor(option: NuControlOption<T> = {}) {
    super();
    Object.assign(this, option);
  }
}

/**
 * 表单行对象
 */
export interface NuFormRow {
  /**
   * 行标题
   */
  nuTitle?: string;
  /**
   * 行图标
   */
  nuIcon?: string;
  /**
   * 行中的控件
   */
  nuControls?: NuControl<any>[];
  /**
   * 隐藏
   */
  nuHidden?: boolean;
}

export interface NuInputControlOption
  extends NuControlOption<string | number>,
    NuInputOption {}

export class NuInputControl extends NuControl<string | number> {
  nuControlType: NuControlType = "input";
  constructor(option: NuInputControlOption = {}) {
    super(option);
    if (typeof this.nuValue == "undefined") this.nuValue = "";
  }
}

export type NuControlType = "input" | "select";
