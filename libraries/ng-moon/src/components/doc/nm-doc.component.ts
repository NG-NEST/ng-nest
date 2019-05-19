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
import { NmDocOption, DocPrefix } from "./nm-doc.type";
import { fillDefault } from "../../core/util";

@Component({
  selector: "nm-doc",
  templateUrl: "./nm-doc.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmDocComponent implements OnInit, OnChanges {
  private _default: NmDocOption = {};

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, DocPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    console.log(this.elementRef.nativeElement.shadowRoot)
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.removeListen();
  }

  private removeListen() {}
}
