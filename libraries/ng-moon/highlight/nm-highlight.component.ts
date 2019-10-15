import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { HighlightPrefix, NmHighlightOption } from "./nm-highlight.type";
import { fillDefault } from "ng-moon/core";
import * as hljs from "highlight.js";

@Component({
  selector: "nm-highlight",
  templateUrl: "./nm-highlight.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmHighlightComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() nmType?: string;
  @Input() nmData?: string;

  @ViewChild("code", { static: false }) codeRef: ElementRef;

  private _default: NmHighlightOption = {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, HighlightPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nmDataChange = changes.nmData;
    if (
      typeof nmDataChange != "undefined" &&
      typeof nmDataChange.currentValue != "undefined" &&
      typeof nmDataChange.currentValue != null &&
      nmDataChange.currentValue != "" &&
      nmDataChange.currentValue !== nmDataChange.previousValue
    ) {
      setTimeout(() => hljs.highlightBlock(this.codeRef.nativeElement));
    }
  }

  ngAfterViewInit() {
    if (
      typeof this.nmData != "undefined" &&
      typeof this.nmData != null &&
      this.nmData != ""
    ) {
      hljs.highlightBlock(this.codeRef.nativeElement);
    }
  }
}
