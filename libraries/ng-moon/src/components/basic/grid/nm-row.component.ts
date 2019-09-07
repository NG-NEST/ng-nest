import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  OnInit
} from "@angular/core";
import { RowPrefix } from "./nm-grid.type";

@Component({
  selector: "nm-row",
  template: "<ng-content></ng-content>",
  styleUrls: ["./nm-row.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmRowComponent implements OnInit {
  @Input() nmSpace?: number;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, RowPrefix);
  }

  ngOnInit() {
    this.setSpace();
  }

  setSpace() {
    if (this.nmSpace) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        "margin-left",
        `-${this.nmSpace / 2}rem`
      );
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        "margin-right",
        `-${this.nmSpace / 2}rem`
      );
    }
  }
}
