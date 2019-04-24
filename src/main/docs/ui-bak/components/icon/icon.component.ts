import { Component, ViewEncapsulation } from "@angular/core";
import { toggleClass } from "src/share/core/style";

@Component({
  selector: "ns-icon",
  templateUrl: "./icon.component.html",
  encapsulation: ViewEncapsulation.None
})
export class NmDocIconComponent {
  ex0Code0 = `<nm-icon></nm-icon>
`;
api1Code1 = `export const IconPrefix = "nm-icon";

// Icon 参数对象
export interface NmIconOption {

}

`;
style1Code1 = `// Icon style paramters

$prefix: $nm-prefix + "-icon";
`;

  toggle(code: HTMLElement) {
    toggleClass(code, "toggle");
  }
}
