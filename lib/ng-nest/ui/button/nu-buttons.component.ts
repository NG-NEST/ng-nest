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
import { NuButtonsOption, ButtonsPrefix } from "./nu-button.type";
import { fillDefault } from "@ng-nest/ui/core";

@Component({
  selector: "nu-buttons",
  template: "<ng-content></ng-content>",
  styleUrls: ["./nu-buttons.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuButtonsComponent implements OnInit {
  @Input() nuSpace?: number;
  @Input() nuNotBorder?: boolean;
  @HostBinding("class.nu-buttons-space") get getSpace() {
    return this.nuSpace;
  }
  @HostBinding("class.nu-buttons-not-border") get getNotBorder() {
    return this.nuNotBorder;
  }

  private _default: NuButtonsOption = {
    nuSpace: 0
  };
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, ButtonsPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }
}
