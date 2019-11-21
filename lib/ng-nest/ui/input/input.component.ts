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
  XInputInput,
  XInputLayoutType,
  XInputType,
  XInputIconLayoutType
} from "./input.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { fillDefault, isEmpty } from "@ng-nest/ui/core";

@Component({
  selector: "x-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: XInputComponent,
      multi: true
    }
  ]
})
export class XInputComponent implements OnInit, ControlValueAccessor {
  @Input() layout?: XInputLayoutType;
  @Input() label?: string;
  @Input() type?: XInputType;
  @Input() placeholder?: string;
  @Input() required?: boolean;
  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() iconLayout?: XInputIconLayoutType;

  private _default: XInputInput = {
    layout: "vertical",
    placeholder: "",
    type: "text",
    iconLayout: "right"
  };

  @HostBinding(`class.x-input-disabled`) get getDisabled() {
    return this.disabled;
  }

  @HostBinding(`class.x-input-required`) get getRequired() {
    return this.required;
  }

  @HostBinding(`class.x-input-horizontal`)
  get getLayoutHorizontal() {
    return this.layout === "horizontal";
  }

  @HostBinding(`class.x-input-vertical`)
  get getLayoutVertical() {
    return this.layout === "vertical";
  }

  @HostBinding(`class.x-input-icon`) get getIcon() {
    return !isEmpty(this.icon);
  }

  @HostBinding(`class.x-input-icon-left`)
  get getIconLayoutLeft() {
    return !isEmpty(this.icon) && this.iconLayout === "left";
  }

  @HostBinding(`class.x-input-icon-right`)
  get getIconLayoutRight() {
    return !isEmpty(this.icon) && this.iconLayout === "right";
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
