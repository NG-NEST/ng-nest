import { Subscription, interval } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { XIsEmpty, XValueAccessor, XNumber } from '@ng-nest/ui/core';
import { XInputNumberPrefix, XInputNumberProperty } from './input-number.property';

@Component({
  selector: `${XInputNumberPrefix}`,
  templateUrl: './input-number.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputNumberComponent)]
})
export class XInputNumberComponent extends XInputNumberProperty implements OnInit {
  @ViewChild('inputNumber', { static: true }) inputNumber: ElementRef;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    this.cdr.detectChanges();
  }

  displayValue: any = '';
  minDisabled: boolean = false;
  maxDisabled: boolean = false;
  mousedown$: Subscription;
  timer: any;

  @HostListener('document:mouseup', ['$event']) onMouseup(event: Event) {
    this.up(event);
  }

  constructor(public renderer: Renderer2, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.inputNumber.nativeElement, this.renderer, this.justify, this.align, this.direction);
  }

  setDisplayValue() {
    if (!XIsEmpty(this.value)) this.displayValue = Number(this.value).toFixed(Number(this.precision));
  }

  change(value: any) {
    this.verify(value);
    if (this.onChange) this.onChange(this.value);
  }

  down(event: Event, limit: XNumber, increase: boolean = true): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.timer = setTimeout(() => {
      this.mousedown$ = interval(Number(this.debounce)).subscribe(() => {
        this.plus(event, limit, increase);
      });
    }, 150);
  }

  up(event: Event) {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    if (this.mousedown$) this.mousedown$.unsubscribe();
  }

  plus(event: Event, limit: XNumber, increase: boolean = true) {
    if (this.disabled) return;
    limit = Number(limit);
    if (!increase) limit = -limit;
    event.preventDefault();
    event.stopPropagation();
    if (this.timer) clearTimeout(this.timer);
    if (Number.isNaN(+this.value)) this.value = 0;
    let value = Number(this.value) + limit;
    this.verify(value);
    this.cdr.detectChanges();
    if (this.onChange) this.onChange(this.value);
  }

  verify(value: any) {
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
