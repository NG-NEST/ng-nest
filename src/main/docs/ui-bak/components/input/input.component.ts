import { Component, ViewEncapsulation } from "@angular/core";
import { toggleClass } from "src/share/core/style";

@Component({
  selector: "ns-input",
  templateUrl: "./input.component.html",
  encapsulation: ViewEncapsulation.None
})
export class NmDocInputComponent {
  toggle(code: HTMLElement) {
    toggleClass(code, "toggle");
  }
}
