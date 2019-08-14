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
  InputPrefix,
  NmInputOption
} from "./nm-input.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { noop } from "rxjs";
import { fillDefault, isEmpty } from "../../../core/util";

@Component({
  selector: "nm-input",
  templateUrl: "./nm-input.component.html",
  styleUrls: ["./style/index.scss"],
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
  @Input() nmLayout?: NmInputLayoutEnum | string;
  @Input() nmLabel?: string;
  @Input() nmType?: NmInputTypeEnum | string;
  @Input() nmPlaceholder?: string;
  @Input() nmRequired?: boolean;
  @Input() nmDisabled?: boolean;
  @Input() nmIcon?: string;
  @Input() nmIconLayout?: NmInputIconLayoutEnum | string;

  private default: NmInputOption = {
    nmLayout: NmInputLayoutEnum.Vertical,
    nmPlaceholder: "",
    nmType: NmInputTypeEnum.Text,
    nmIconLayout: NmInputIconLayoutEnum.Right
  };

  @HostBinding(`class.nm-input-disabled`) get getDisabled() {
    return this.nmDisabled;
  }

  @HostBinding(`class.nm-input-required`) get getRequired() {
    return this.nmRequired;
  }

  @HostBinding(`class.nm-input-horizontal`)
  get getLayoutHorizontal() {
    return this.nmLayout === NmInputLayoutEnum.Horizontal;
  }

  @HostBinding(`class.nm-input-vertical`)
  get getLayoutVertical() {
    return this.nmLayout === NmInputLayoutEnum.Vertical;
  }

  @HostBinding(`class.nm-input-icon`) get getIcon() {
    return !isEmpty(this.nmIcon);
  }

  @HostBinding(`class.nm-input-icon-left`)
  get getIconLayoutLeft() {
    return (
      !isEmpty(this.nmIcon) && this.nmIconLayout === NmInputIconLayoutEnum.Left
    );
  }

  @HostBinding(`class.nm-input-icon-right`)
  get getIconLayoutRight() {
    return (
      !isEmpty(this.nmIcon) && this.nmIconLayout === NmInputIconLayoutEnum.Right
    );
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

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, InputPrefix);
  }

  ngOnInit() {
    fillDefault(this, this.default);
  }
}
