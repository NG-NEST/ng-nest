import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  Input,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  Renderer2
} from "@angular/core";
import { XSelectPortal, XSelectNode, XSelectPortalPrefix } from "./select.type";

@Component({
  selector: "x-select-portal",
  templateUrl: "./select-portal.component.html",
  styleUrls: ["./select-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSelectPortalComponent {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(XSelectPortal) public option: any,
    public cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, XSelectPortalPrefix);
  }

  nodeClick(node: XSelectNode) {
    this.option.nodeEmit(node);
  }
}
