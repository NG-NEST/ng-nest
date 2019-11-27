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
import { InnerPrefix, XInnerInput } from "./inner.type";
import { fillDefault } from "@ng-nest/ui/core";

@Component({
  selector: "x-inner",
  templateUrl: "./inner.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XInnerComponent implements OnInit, OnChanges {
  @Input() padding: string;
  private _default: XInnerInput = {
    padding: "1rem"
  };
  private _ele: HTMLElement;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, InnerPrefix);
    this._ele = this.elementRef.nativeElement;
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setStyle();
  }

  setStyle() {
    this.renderer.setStyle(this._ele, "padding", this.padding);
  }
}
