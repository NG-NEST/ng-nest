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
import { XInputSliderInput } from "./input-slider.type";
import {
  fillDefault,
  XIsEmpty,
  XValueAccessor,
  XControlValueAccessor,
  XInputNumber,
  removeNgTag
} from "@ng-nest/ui/core";

@Component({
  selector: "x-input-slider",
  templateUrl: "./input-slider.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputSliderComponent)]
})
export class XInputSliderComponent extends XControlValueAccessor implements OnInit {
  @Input() @XInputNumber() min: number = Number.MIN_SAFE_INTEGER;
  @Input() @XInputNumber() max: number = Number.MAX_SAFE_INTEGER;
  @Input() @XInputNumber() step: number = 1;
  @Input() @XInputNumber() debounce: number = 40;
  @Input() @XInputNumber() precision: number = 0;
  @ViewChild("inputNumber", { static: true }) inputNumber: ElementRef;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  private _default: XInputSliderInput = {};

  writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setFlex(this.inputNumber.nativeElement, this.justify, this.align, this.direction);
    removeNgTag(this.elementRef.nativeElement);
  }
}
