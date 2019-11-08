import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input
} from "@angular/core";
import { ButtonPrefix, NuButtonType, NuButtonOption } from "./nu-button.type";
import { fillDefault } from "@ng-nest/ui/core";

@Component({
  selector: "nu-button",
  templateUrl: "./nu-button.component.html",
  styleUrls: ["./nu-button.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuButtonComponent implements OnInit {
  @Input() nuType?: NuButtonType;
  @Input() nuLabel?: string;
  @Input() nuIcon?: string;
  @Input() nuTitle?: string;
  @Input() nuActivated?: boolean;
  @Input() nuDisabled?: boolean;
  @HostBinding("class.nu-button-label") get getLabel() {
    return !this.nuIcon && this.nuLabel;
  }
  @HostBinding("class.nu-button-icon") get getIcon() {
    return !this.nuLabel && this.nuIcon;
  }
  @HostBinding("class.nu-button-activated") get getActivated() {
    return this.nuActivated;
  }
  @HostBinding("class.nu-button-disabled") get getDisabled() {
    return this.nuDisabled;
  }
  private _default: NuButtonOption = {
    nuType: "button",
    nuLabel: ""
  };
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, ButtonPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    if (this.nuTitle)
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        "title",
        this.nuTitle
      );
  }
}
