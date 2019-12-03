import { Subscription, interval } from "rxjs";
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
  HostListener
} from "@angular/core";
import {
  XInputNumberPrefix,
  XInputNumberInputNumber,
  XInputNumberType,
  XInputNumberIconLayoutType
} from "./input-number.type";
import {
  fillDefault,
  isEmpty,
  XValueAccessor,
  XControlValueAccessor,
  XJustify,
  XAlign,
  XDirection
} from "@ng-nest/ui/core";

@Component({
  selector: "x-input-number",
  templateUrl: "./input-number.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputNumberComponent)]
})
export class XInputNumberComponent extends XControlValueAccessor implements OnInit {
  @Input() justify?: XJustify;
  @Input() align?: XAlign;
  @Input() direction?: XDirection;
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() required?: boolean | string;
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;
  @Input() step: number = 1;
  @Input() debounce: number = 40;
  @Input() precision: number = 0;

  private _default: XInputNumberInputNumber = {};
  private _required: boolean = false;

  private _value: any = "";
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
    if (typeof value !== "undefined" && value !== null) this.displayValue = Number(this.value).toFixed(this.precision);
    this.cdr.detectChanges();
  }

  displayValue: any = "";
  minDisabled: boolean = false;
  maxDisabled: boolean = false;
  mousedown$: Subscription;
  timer: any;

  @HostBinding(`class.x-disabled`) get getDisabled() {
    return this.disabled;
  }

  @HostBinding(`class.x-required`) get getRequired() {
    return this.required || this.required === "";
  }

  @HostBinding(`class.x-input-number-flex`) get getFlex() {
    return this.justify || this.align || this.direction;
  }

  @HostListener("document:mouseup", ["$event"]) onMouseup(event) {
    this.up(event);
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XInputNumberPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setDisabled();
    this.setRequired();
    this.setJustify();
    this.setAlign();
    this.setDirection();
  }

  change(value) {
    this.verify(value);
    if (this.onChange) this.onChange(this.value);
  }

  down(event: Event, limit: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.timer = setTimeout(() => {
      this.mousedown$ = interval(this.debounce).subscribe(() => {
        this.plus(event, limit);
      });
    }, 150);
  }

  up(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.mousedown$) this.mousedown$.unsubscribe();
  }

  plus(event: Event, limit: number) {
    event.preventDefault();
    event.stopPropagation();
    if (this.timer) clearTimeout(this.timer);
    if (Number.isNaN(+this.value)) this.value = 0;
    let value = Number(this.value) + limit;
    this.verify(value);
    if (this.onChange) this.onChange(this.value);
  }

  verify(value) {
    const oldValue: number = this.value;
    this.value = value;
    if (Number.isNaN(+this.value)) {
      this.value = oldValue;
      return;
    }
    if (this._required) {
      this.required = isEmpty(value);
    }
    this.maxDisabled = value >= this.max;
    this.minDisabled = value <= this.min;
    this.value = this.maxDisabled ? this.max : this.minDisabled ? this.min : value;
  }

  setRequired() {
    this._required = this.required || this.required === "" ? true : false;
  }

  setDisabled() {
    this.disabled = this.disabled || this.disabled === "" ? true : false;
    this.minDisabled = this.disabled ? true : false;
    this.maxDisabled = this.disabled ? true : false;
  }

  setJustify() {
    if (!this.justify) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XInputNumberPrefix}-justity-${this.justify}`);
  }

  setAlign() {
    if (!this.align) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XInputNumberPrefix}-align-${this.align}`);
  }

  setDirection() {
    if (!this.direction) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XInputNumberPrefix}-direction-${this.direction}`);
  }
}
