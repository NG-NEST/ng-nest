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
  NmInputOption,
  NmInputLayoutType,
  NmInputType,
  NmInputIconLayoutType
} from "./nm-input.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { noop } from "rxjs";
import { fillDefault, isEmpty } from "ng-moon/core";

@Component({
  selector: "nm-input",
  templateUrl: "./nm-input.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:  NmInputComponent,
      multi: true
    }
  ]
})
export class NmInputComponent implements OnInit, ControlValueAccessor {
  @Input() nmLayout?: NmInputLayoutType;
  @Input() nmLabel?: string;
  @Input() nmType?: NmInputType;
  @Input() nmPlaceholder?: string;
  @Input() nmRequired?: boolean;
  @Input() nmDisabled?: boolean;
  @Input() nmIcon?: string;
  @Input() nmIconLayout?: NmInputIconLayoutType;

  private default: NmInputOption = {
    nmLayout: "vertical",
    nmPlaceholder: "",
    nmType: "text",
    nmIconLayout: "right"
  };

  @HostBinding(`class.nm-input-disabled`) get getDisabled() {
    return this.nmDisabled;
  }

  @HostBinding(`class.nm-input-required`) get getRequired() {
    return this.nmRequired;
  }

  @HostBinding(`class.nm-input-horizontal`)
  get getLayoutHorizontal() {
    return this.nmLayout === "horizontal";
  }

  @HostBinding(`class.nm-input-vertical`)
  get getLayoutVertical() {
    return this.nmLayout === "vertical";
  }

  @HostBinding(`class.nm-input-icon`) get getIcon() {
    return !isEmpty(this.nmIcon);
  }

  @HostBinding(`class.nm-input-icon-left`)
  get getIconLayoutLeft() {
    return !isEmpty(this.nmIcon) && this.nmIconLayout === "left";
  }

  @HostBinding(`class.nm-input-icon-right`)
  get getIconLayoutRight() {
    return !isEmpty(this.nmIcon) && this.nmIconLayout === "right";
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
