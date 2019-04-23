import { Component, ViewEncapsulation } from "@angular/core";
import { toggleClass } from "src/share/core/style";

@Component({
  selector: "ns-{{ component }}",
  templateUrl: "./{{ component }}.component.html",
  encapsulation: ViewEncapsulation.None
})
export class NmDoc{{ componentName }}Component {
  {{ param }}
  toggle(code: HTMLElement) {
    toggleClass(code, "toggle");
  }
}
