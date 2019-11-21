import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  Optional,
  Host,
  HostBinding
} from "@angular/core";
import { XColPrefix } from "./grid.type";
import { XRowComponent } from "./row.component";

@Component({
  selector: `${XColPrefix}`,
  template: "<ng-content></ng-content>",
  styleUrls: ["./col.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XColComponent implements OnInit {
  @Input() span?: number;
  @Input() offset?: number;
  @Input() xs?: number;
  @Input() sm?: number;
  @Input() md?: number;
  @Input() lg?: number;
  @Input() xl?: number;

  @HostBinding(`class.x-col-24`) get getFlex() {
    return this.xs || this.sm || this.md || this.lg || this.xl;
  }

  constructor(
    @Optional() @Host() public rowComponent: XRowComponent,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, XColPrefix);
  }

  ngOnInit() {
    this.setSpan();
    this.setOffset();
    this.setSpace();
    this.setLayout();
  }

  setSpan() {
    if (!this.span) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-${this.span}`);
  }

  setOffset() {
    if (!this.offset) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-offset-${this.offset}`);
  }

  setSpace() {
    if (!this.rowComponent || !this.rowComponent.space) return;
    this.renderer.setStyle(this.elementRef.nativeElement, "padding-left", `${this.rowComponent.space / 2}rem`);
    this.renderer.setStyle(this.elementRef.nativeElement, "padding-right", `${this.rowComponent.space / 2}rem`);
  }

  setLayout() {
    if (this.xs) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-xs-${this.xs}`);
    }
    if (this.sm) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-sm-${this.sm}`);
    }
    if (this.md) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-md-${this.md}`);
    }
    if (this.lg) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-lg-${this.lg}`);
    }
    if (this.xl) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-xl-${this.xl}`);
    }
  }
}
