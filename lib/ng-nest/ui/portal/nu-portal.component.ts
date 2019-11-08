import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2
} from "@angular/core";
import { PortalPrefix } from "./nu-portal.type";

@Component({
  selector: "nu-portal",
  templateUrl: "./nu-portal.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuPortalComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, PortalPrefix);
  }
}
