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
import { XRowPrefix, XJustify, XAlign } from "./grid.type";

@Component({
  selector: "x-row",
  template: "<ng-content></ng-content>",
  styleUrls: ["./row.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XRowComponent implements OnInit {
  @Input() space?: number;
  @Input() justify?: XJustify;
  @Input() align?: XAlign;

  @HostBinding(`class.x-row-flex`) get getFlex() {
    return this.justify || this.align;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XRowPrefix);
  }

  ngOnInit() {
    this.setSpace();
    this.setX();
    this.setAlign();
  }

  setSpace() {
    if (!this.space) return;
    this.renderer.setStyle(this.elementRef.nativeElement, "margin-left", `-${this.space / 2}rem`);
    this.renderer.setStyle(this.elementRef.nativeElement, "margin-right", `-${this.space / 2}rem`);
  }

  setX() {
    if (!this.justify) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XRowPrefix}-justity-${this.justify}`);
  }

  setAlign() {
    if (!this.align) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XRowPrefix}-align-${this.align}`);
  }
}
