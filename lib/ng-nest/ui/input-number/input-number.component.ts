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
  ViewChild
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
  @Input() debounce: number = 100;

  private _default: XInputNumberInputNumber = {};
  private _required: boolean = false;

  value: any = "";
  minDisabled: boolean = false;
  maxDisabled: boolean = false;
  mousedown: boolean = false;
  mousedown$: Subscription;

  @HostBinding(`class.x-disabled`) get getDisabled() {
    return this.disabled || this.disabled === "";
  }

  @HostBinding(`class.x-required`) get getRequired() {
    return this.required || this.required === "";
  }

  @HostBinding(`class.x-input-number-flex`) get getFlex() {
    return this.justify || this.align || this.direction;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XInputNumberPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setRequired();
    this.setJustify();
    this.setAlign();
    this.setDirection();
  }

  change(value) {
    const oldValue: number = this.value;
    this.value = value;
    if (this.value === null) {
      this.value = oldValue;
      return;
    }
    if (this._required) {
      this.required = isEmpty(value);
    }
    // this.maxDisabled = value > this.max;
    // this.minDisabled = value < this.min;
    // if (this.maxDisabled) return this.dispatch(this.max);
    // if (this.minDisabled) return this.dispatch(this.min);
    if (this.onChange) this.onChange(value);
  }

  down(event: Event, limit: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.mousedown$ = interval(this.debounce).subscribe(() => {
      this.value = Number(this.value) + limit;
      if (this.onChange) this.onChange(this.value);
      this.cdr.detectChanges();
    });
  }

  up() {
    if (this.mousedown$) this.mousedown$.unsubscribe();
  }

  // decrease(calc: boolean) {
  //   if (this.disabled) return;
  //   const step: number = calc ? this.step : 0 - this.step;
  //   const val: number = Number(this.value) + step;
  //   if (Number.isNaN(val)) return;
  //   this.maxDisabled = val > this.max;
  //   this.minDisabled = val < this.min;
  //   if (!this.maxDisabled && !this.minDisabled) {
  //     this.value = val;
  //     if (this.onChange) this.onChange(this.value);
  //     this.cdr.detectChanges();
  //   }
  // }

  setRequired() {
    this._required = this.required || this.required === "" ? true : false;
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
