import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  HostBinding
} from "@angular/core";
import {
  InputPrefix,
  NuInputOption,
  NuInputLayoutType,
  NuInputType,
  NuInputIconLayoutType
} from "./nu-input.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { fillDefault, isEmpty } from "@ng-nest/ui/core";

@Component({
  selector: "nu-input",
  templateUrl: "./nu-input.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NuInputComponent,
      multi: true
    }
  ]
})
export class NuInputComponent implements OnInit, ControlValueAccessor {
  @Input() nuLayout?: NuInputLayoutType;
  @Input() nuLabel?: string;
  @Input() nuType?: NuInputType;
  @Input() nuPlaceholder?: string;
  @Input() nuRequired?: boolean;
  @Input() nuDisabled?: boolean;
  @Input() nuIcon?: string;
  @Input() nuIconLayout?: NuInputIconLayoutType;

  private _default: NuInputOption = {
    nuLayout: "vertical",
    nuPlaceholder: "",
    nuType: "text",
    nuIconLayout: "right"
  };

  @HostBinding(`class.nu-input-disabled`) get getDisabled() {
    return this.nuDisabled;
  }

  @HostBinding(`class.nu-input-required`) get getRequired() {
    return this.nuRequired;
  }

  @HostBinding(`class.nu-input-horizontal`)
  get getLayoutHorizontal() {
    return this.nuLayout === "horizontal";
  }

  @HostBinding(`class.nu-input-vertical`)
  get getLayoutVertical() {
    return this.nuLayout === "vertical";
  }

  @HostBinding(`class.nu-input-icon`) get getIcon() {
    return !isEmpty(this.nuIcon);
  }

  @HostBinding(`class.nu-input-icon-left`)
  get getIconLayoutLeft() {
    return !isEmpty(this.nuIcon) && this.nuIconLayout === "left";
  }

  @HostBinding(`class.nu-input-icon-right`)
  get getIconLayoutRight() {
    return !isEmpty(this.nuIcon) && this.nuIconLayout === "right";
  }

  value: string | number;
  onChange: (_: any) => void;
  onTouched: () => void;

  writeValue(val: string | number): void {
    this.value = val;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {}

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, InputPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }
}
