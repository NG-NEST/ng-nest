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
  HostListener,
  ViewChild
} from "@angular/core";
import { XInputNumberInput } from "./input-number.type";
import {
  fillDefault,
  XIsEmpty,
  XValueAccessor,
  XControlValueAccessor,
  XInputNumber,
  removeNgTag
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
  @Input() @XInputNumber() min: number = Number.MIN_SAFE_INTEGER;
  @Input() @XInputNumber() max: number = Number.MAX_SAFE_INTEGER;
  @Input() @XInputNumber() step: number = 1;
  @Input() @XInputNumber() debounce: number = 40;
  @Input() @XInputNumber() precision: number = 0;
  @ViewChild("inputNumber", { static: true }) inputNumber: ElementRef;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  private _default: XInputNumberInput = {};

  writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    this.cdr.detectChanges();
  }

  displayValue: any = "";
  minDisabled: boolean = false;
  maxDisabled: boolean = false;
  mousedown$: Subscription;
  timer: any;

  @HostListener("document:mouseup", ["$event"]) onMouseup(event) {
    this.up(event);
  }

  constructor(public renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setFlex(this.inputNumber.nativeElement, this.justify, this.align, this.direction);
    // removeNgTag(this.elementRef.nativeElement);
  }

  setDisplayValue() {
    if (!XIsEmpty(this.value)) this.displayValue = Number(this.value).toFixed(this.precision);
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
    this.cdr.detectChanges();
    if (this.onChange) this.onChange(this.value);
  }

  verify(value) {
    const oldValue: number = this.value;
    this.value = value;
    if (Number.isNaN(+this.value)) {
      this.value = oldValue;
      return;
    }
    this.maxDisabled = value >= this.max;
    this.minDisabled = value <= this.min;
    this.value = this.maxDisabled ? this.max : this.minDisabled ? this.min : value;
    this.setDisplayValue();
  }
}
