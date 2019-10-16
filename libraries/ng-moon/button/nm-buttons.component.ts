import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  HostBinding
} from "@angular/core";
import { NmButtonsOption, ButtonsPrefix } from "./nm-button.type";
import { fillDefault } from "ng-moon/core";

@Component({
  selector: "nm-buttons",
  template: "<ng-content></ng-content>",
  styleUrls: ["./nm-buttons.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmButtonsComponent implements OnInit {
  @Input() nmSpace?: number;
  @Input() nmNotBorder?: boolean;
  @HostBinding("class.nm-buttons-space") get getSpace() {
    return this.nmSpace;
  }
  @HostBinding("class.nm-buttons-not-border") get getNotBorder() {
    return this.nmNotBorder;
  }

  private _default: NmButtonsOption = {
    nmSpace: 0
  };
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, ButtonsPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }
}
