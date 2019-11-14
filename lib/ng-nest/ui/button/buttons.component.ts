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
import { XButtonsOption, ButtonsPrefix } from "./button.type";
import { fillDefault } from "@ng-nest/ui/core";

@Component({
  selector: "x-buttons",
  template: "<ng-content></ng-content>",
  styleUrls: ["./buttons.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonsComponent implements OnInit {
  @Input() space?: number;
  @Input() notBorder?: boolean;
  @HostBinding("class.x-buttons-space") get getSpace() {
    return this.space;
  }
  @HostBinding("class.x-buttons-not-border") get getNotBorder() {
    return this.notBorder;
  }

  private _default: XButtonsOption = {
    space: 0
  };
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, ButtonsPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }
}
