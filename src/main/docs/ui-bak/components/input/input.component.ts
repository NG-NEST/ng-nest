import { Component, ViewEncapsulation } from "@angular/core";
import { toggleClass } from "src/share/core/style";

@Component({
  selector: "ns-input",
  templateUrl: "./input.component.html",
  encapsulation: ViewEncapsulation.None
})
export class NmDocInputComponent {
  ex0Code0 = `<nm-input [nmPlaceholder]="'默认'"></nm-input>
`;
ex1Code1 = `<nm-input [nmPlaceholder]="'文本'"></nm-input>
<br />
<nm-input [nmType]="'number'" [nmPlaceholder]="'数字'"></nm-input>
<br />
<nm-input [nmType]="'password'" [nmPlaceholder]="'密码'"></nm-input>
`;
ex2Code2 = `<nm-input [nmPlaceholder]="'默认'"></nm-input>
<br />
<nm-input [nmRequired]="true" [nmPlaceholder]="'必填'"></nm-input>
<br />
<nm-input [nmDisabled]="true" [nmPlaceholder]="'禁用'"></nm-input>
`;
ex3Code3 = `<nm-input [nmLabel]="'默认'" [nmPlaceholder]="'默认'"></nm-input>
<br />
<nm-input [nmLabel]="'水平'" [nmLayout]="'horizontal'" [nmPlaceholder]="'水平'"></nm-input>
<br />
<nm-input [nmLabel]="'垂直'" [nmLayout]="'vertical'" [nmPlaceholder]="'垂直'"></nm-input>
`;
api1Code1 = `export const prefix = "nm-input";

/** Input 参数对象 */
export interface NmInputOption {
  /** 布局方式，默认 Vertical */
  nmLayout?: NmInputLayoutEnum;
  /** Label 内容 */
  nmLabel?: string;
  /** Input 输入类型 */
  nmType?: NmInputTypeEnum;
  /** 提示描述 */
  nmPlaceholder?: string;
  /** 必填 */
  nmRequired?: boolean;
  /** 禁用 */
  nmDisabled?: boolean;
  /** 图标 */
  nmIcon?: string;
  /** 图标布局方式，默认 Right */
  nmIconLayout?: NmInputIconLayoutEnum;
}

/** 布局方式，此处指文本跟输入框的位置 */
export enum NmInputLayoutEnum {
  /** 水平 */
  Horizontal = "horizontal",
  /** 垂直 */
  Vertical = "vertical"
}

/** 输入框类型 */
export enum NmInputTypeEnum {
  /** 文本 */
  Text = "text",
  /** 密码 */
  Password = "password",
  /** 数字 */
  Number = "number"
}

/** 图标布局方式，指在输入框中的位置 */
export enum NmInputIconLayoutEnum {
  /** 靠左 */
  Left = "left",
  /** 靠右 */
  Right = "right"
}
`;

  toggle(code: HTMLElement) {
    toggleClass(code, "toggle");
  }
}
