import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  OnInit,
  HostBinding
} from "@angular/core";
import { RowPrefix, NuJustify, NuAlign } from "./nu-grid.type";

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
  @Input() nuJustify?: NuJustify;
  @Input() nuAlign?: NuAlign;

  @HostBinding(`class.nu-row-flex`) get getFlex() {
    return this.nuJustify || this.nuAlign;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, RowPrefix);
  }

  ngOnInit() {
    this.setSpace();
    this.setJustify();
    this.setAlign();
  }

  setSpace() {
    if (!this.nuSpace) return;
    this.renderer.setStyle(this.elementRef.nativeElement, "margin-left", `-${this.nuSpace / 2}rem`);
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      "margin-right",
      `-${this.nuSpace / 2}rem`
    );
  }

  setJustify() {
    if (!this.nuJustify) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${RowPrefix}-justity-${this.nuJustify}`);
  }

  setAlign() {
    if (!this.nuAlign) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${RowPrefix}-align-${this.nuAlign}`);
  }
}
