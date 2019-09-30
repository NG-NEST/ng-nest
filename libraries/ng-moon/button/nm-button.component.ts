import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input
} from "@angular/core";
import { ButtonPrefix, NmButtonType, NmButtonOption } from "./nm-button.type";
import { fillDefault } from "ng-moon/core";

@Component({
  selector: "nm-button",
  templateUrl: "./nm-button.component.html",
  styleUrls: ["./nm-button.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmButtonComponent implements OnInit {
  @Input() nmType?: NmButtonType;
  @Input() nmLabel?: string;
  @Input() nmIcon?: string;
  private _default: NmButtonOption = {
    nmType: "button",
    nmLabel: ""
  };
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, ButtonPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }
}
