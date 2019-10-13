import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2
} from "@angular/core";
import { PortalPrefix } from "./nm-portal.type";

@Component({
  selector: "nm-portal",
  templateUrl: "./nm-portal.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmPortalComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, PortalPrefix);
  }
}
