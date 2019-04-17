import { Component, ViewEncapsulation, OnInit, Renderer2 } from "@angular/core";
import { toggleClass } from "src/share/core/style";

@Component({
  selector: "ns-input",
  templateUrl: "./input.component.html",
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {
  ex1Code1: string = `<nm-input [nmPlaceholder]="'默认'"></nm-input>`;

  ex2Code1: string = `
  <nm-input [nmType]="'text'" [nmPlaceholder]="'文本'"></nm-input>
  <br />
  <nm-input [nmType]="'number'" [nmPlaceholder]="'数字'"></nm-input>
  <br />
  <nm-input [nmType]="'password'" [nmPlaceholder]="'密码'"></nm-input>`;

  api1Code1: string = `
/**
 * Input 参数对象
 */
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

  export enum NmInputLayoutEnum {
    Horizontal = "horizontal",
    Vertical = "vertical"
  }

  export enum NmInputTypeEnum {
    Text = "text",
    Password = "password",
    Number = "number"
  }

  export enum NmInputIconLayoutEnum {
    Left = "left",
    Right = "right"
  }`;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  toggle(code: HTMLElement) {
    toggleClass(code, "toggle");
  }
}
