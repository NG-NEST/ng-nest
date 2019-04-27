import { Component, ViewEncapsulation } from "@angular/core";
import { toggleClass } from "src/share/core/style";

@Component({
  selector: "ns-icon",
  templateUrl: "./icon.component.html",
  encapsulation: ViewEncapsulation.None
})
export class NmDocIconComponent {
  ex0Code0 = `<nm-icon [nmType]="'ado-shopping'"></nm-icon>
<nm-icon [nmType]="'adf-shopping'"></nm-icon>
<nm-icon [nmType]="'adt-shopping'"></nm-icon>
`;
ex1Code1 = `<nm-icon [nmType]="'ado-shopping'"></nm-icon>
<nm-icon [nmType]="'adf-shopping'"></nm-icon>
<nm-icon [nmType]="'adt-shopping'"></nm-icon>
`;
ex2Code2 = `<nm-icon [nmType]="'ado-shopping'"></nm-icon>
<nm-icon [nmType]="'adf-shopping'"></nm-icon>
<nm-icon [nmType]="'adt-shopping'"></nm-icon>
`;
ex3Code3 = `<nm-icon [nmType]="'ado-shopping'"></nm-icon>
<nm-icon [nmType]="'adf-shopping'"></nm-icon>
<nm-icon [nmType]="'adt-shopping'"></nm-icon>
`;
ex4Code4 = `<nm-icon [nmType]="'ado-shopping'"></nm-icon>
<nm-icon [nmType]="'adf-shopping'"></nm-icon>
<nm-icon [nmType]="'adt-shopping'"></nm-icon>
`;
api1Code1 = `export const IconPrefix = "nm-icon";

// Icon 参数对象
export interface NmIconOption {
  // 图标类型
  nmType?: string;
  // 图标颜色
  nmColor?: string | string[];
  // 图标旋转角度
  nmRotate?: number;
}

// 图标来源
export enum NmIconSourceEnum {
  // Ant Design
  AntDesign = "ant-design",
  // Eva
  Eva = "eva",
  // Feather
  Feather = "feather",
  // Font Awesome
  FontAwesome = "font-awesome",
  // Material Design
  MaterialDesign = "material-design"
}
`;
style1Code1 = `// Icon style paramters

$prefix: $nm-prefix + "-icon";
`;

  toggle(code: HTMLElement) {
    toggleClass(code, "toggle");
  }
}
