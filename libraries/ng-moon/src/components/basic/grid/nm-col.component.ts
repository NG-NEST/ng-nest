import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input
} from "@angular/core";
import { NmColOption, ColPrefix } from "./nm-grid.type";
import { fillDefault } from "../../../core/util";

@Component({
  selector: "nm-col",
  template: "<ng-content></ng-content>",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmColComponent implements OnInit {
  @Input() nmCol: number;
  private _default: NmColOption = {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, ColPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    if (typeof this.nmCol !== "undefined") {
      this.renderer.addClass(
        this.elementRef.nativeElement,
        `${ColPrefix}-${this.nmCol}`
      );
    }
  }
}
