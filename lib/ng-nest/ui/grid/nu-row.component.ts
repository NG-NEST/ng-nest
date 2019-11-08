import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  OnInit
} from "@angular/core";
import { RowPrefix } from "./nu-grid.type";

@Component({
  selector: "nu-row",
  template: "<ng-content></ng-content>",
  styleUrls: ["./nu-row.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuRowComponent implements OnInit {
  @Input() nuSpace?: number;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, RowPrefix);
  }

  ngOnInit() {
    this.setSpace();
  }

  setSpace() {
    if (this.nuSpace) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        "margin-left",
        `-${this.nuSpace / 2}rem`
      );
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        "margin-right",
        `-${this.nuSpace / 2}rem`
      );
    }
  }
}
