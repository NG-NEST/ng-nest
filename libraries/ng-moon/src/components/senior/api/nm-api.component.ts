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
import { NmApiOption, ApiPrefix } from "./nm-api.type";
import { fillDefault } from "../../../core/util";

@Component({
  selector: "nm-api",
  templateUrl: "./nm-api.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmApiComponent implements OnInit, OnChanges {
  private _default: NmApiOption = {};

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, ApiPrefix);
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
