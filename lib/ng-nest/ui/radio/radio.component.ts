import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  HostBinding,
  Input,
  HostListener,
  ChangeDetectorRef,
  forwardRef,
  Optional,
  Host
} from "@angular/core";
import { XRadioPrefix } from "./radio.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: `${XRadioPrefix}`,
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XRadioComponent), multi: true }],
  host: {
    "[class.x-checked]": "checked",
    "[class.x-disabled]": "disabled"
  }
})
export class XRadioComponent implements OnInit, ControlValueAccessor {
  @Input() label?: string;
  @Input() value?: string | number | boolean;
  @Input() disabled?: boolean | string;
  @Input() checked?: boolean | string;
  @HostListener("click", ["$event"]) onClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    if (!this.disabled && !this.checked) {
      this.checked = true;
      if (this.onChange) this.onChange(true);
    }
  }

  onChange: (_: any) => void;
  onTouched: () => void;

  writeValue(value: boolean): void {
    this.checked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
    this.cdr.markForCheck();
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XRadioPrefix);
  }

  ngOnInit() {
    if (typeof this.value === "undefined") this.value = this.label;
    this.stringToBoolean();
  }

  stringToBoolean() {
    this.checked = this.checked || this.checked === "" ? true : false;
    this.disabled = this.disabled || this.disabled === "" ? true : false;
  }
}
