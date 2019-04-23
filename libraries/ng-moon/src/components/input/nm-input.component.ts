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
  NmInputLayoutEnum,
  NmInputTypeEnum,
  NmInputIconLayoutEnum,
  prefix,
  NmInputOption
} from "./nm-input.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { noop } from "rxjs";
import { fillDefault } from "../../core/util/option";

@Component({
  selector: "nm-input",
  templateUrl: "./nm-input.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
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
  @Input() nmLayout?: NmInputLayoutEnum;
  @Input() nmLabel?: string;
  @Input() nmType?: NmInputTypeEnum;
  @Input() nmPlaceholder?: string;
  @Input() nmRequired?: boolean;
  @Input() nmDisabled?: boolean;
  @Input() nmIcon?: string;
  @Input() nmIconLayout?: NmInputIconLayoutEnum;

  private default: NmInputOption = {
    nmLayout: NmInputLayoutEnum.Vertical,
    nmPlaceholder: "",
    nmType: NmInputTypeEnum.Text,
    nmIconLayout: NmInputIconLayoutEnum.Right
  };

  @HostBinding(`class.${prefix}`) className() {
    return true;
  }

  @HostBinding(`class.${prefix}-disabled`) get getDisabled() {
    return this.nmDisabled;
  }

  @HostBinding(`class.${prefix}-required`) get getRequired() {
    return this.nmRequired;
  }

  @HostBinding(`class.${prefix}-${NmInputLayoutEnum.Horizontal}`) get getLayoutHorizontal() {
    return this.nmLayout === NmInputLayoutEnum.Horizontal;
  }

  @HostBinding(`class.${prefix}-${NmInputLayoutEnum.Vertical}`) get getLayoutVertical() {
    return this.nmLayout === NmInputLayoutEnum.Vertical;
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
    this.onTouchedFn = fn;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    fillDefault(this, this.default);
  }
}
