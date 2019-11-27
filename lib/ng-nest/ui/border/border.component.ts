import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef } from "@angular/core";
import { XBorderPrefix } from "./border.type";

@Component({
  selector: "x-border",
  templateUrl: "./border.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBorderComponent implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XBorderPrefix);
  }

  ngOnInit() {}
}
