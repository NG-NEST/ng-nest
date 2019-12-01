import { XJustify, XAlign, XDirection } from "./layout.type";

// 表单对象共有的参数
export interface XFormProperty {
  justify?: XJustify;
  align?: XAlign;
  direction?: XDirection;
  label?: string;
  disabled?: boolean | string;
  required?: boolean | string;
}
