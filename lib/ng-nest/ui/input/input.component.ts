import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  HostBinding,
  ViewChild,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { XInputPrefix, XInputInput, XInputType, XInputIconLayoutType } from "./input.type";
import {
  fillDefault,
  isEmpty,
  XValueAccessor,
  XControlValueAccessor,
  XJustify,
  XAlign,
  XDirection,
  InputBoolean
} from "@ng-nest/ui/core";

@Component({
  selector: "x-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputComponent)]
})
export class XInputComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() justify?: XJustify;
  @Input() align?: XAlign;
  @Input() direction?: XDirection;
  @Input() label?: string = "";
  @Input() type?: XInputType = "text";
  @Input() placeholder?: string = "";
  @Input() @InputBoolean() required?: boolean;
  @Input() @InputBoolean() clearable?: boolean;
  @Input() @InputBoolean() readonly?: boolean;
  @Input() icon?: string;
  @Input() iconLayout?: XInputIconLayoutType = "left";
  @Input() @InputBoolean() iconSpin?: boolean;
  @Input() maxlength?: number;
  @Output() clearEmit?: EventEmitter<any> = new EventEmitter<any>();

  private _value: any;
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.change(value);
      this.cdr.detectChanges();
    }
  }
  private _disabled: boolean;
  public get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  @InputBoolean()
  public set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = value;
    }
  }

  private _default: XInputInput = {};
  private _required: boolean = false;
  valueLength: number = 0;
  lengthTotal: string = "";
  paddingLeft: number = 0.4;
  paddingRight: number = 0.4;
  clearShow: boolean = false;

  @HostBinding(`class.x-disabled`) get getDisabled() {
    return this.disabled;
  }

  @HostBinding(`class.x-required`) get getRequired() {
    return this.required;
  }

  @HostBinding(`class.x-clearable`) get getClearable() {
    return this.clearable;
  }

  @HostBinding(`class.x-clear-show`) get getClearShow() {
    return this.clearShow;
  }

  @HostBinding(`class.x-input-flex`) get getFlex() {
    return this.justify || this.align || this.direction;
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

  constructor(private renderer: Renderer2, public elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XInputPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setRequired();
    this.setPadding();
    this.setJustify();
    this.setAlign();
    this.setDirection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let clearableChange = changes.clearable;
    if (clearableChange && clearableChange.currentValue !== clearableChange.previousValue) {
      this.setClearable();
    }
  }

  change(value) {
    this._value = value;
    if (this._required && !this.disabled) {
      this.required = isEmpty(value);
    }
    this.setClearable();
    if (this.maxlength) {
      this.valueLength = isEmpty(value) ? 0 : `${value}`.length;
      this.lengthTotal = `${this.valueLength}/${this.maxlength}`;
    }
    this.setPadding();
    if (this.onChange) this.onChange(value);
  }

  clear(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const clearValue = this.value;
    this.value = "";
    this.clearEmit.emit(clearValue);
  }

  setClearable() {
    if (this.clearable && !this.disabled) {
      this.clearShow = !isEmpty(this.value);
    } else {
      this.clearShow = false;
    }
  }

  setPadding() {
    this.paddingLeft =
      this.maxlength && this.icon && this.iconLayout === "right"
        ? (this.lengthTotal.length + 2) * 0.385
        : this.icon && this.iconLayout === "left"
        ? 1.8
        : 0.4;
    this.paddingRight =
      this.maxlength && this.icon && this.iconLayout === "left"
        ? (this.lengthTotal.length + 2) * 0.385
        : this.icon && this.iconLayout === "right"
        ? 1.8
        : this.maxlength && !this.icon
        ? (this.lengthTotal.length + 2) * 0.385
        : 0.4;
  }

  setRequired() {
    this._required = this.required ? true : false;
  }

  setJustify() {
    if (!this.justify) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XInputPrefix}-justity-${this.justify}`);
  }

  setAlign() {
    if (!this.align) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XInputPrefix}-align-${this.align}`);
  }

  setDirection() {
    if (!this.direction) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XInputPrefix}-direction-${this.direction}`);
  }
}
