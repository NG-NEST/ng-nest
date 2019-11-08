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
import { HighlightPrefix, NuHighlightOption } from "./nu-highlight.type";
import { fillDefault } from "@ng-nest/ui/core";
import * as hljs from "highlight.js";

@Component({
  selector: "nu-highlight",
  templateUrl: "./nu-highlight.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuHighlightComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() nuType?: string;
  @Input() nuData?: string;

  @ViewChild("code", { static: false }) codeRef: ElementRef;

  private _default: NuHighlightOption = {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, HighlightPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nuDataChange = changes.nuData;
    if (
      typeof nuDataChange != "undefined" &&
      typeof nuDataChange.currentValue != "undefined" &&
      typeof nuDataChange.currentValue != null &&
      nuDataChange.currentValue != "" &&
      nuDataChange.currentValue !== nuDataChange.previousValue
    ) {
      setTimeout(() => hljs.highlightBlock(this.codeRef.nativeElement));
    }
  }

  ngAfterViewInit() {
    if (
      typeof this.nuData != "undefined" &&
      typeof this.nuData != null &&
      this.nuData != ""
    ) {
      hljs.highlightBlock(this.codeRef.nativeElement);
    }
  }
}
