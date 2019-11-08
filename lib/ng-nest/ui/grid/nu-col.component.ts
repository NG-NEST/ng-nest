import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  Optional,
  Host
} from "@angular/core";
import { ColPrefix } from "./nu-grid.type";
import { NuRowComponent } from "./nu-row.component";

@Component({
  selector: "nu-col",
  template: "<ng-content></ng-content>",
  styleUrls: ["./nu-col.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuColComponent implements OnInit {
  @Input() nuSpan?: number;

  constructor(
    @Optional() @Host() public nuRowComponent: NuRowComponent,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, ColPrefix);
  }

  ngOnInit() {
    if (typeof this.nuSpan !== "undefined") {
      this.renderer.addClass(
        this.elementRef.nativeElement,
        `${ColPrefix}-${this.nuSpan}`
      );
    }
    if (this.nuRowComponent && this.nuRowComponent.nuSpace) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        "padding-left",
        `${this.nuRowComponent.nuSpace / 2}rem`
      );
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        "padding-right",
        `${this.nuRowComponent.nuSpace / 2}rem`
      );
    }
  }
}
