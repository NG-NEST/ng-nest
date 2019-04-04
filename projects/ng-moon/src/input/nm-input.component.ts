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
  HostBinding,
  OnChanges
} from "@angular/core";
import {
  InputOption,
  InputLayoutEnum,
  InputTypeEnum,
  InputIconLayoutEnum,
  InputSizeEnum,
  prefix
} from "./nm-input.type";
import { fillDefault } from "../core/util";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { noop } from "rxjs";

@Component({
  selector: "nm-input",
  templateUrl: "./nm-input.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NmInputComponent),
      multi: true
    }
  ]
})
export class NmInputComponent
  implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  option: InputOption = {};

  @HostBinding(`class.${prefix}-disabled`) get disabled() {
    return this.option.disabled;
  }
  @HostBinding(`class.${prefix}-lg`) get lg() {
    return this.option.size === InputSizeEnum.Large;
  }
  @HostBinding(`class.${prefix}-sm`) get sm() {
    return this.option.size === InputSizeEnum.Small;
  }

  private default: InputOption = {
    layout: InputLayoutEnum.Vertical,
    label: "",
    required: false,
    placeholder: "",
    type: InputTypeEnum.Text,
    iconLayout: InputIconLayoutEnum.Right
  };

  value: string | number;
  onChangeFn: (val: string | number) => void = noop;
  onTouchedFn: () => void = noop;

  writeValue(val: string | number): void {
    this.value = val ? val : null;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onChangeFn = fn;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private ele: ElementRef
  ) {
    this.renderer.addClass(this.ele.nativeElement, prefix);
  }

  ngOnInit() {
    fillDefault(this.option, this.default);
  }

  ngOnChanges() {
  }
}
