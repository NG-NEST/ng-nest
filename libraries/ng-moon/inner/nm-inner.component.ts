import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { InnerPrefix, NmInnerOption } from "./nm-inner.type";
import { fillDefault } from "ng-moon/core";

@Component({
  selector: "nm-inner",
  templateUrl: "./nm-inner.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmInnerComponent implements OnInit, OnChanges {
  @Input() nmPadding: string;
  private default: NmInnerOption = {
    nmPadding: "1rem"
  };
  private _ele: HTMLElement;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, InnerPrefix);
    this._ele = this.elementRef.nativeElement;
  }

  ngOnInit() {
    fillDefault(this, this.default);
    this.setStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setStyle();
  }

  setStyle() {
    this.renderer.setStyle(this._ele, "padding", this.nmPadding);
  }
}
