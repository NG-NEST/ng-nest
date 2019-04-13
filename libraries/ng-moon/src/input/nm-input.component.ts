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
  InputLayoutEnum,
  InputTypeEnum,
  InputIconLayoutEnum,
  prefix,
  InputOption
} from "./nm-input.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { noop } from "rxjs";
import { fillDefault } from "../core/util/option";

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
export class NmInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  layout?: InputLayoutEnum;
  @Input()
  label?: string;
  @Input()
  type?: InputTypeEnum;
  @Input()
  placeholder?: string;
  @Input()
  required?: boolean;
  @Input()
  disabled?: boolean;
  @Input()
  icon?: string;
  @Input()
  iconLayout?: InputIconLayoutEnum;

  private default: InputOption = {
    layout: InputLayoutEnum.Vertical,
    placeholder: "",
    type: InputTypeEnum.Text,
    iconLayout: InputIconLayoutEnum.Right
  };

  @HostBinding(`class.${prefix}`) className() {
    return true;
  }

  @HostBinding(`class.${prefix}-disabled`) get getDisabled() {
    return this.disabled;
  }

  @HostBinding(`class.${prefix}-required`) get getRequired() {
    return this.required;
  }

  @HostBinding(`class.${prefix}-horizontal`) get getHLayout() {
    return this.layout === InputLayoutEnum.Horizontal;
  }

  @HostBinding(`class.${prefix}-vertical`) get getVLayout() {
    return this.layout === InputLayoutEnum.Vertical;
  }

  value: string | number;
  onChangeFn: (val: string | number) => void = noop;
  onTouchedFn: () => void = noop;

  writeValue(val: string | number): void {
    this.value = val ? val : null;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onChangeFn = fn;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    fillDefault(this, this.default);
  }
}
