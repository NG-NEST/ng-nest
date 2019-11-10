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
  @Input() nuOffset?: number;
  @Input() nuXs?: number;
  @Input() nuSm?: number;
  @Input() nuMd?: number;
  @Input() nuLg?: number;
  @Input() nuXl?: number;
  @Input() nuHiddenXsOnly?: boolean;
  @Input() nuHiddenSmOnly?: boolean;
  @Input() nuHiddenSmAndDown?: boolean;
  @Input() nuHiddenSmAndUp?: boolean;
  @Input() nuHiddenMdOnly?: boolean;
  @Input() nuHiddenMdAndDown?: boolean;
  @Input() nuHiddenMdAndUp?: boolean;
  @Input() nuHiddenLgOnly?: boolean;
  @Input() nuHiddenLgAndDown?: boolean;
  @Input() nuHiddenLgAndUp?: boolean;
  @Input() nuHiddenXlOnly?: boolean;

  @HostBinding(`class.nu-col-24`) get getFlex() {
    return this.nuXs || this.nuSm || this.nuMd || this.nuLg || this.nuXl;
  }

  constructor(
    @Optional() @Host() public nuRowComponent: NuRowComponent,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, ColPrefix);
  }

  ngOnInit() {
    this.setSpan();
    this.setOffset();
    this.setSpace();
    this.setLayout();
    this.setHidden();
  }

  setSpan() {
    if (!this.nuSpan) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-${this.nuSpan}`);
  }

  setOffset() {
    if (!this.nuOffset) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-offset-${this.nuOffset}`);
  }

  setSpace() {
    if (!this.nuRowComponent || !this.nuRowComponent.nuSpace) return;
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

  setLayout() {
    if (this.nuXs) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-xs-${this.nuXs}`);
    }
    if (this.nuSm) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-sm-${this.nuSm}`);
    }
    if (this.nuMd) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-md-${this.nuMd}`);
    }
    if (this.nuLg) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-lg-${this.nuLg}`);
    }
    if (this.nuXl) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-xl-${this.nuXl}`);
    }
  }

  setHidden() {
    if (this.nuHiddenXsOnly) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-xs-only`);
    }
    if (this.nuHiddenSmOnly) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-sm-only`);
    }
    if (this.nuHiddenSmAndDown) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-sm-and-down`);
    }
    if (this.nuHiddenSmAndUp) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-xs-and-up`);
    }
    if (this.nuHiddenMdOnly) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-md-only`);
    }
    if (this.nuHiddenMdAndDown) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-md-and-down`);
    }
    if (this.nuHiddenMdAndUp) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-md-and-up`);
    }
    if (this.nuHiddenLgOnly) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-lg-only`);
    }
    if (this.nuHiddenLgAndDown) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-lg-and-down`);
    }
    if (this.nuHiddenLgAndUp) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-lg-and-up`);
    }
    if (this.nuHiddenXlOnly) {
      this.renderer.addClass(this.elementRef.nativeElement, `${ColPrefix}-hidden-xl-only`);
    }
  }
}
