import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Renderer2,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
import { NmStyleOption, StylePrefix } from "./nm-style.type";
import { fillDefault } from "../../../core/util";

@Component({
  selector: "nm-style",
  templateUrl: "./nm-style.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmStyleComponent implements OnInit, OnChanges {
  private _default: NmStyleOption = {};

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, StylePrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.removeListen();
  }

  private removeListen() {}
}
